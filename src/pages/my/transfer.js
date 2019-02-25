import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView,Input} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num,
} from '../../actions/IndexAction'
import base from "../base"
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"

class Transfer extends Component {
  constructor(props) {

    super(props)
     base(this)
    this.state = {
      mobile:"",
      money:"",
      code:"",
      witetime:60,
      seconds:0,
    }
  }

  config = {
    navigationBarTitleText: '转账',
    enablePullDownRefresh: false,
  }

  onReachBottom() {

  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  onPullDownRefresh() {
  //  this.fetchData()
  }

  componentWillUnmount() {
  }
  back()
  {
    Taro.navigateBack()
  }
  componentDidShow() {

    this.setVerifyTime();


  }
  setVerifyTime()
  {
    var data = wx.getStorageSync("t_verify_time")
    if(data){
      let endtime=(parseInt(data)+this.state.witetime)-(parseInt((new Date()).valueOf()/1000));
      if(endtime>0)
      {
        this.setState({
          seconds:endtime,
          issend:true
        });
        this.interval=setInterval(()=>{
          if(this.state.seconds<=0)
          {
            return clearInterval(this.interval);
          }else{
            this.setState({
              seconds:this.state.seconds-1
            })
          }
        },1000)
      }
    }
  }
  inputmobile(event) {
    this.setState({
      mobile: event.detail.value.toUpperCase()
    })

  }
  check(val){
    var regStrs = [
      ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
      ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
      ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
      ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
    ];
    for(var i=0; i<regStrs.length; i++){
      var reg = new RegExp(regStrs[i][0]);
      val = val.replace(reg, regStrs[i][1]);
    }
    return val;
  }


  inputmoney(event) {

    var money=event.detail.value

    money=this.check(money);
    if(!money)
    {
      this.setState({
        money: this.state.money
      })
      return
    }
    if(parseFloat(money)<1)
    {
      money=1;
    }else{
      if(parseFloat(money)>parseFloat(this.props.userinfo.userinfo.user_money))
      {

        money=this.props.userinfo.userinfo.user_money
      }
    }
    console.log("bbb")
    console.log(money)
    this.setState({
      money: money
    })


  }
  inputcode(event) {
    this.setState({
      code: event.detail.value
    })

  }
  getsms()
  {
    if(!this.state.money)
    {
      wx.showToast({title:"请输入正确的金额",icon:"none"})
      return;
    }


    if(this.state.mobile)
    {
      if(!(/^1[345789]\d{9}$/.test(this.state.mobile))){
        wx.showToast({title:"手机号码有误，请重填",icon:"none"})
          return false;
      }
      if(this.state.mobile==this.props.userinfo.userinfo.true_mobile)
      {
        wx.showToast({title:"您不能向自己转账",icon:"none"})
        return false;
      }

    }else{
      wx.showToast({title:"请输入收款人手机号码",icon:"none"})
      return;
    }

    clearInterval(this.interval);
    wx.showLoading({title:"正在发送.."})
    var databody={
      device_token:this.props.wxuser.wxuser.openid,
      mobile:this.props.userinfo.userinfo.true_mobile,
      type:2
    }
    //访问发送接口
    wx.request({
      url: set.sendsms,
      data:databody,
      header:{
        'Accept':'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method:"POST",
      success(res) {
        if(res.data.code==0)
        {
          wx.hideLoading();
          wx.showToast({title:res.data.message,icon:"none"})

        }else{
          wx.showToast({title:res.data.message,icon:"none"})
          return
        }
      },
      fail()
      {
        wx.showToast({title:"网络访问失败，请重试"})
        return
      }
    })
    wx.showToast({title:'发送成功,验证码30分钟内有效'})
    let nowtime=parseInt(((new Date).valueOf())/1000);
    wx.setStorageSync("t_verify_time",nowtime.toString());
    this.setState({
      seconds:this.state.witetime,
    })
    this.interval=setInterval(()=>{
      if(this.state.seconds<=0)
      {
        return clearInterval(this.interval);
      }else{
        this.setState({
          seconds:this.state.seconds-1
        })
      }
    },1000)
  }
  back()
  {
    Taro.navigateBack()
  }
  subtransfer()
  {
    if(!this.state.money)
    {
      wx.showToast({title:"请输入正确的金额",icon:"none"})
      return;
    }


    if(this.state.mobile)
    {
      if(!(/^1[345789]\d{9}$/.test(this.state.mobile))){
        wx.showToast({title:"手机号码有误，请重填",icon:"none"})
        return false;
      }
      if(this.state.mobile==this.props.userinfo.userinfo.true_mobile)
      {
        wx.showToast({title:"您不能向自己转账",icon:"none"})
        return false;
      }

    }else{
      wx.showToast({title:"请输入收款人手机号码",icon:"none"})
      return;
    }
    if(this.state.code.length!=6)
    {
      wx.showToast({title:"请输入正确的短信验证码",icon:"none"})
      return;
    }

    clearInterval(this.interval);
    wx.showLoading({title:"正在转账.."})
    var databody={
      openid:this.props.wxuser.wxuser.openid,
      recvemobile:this.state.mobile,
      money:this.state.money,
      verify_code:this.state.code,
      type:2
    }
    this.wx_request(set.transfer,databody,"POST",{
      'Accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }).then((res)=>{
      if(res.data.code==0)
      {
        wx.hideLoading();
        wx.showToast({title:res.data.message,icon:"none"})
        this.props.dispatch(set_userinfo(res.data.data))
        setTimeout(()=>{this.back()},300);
      }else{
        wx.showToast({title:res.data.message,icon:"none"})
        return
      }
    }).catch((e)=>{
      wx.showToast({title:"网络访问失败，请重试"})
      return
    })
  }

  componentDidHide() {
  }

  render() {
    const {money}=this.state
    return (
      <View style={{backgroundColor:"#f0f2f5",height:"100vh",paddingTop:"105rpx"}}>
        <View style={{backgroundColor:"#ffffff"}}>
        <View style={{
          backgroundColor: "#cc0033",
          height: "105rpx",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingBottom: "10rpx",
          position:"fixed",
          top:"0rpx",
          left:"0rpx",
          right:"0rpx",
          zIndex:99
        }}>
          <View onClick={this.back.bind(this)} style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
            <Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>
          </View>
          <View style={{flex:1,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"bold"}}>转账</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView >
          <View style={{padding:"20rpx",borderBottom:"10rpx solid #f0f2f5",display:"flex"}}>
            <View style={{flex:1,padding:"10rpx",display:"flex",alignItems:"center"}}>
              <Image src={this.props.userinfo && this.props.userinfo.userinfo && this.props.userinfo.userinfo.wx_head_pic? this.props.userinfo.userinfo.wx_head_pic:require("../../assets/images/avatar.png")} style={{width:"60rpx",height:"60rpx",borderRadius:"25rpx"}}/>
              <View style={{flex:1,marginLeft:"20rpx"}}>
                <Text style={{display:"block",color:"#333333",fontSize:"26rpx"}}>
                  {this.props.userinfo && this.props.userinfo.userinfo && this.props.userinfo.userinfo.wx_nickname?this.props.userinfo.userinfo.wx_nickname:""}
                </Text>
                <Text style={{display:"block",color:"#999999",fontSize:"20rpx"}}>

                </Text>
              </View>
            </View>
            <View style={{flex:1,padding:"10rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>

              <Text style={{display:"block",color:"#333333",fontSize:"26rpx"}}>账户余额:</Text>
              <Text style={{display:"block",color:"#cc0033",fontSize:"26rpx"}}>{this.props.userinfo&&this.props.userinfo.userinfo&&this.props.userinfo.userinfo.user_money?this.props.userinfo.userinfo.user_money:0.00}</Text><Text style={{display:"block",color:"#333333",fontSize:"26rpx"}}>元</Text>


            </View>



          </View>
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"10rpx 20rpx 10rpx 20rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>接收人信息（</Text><Text style={{fontSize:"26rpx",color:"#cc0033"}}>必填</Text><Text style={{fontSize:"26rpx",color:"#333333"}}>）</Text>

            </View>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"20rpx"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>收款账号：</Text>
              <View style={{margin:"10rpx",display:"flex",border:"2rpx solid #cccccc",height:"60rpx",borderRadius:"6rpx",padding:"0rpx 10rpx 0rpx 10rpx",width:"400rpx",alignItems:"center",justifyContent:"center"}}>
                <Input onInput={this.inputmobile.bind(this)} confirmType="done" maxlength={11} style={{flex:1,color:"#cc0033",fontSize:"26rpx",color:"#666666"}} type="number"  placeholder="收款人手机号码..." value={this.state.mobile} />

              </View>
            </View>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>转账金额：</Text>
              <View style={{margin:"10rpx",display:"flex",border:"2rpx solid #cccccc",height:"60rpx",borderRadius:"6rpx",padding:"0rpx 10rpx 0rpx 10rpx",width:"400rpx",alignItems:"center",justifyContent:"center"}}>
                <Input onInput={this.inputmoney.bind(this)} confirmType="done" maxlength={11} style={{flex:1,color:"#cc0033",fontSize:"26rpx",color:"#666666"}} type="digit" value={money}  placeholder="请输入转账金额..." />

              </View>
            </View>
          </View>
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column",paddingBottom:"100rpx"}}>
            <View style={{padding:"10rpx 20rpx 10rpx 20rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>安全验证（</Text><Text style={{fontSize:"26rpx",color:"#cc0033"}}>必填</Text><Text style={{fontSize:"26rpx",color:"#333333"}}>）</Text>

            </View>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"20rpx"}}>
                <Text style={{color:"#333333",fontSize:"26rpx"}}>
                  需要对您的手机{this.props.userinfo.userinfo.mobile}进行验证，点击下面获取按钮接收验证码
                </Text>

            </View>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>短信验证：</Text>
              <View style={{margin:"10rpx",display:"flex",border:"2rpx solid #cccccc",height:"60rpx",borderRadius:"6rpx",padding:"0rpx 2rpx 0rpx 10rpx",width:"400rpx",alignItems:"center",justifyContent:"center"}}>
                <Input onInput={this.inputcode.bind(this)}  confirmType="done" maxlength={6} style={{flex:1,color:"#cc0033",fontSize:"26rpx",color:"#666666"}} type="number"  placeholder="短信验证码..." value={this.state.code} />
                {this.state.seconds>0?<View style={{backgroundColor:"#cccccc",display:"flex",alignItems:"center",justifyContent:"center",height:"56rpx",width:"110rpx",borderRadius:"10rpx"}}>
                  <Text style={{color:"#ffffff",fontSize:"26rpx"}}>{this.state.seconds}</Text>
                </View>:<View onClick={this.getsms.bind(this)} style={{backgroundColor:"#cc0033",display:"flex",alignItems:"center",justifyContent:"center",height:"56rpx",width:"110rpx",borderRadius:"10rpx"}}>
                  <Text style={{color:"#ffffff",fontSize:"26rpx"}}>获取</Text>
                </View>}
              </View>
            </View>
          </View>


          




        </ScrollView>
          <View onClick={this.subtransfer.bind(this)} style={{position:"fixed",bottom:0,left:0,right:0,height:"90rpx",backgroundColor:"#cc0033",zIndex:99,alignItems:"center",justifyContent:"center",display:"flex"}}>
            <Text style={{fontSize:"26rpx",color:"#ffffff"}}>提交</Text>
          </View>
        </View>
      </View>
    )
  }
}

const mapstate = state => {
  return {
    userinfo: state.usermodel,
    cart_num: state.cart_num,
    cart: state.cart,
    goodslist: state.goodslist,
    vip: state.vip,
    progress: state.progress,
    pushdata: state.pushdata,
    wxuser:state.wxusermodel
  }
}
export default connect(mapstate)(Transfer)

