import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Input, SwiperItem, Image, ScrollView} from '@tarojs/components'
import {AtButton, AtIcon, AtActionSheet} from "taro-ui"
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num,
} from '../../actions/IndexAction'
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"
import WXBizDataCrypt from "../../libs/WXBizDataCrypt"

class Login extends Component {
  constructor(props) {

    super(props)
    this.state = {
      mobile_open: false,
      mobile:"",
      code:"",
      witetime:60,
      seconds:0,
      mobile_code:""
    }
  }
  back()
  {
    Taro.navigateBack()
  }
  config = {
    navigationBarTitleText: '亨亨养车',
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: "#cc0033",
    // navigationBarTextStyle: {color: "#ffffff", fontWeight: "bold"}

  }

  onReachBottom() {

  }

  componentWillReceiveProps(nextProps) {

  }

  onPullDownRefresh() {
    // this.fetchData()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentDidShow() {

    this.setVerifyTime();


  }
  setVerifyTime()
  {
    var data = wx.getStorageSync("verify_time")
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

  onPageScroll(e) {

  }

  getcode()
  {
    if(!this.checkData()){
      return false;
    }
    clearInterval(this.interval);
    wx.showLoading({title:"正在发送.."})
    var databody={
      device_token:this.props.wxuser.wxuser.openid,
      mobile:this.state.mobile
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
    wx.setStorageSync("verify_time",nowtime.toString());
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
  checkData(type)
  {
    if(type==11&&!this.state.mobile)
    {
      wx.showToast({title:"请输入手机号码",icon:"none"});
      return false;
    }
    if (type==11&&!(/^1[3456789]\d{9}$/.test(this.state.mobile))) {
      wx.showToast({title:"您输入的手机号码有误",icon:"none"});
      return false;
    }
    if(type==11&&this.state.code.length==0)
    {
      wx.showToast({title:"请输入短信验证码",icon:"none"});
      return false;

    }
    if(type==11&&this.state.code.length!=6)
    {
      wx.showToast({title:"短信验证码长度为6位数字",icon:"none"});
      return false;

    }
    return true;
  }

  dologin(type) {
    console.log(this.props.wxuser);
    if(!this.checkData(type))
    {
      return false
    }
    wx.showLoading({
      title: "正在登录",
      mask: true
    })
    console.log(this.props.wxuser)
    //访问发送接口
    var databody = {
      mobile: this.state.mobile,
      device_token: this.props.wxuser.wxuser.openid,
      type:type,
      code:this.state.code,
      wx_nickName:this.props.wxuser.wxuser.nickName,
      wx_avatarUrl:this.props.wxuser.wxuser.avatarUrl,
      mobile_code:this.state.mobile_code

    }
    var that=this
    wx.request({
      url: set.login,
      data:databody,
      header:{
        'Accept':'application/login',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method:"POST",
      success(res) {
        if(parseInt(res.data.code)==0)
        {
          wx.showToast({title:res.data.message,icon:"none"})
          that.props.dispatch(set_userinfo(res.data.data))
          wx.setStorageSync("userinfo",JSON.stringify(res.data.data))
          setTimeout(()=>{
            that.back();
          },500)

        }else{

          Taro.showToast({title:res.data.message,icon:"none"})
          return;
        }
      },
      fail(res){
        wx.showToast({title:"网络访问失败，请重试",icon:"none"})
      }
    })



    setTimeout(() => {
      wx.hideLoading()
    }, 2000)
  }

  fetchData() {
    wx.showLoading({title: "加载中"})
    var databody = {
      token: this.token,
      device_token: this.device_token
    }
    request.post(set.home, databody).then((data) => {
      this.setState({
        pagedata: data.data
      })
      this.props.dispatch(set_goodslist(data.data.goods))
      if (data.data.user) {
        this.props.dispatch(set_userinfo(data.data.user));
      }
      if (data.data.vip) {
        this.props.dispatch(set_viplist(data.data.vip))
      }
      this.props.dispatch(set_cart_num(data.data.cart_num))
      this.props.dispatch(set_pushdatanum(data.data.pushnum));
      this.props.dispatch(set_bind_car_num(data.data.max_bind_car_num))

      this.setState({
        offers_goods: data.data.offers_goods
      })

      wx.hideLoading();
      this.props.dispatch(set_progress(this.props.progress.progress + 1))
    }).catch((err) => {
      wx.hideLoading();
      wx.showToast({
        title: '网络访问失败，请重试',
        icon: 'none',
        duration: 2000
      })
    })

  }
  getphone(phone)
  {
    var mobile={}
    console.log(phone.detail)
    if(phone.detail.encryptedData)
    {
      mobile.encryptedData=phone.detail.encryptedData;
      mobile.iv=phone.detail.iv;
      mobile.session_key=this.props.wxuser.wxuser.session_key;
    }else{

      return;
    }
    wx.showLoading({title:"正在登录.."})
    this.setState({
      mobile_code:JSON.stringify(mobile)
    },()=>{
      this.dologin()
    })

  }
  inputmobile(event)
  {
    this.setState({
      mobile:event.detail.value
    })
  }
  inputcode(event)
  {
    this.setState({
      code:event.detail.value
    })
  }
  openMobile() {
    this.setState({
      mobile_open: true
    })
  }
  closeMobile() {
    this.setState({
      mobile_open: false
    })
  }
  componentDidHide() {
  }

  render() {
    return (
      <View style={{backgroundColor: "#ffffff", height: "100vh",paddingTop:"105rpx"}}>
        <View style={{backgroundColor: "#ffffff"}}>
          <View
            style={{
              backgroundColor: "#cc0033",
              height: "105rpx",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              paddingBottom: "10rpx",
              position: "fixed",
              top: "0rpx",
              left: "0rpx",
              right: "0rpx",
              zIndex: 99
            }}>
            <View
              onClick={this.back.bind(this)}
              style={{
              height: "80rpx",
              width: "70rpx",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center"
            }}>
              <Image src={require("../../assets/images/left.png")} style={{width: "50rpx", height: "50rpx"}}/>
            </View>
            <View style={{flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
              <Text style={{color: "#ffffff", fontSize: "36rpx", fontWeight: "bold"}}>亨亨登陆</Text>
            </View>
            <View style={{height: "80rpx", width: "70rpx", display: "flex", alignItems: "flex-end"}}>
              {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
            </View>
          </View>
          <ScrollView style={{flex: 1, minHeight: "90vh", display: "flex"}}>
            <View style={{minHeight: "90vh", position: "relative"}}>
              <View style={{position: "absolute", top: "5%", left: 0, right: 0, padding: "20rpx"}}>
                <View style={{display: "flex", justifyContent: "center", width: "100%", marginBottom: "150rpx"}}>
                  <Image src={require("../../assets/images/logo.png")} mode={"widthFix"} style={{width: "40%"}}/>
                </View>
                <View style={{width: "100%"}}>
                  <AtButton
                    type="primary"
                    open-type="getPhoneNumber"
                    onGetPhoneNumber={this.getphone.bind(this)}

                  >
                    <View style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      height: "90rpx"
                    }}>
                      <AtIcon prefixClass='icon' value='weixin' size='20' color='#ffffff'></AtIcon>
                      <Text style={{marginLeft: "50rpx"}}>
                        微信登陆
                      </Text>
                    </View>

                  </AtButton>
                </View>
                <View style={{width: "100%", marginTop: "30rpx"}}>
                  <View
                    style={{width: "100%", border: "solid #999999 2rpx", borderRadius: "10rpx"}}
                    onClick={this.openMobile.bind(this)}
                  >
                    <View style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      height: "86rpx"
                    }}>
                      <AtIcon prefixClass='icon' value='shouji' size='24' color='#999999'></AtIcon>

                      <Text style={{marginLeft: "50rpx", color: "#999999"}}>
                        手机登陆
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

          </ScrollView>
        </View>
        <AtActionSheet isOpened={this.state.mobile_open} onClose={this.closeMobile.bind(this)}>
          <View style={{height: "600rpx"}}>
            <View style={{
              height: "80rpx",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1rpx solid #f0f2f5",
              display: "flex"
            }}>
              <Text style={{color: "#666666", fontSize: "32rpx"}}>手机登陆</Text>
            </View>
            <View style={{padding: "20rpx"}}>
              <View style={{
                margin: "10rpx",
                padding: "0rpx 10rpx 10rpx 10rpx",
                borderBottom: "2rpx solid #f0f2f5",
                display: "flex"
              }}>
                <AtIcon prefixClass='icon' value='shouji' size='24' color='#999999'></AtIcon>
                <Input type="number" maxlength={11} onInput={this.inputmobile.bind(this)} style={{
                  flex: 1,
                  textAlign: "left",
                  marginLeft: "40rpx",
                  marginRight: "20rpx",
                  fontSize: "26rpx"
                }} placeholder="输入手机号"/>
                <AtButton size="small" onClick={this.getcode.bind(this)} disabled={this.state.seconds>0}>
                  <View>
                    <Text>{this.state.seconds>0?this.state.seconds+" 秒":"获取验证码"}</Text>
                  </View>

                </AtButton>

              </View>
              <View style={{
                margin: "10rpx",
                padding: "20rpx 10rpx 20rpx 10rpx",
                borderBottom: "2rpx solid #f0f2f5",
                display: "flex"
              }}>
                <AtIcon prefixClass='icon' value='suo' size='24' color='#999999'></AtIcon>
                <Input type="number" maxlength={6} onInput={this.inputcode.bind(this)} style={{
                  flex: 1,
                  textAlign: "left",
                  marginLeft: "40rpx",
                  marginRight: "20rpx",
                  fontSize: "26rpx"
                }} placeholder="输入验证码"/>


              </View>
              <View
                style={{
                  width: "100%",
                  borderRadius: "10rpx",
                  backgroundColor: "#cc0033",
                  margin: "30rpx 10rpx 10rpx 10rpx"
                }}
                onClick={this.dologin.bind(this,11)}
              >
                <View
                  style={{flex: 1, alignItems: "center", justifyContent: "center", display: "flex", height: "80rpx"}}>

                  <Text style={{color: "#ffffff", fontSize: "28rpx"}}>
                    登 录
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  borderRadius: "10rpx",
                  border: "2rpx solid #999999",
                  margin: "30rpx 10rpx 10rpx 10rpx"
                }}
                onClick={this.closeMobile.bind(this)}
              >
                <View
                  style={{flex: 1, alignItems: "center", justifyContent: "center", display: "flex", height: "76rpx"}} >

                  <Text style={{color: "#999999", fontSize: "28rpx"}}>
                    取 消
                  </Text>
                </View>
              </View>


            </View>

          </View>
        </AtActionSheet>
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
export default connect(mapstate)(Login)

