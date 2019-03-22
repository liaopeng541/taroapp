import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView,Input} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num, set_wxuser,
} from '../../actions/IndexAction'
import base from "../base"
import request from "../../libs/request"
import './orther_pay.less'
import set from "../../apis/api"

class orther_pay extends Component {
  constructor(props) {

    super(props)
    base(this)
    this.state = {
      order: null,
      service:null,
      worker:null
    }
  }

  config = {
    navigationBarTitleText: '微信付款',
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: "#cc0033",
    navigationBarTextStyle: "white"

  }



  onReachBottom() {
    console.log("bbbbb");
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  onPullDownRefresh() {
    this.fetchData()
 //   wx.stopPullDownRefresh();
  }

  componentWillUnmount() {
  }


  componentDidShow() {
    wx.showLoading({title: "加载中",mask:true})
    //微信登陆
    this.checkwxuser().then((res) => {
       //获取订单信息
      this.fetchData();

    });


  }

  fetchData() {
    wx.showLoading({title: "加载中",mask:true})
    var databody={
     //  openid:this.props.wxuser.wxuser.openid,
     // openid:"o1MBZ5JMtqvchLsGg6ViQuB1OvYM",
      order_id:this.$router.params.id
    //  order_id:49717
    }
    this.wx_request(set.oto.getotoorderdetail, databody,"POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((data)=>
    {

      this.setState(data.data.data)


      wx.stopPullDownRefresh();
      wx.hideLoading();

    }).catch((err)=>{
      wx.hideLoading();
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '网络访问失败，请重试',
        icon: 'none',
        duration: 1800
      })
    })

  }
  payotoorder()
  {
    wx.showLoading({title:"加载中..",mask:true})
    var databody={
      openid:this.props.wxuser.wxuser.openid,
      order_id:this.$router.params.id,
      wxuser:JSON.stringify(this.props.wxuser.wxuser),
      //   openid: "o1MBZ5JMtqvchLsGg6ViQuB1OvYM",
      //   order_id:49717,
      // pay_code:this.state.pay_code,
      // usemoney:usemoney,
      // usecard:usecard
    }
    this.wx_request(set.otoorderother_pay, databody, "POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((res)=>{
      var data=res.data;
      //完全抵扣
      if(data.code==10)
      {
        wx.showToast({title:"付款成功",icon:"none"})
        //更新用户信息
        this.back();
      }else if(data.code==0){
        var interval;
        var paydata = {
          timeStamp: res.data.data.timeStamp.toString(),
          nonceStr: res.data.data.nonce_str,
          package: "prepay_id=" + res.data.data.prepay_id,
          signType: "MD5",
          paySign: res.data.data.sign,
          success: () => {
            //查询充值是否完成
            interval=setInterval(()=>{
              var payorder={
                id:res.data.data.pay_id,
              }
              this.wx_request(set.getpaystatus, payorder, 'POST', {'Content-Type': 'application/x-www-form-urlencoded'})
                .then((res)=>{
                  if(res.data==1)
                  {
                    wx.hideLoading();
                    wx.showToast({title:"支付成功",icon:"none"})
                    clearInterval(interval);
                    //替换界面为付款成功界面


                    //this.back();


                  }
                })



            },1000)

          },
          fail: () => {
            wx.hideLoading();
            wx.showToast({title:"支付未能完成",icon:"none"})
          },


        };
        wx.requestPayment(paydata)
      }else{
        wx.hideLoading();
        wx.showToast({title:res.data.message,icon:"none"})
      }





    }).catch((e)=>{
      wx.hideLoading();
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '网络访问失败，请重试',
        icon: 'none',
        duration: 1800
      })
    })


  }
  getuserinfo(val)
  {
    if (val.detail.userInfo) {
      var wxuser = Object.assign({}, this.props.wxuser.wxuser, val.detail.userInfo);
      this.props.dispatch(set_wxuser(wxuser))
      wx.setStorageSync("wxuser", JSON.stringify(wxuser));
      this.setState({
        showgetuserinfo:false
      })
      //发起支付
      this.payotoorder();


    }

  }
  gopay()
  {
    Taro.navigateTo({
      url:"/pages/my/otopay?id="+this.state.order.id
    })
  }
  back()
  {
    Taro.navigateBack()
  }
  componentDidHide() {
  }
  toworker(id)
  {
    Taro.navigateTo({url:"/pages/index/workerdetail?id="+id})
  }
  tocomment(id)
  {
    Taro.navigateTo({url:"/pages/my/comment?id="+this.state.order.id})
  }
  render() {
    const {service,worker}=this.state
    return (
      <View style={{backgroundColor:"#f0f2f5",height:"100vh"}}>
        <View style={{backgroundColor:"#ffffff"}}>
        {/*<View*/}
          {/*style={{*/}
          {/*backgroundColor: "#cc0033",*/}
          {/*height: "105rpx",*/}
          {/*display: "flex",*/}
          {/*justifyContent: "center",*/}
          {/*alignItems: "flex-end",*/}
          {/*paddingBottom: "10rpx",*/}
          {/*position:"fixed",*/}
          {/*top:"0rpx",*/}
          {/*left:"0rpx",*/}
          {/*right:"0rpx",*/}
          {/*zIndex:99*/}
        {/*}}>*/}
          {/*<View onClick={this.back.bind(this)} style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>*/}
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          {/*</View>*/}
          {/*<View style={{flex:1,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>*/}
          {/*<Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"bold"}}>消费详情</Text>*/}
          {/*</View>*/}
          {/*<View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>*/}
            {/*/!*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*!/*/}
          {/*</View>*/}
        {/*</View>*/}
        <ScrollView style={{paddingBottom:"100rpx"}}>
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"0rpx 10rpx 5rpx 10rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>订单信息</Text>

            </View>
            <View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>开单时间</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>{(this.state.order&&this.state.order.add_time)?this.state.order.add_time:""}</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>车辆信息</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>{(this.state.order&&this.state.order.plate)?this.state.order.plate:""}</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>服务门店</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>{(this.state.order&&this.state.order.store_name)?this.state.order.store_name:""}</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>订单金额</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>{(this.state.order&&this.state.order.total)?"￥"+this.state.order.total:""}</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>应付金额</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>{(this.state.order&&this.state.order.show_total)?"￥"+this.state.order.show_total:""}</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>订单状态</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>{(this.state.order&&this.state.order.status_title)?this.state.order.status_title:""}</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>付款方式</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>{(this.state.order&&this.state.order.level_total)?"会员优惠"+this.state.order.level_total:""}
                    {(this.state.order&&this.state.order.card_total)?" 卡劵抵扣"+this.state.order.card_total:""}</Text>
                </View>
              </View>


            </View>


          </View>
          {service&&service.length>0&&<View
            style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"0rpx 10rpx 5rpx 10rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>服务项目</Text>

            </View>
            {service.map((item,i)=>{

              return(<View key={i}>
                <View style={{display:"flex",margin:"10rpx",padding:"10rpx",borderBottom:"1px solid #f0f2f5"}}>
                  <View style={{width:"100rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",border:"solid 1rpx #f0f2f5"}}>
                    <Image src={set.server_up+item.service.thumb} style={{width:"100rpx",height:"100rpx"}} mode="widthFix"/>

                  </View>
                  <View style={{width:"180rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                    <Text style={{color:"#333333",fontSize:"26rpx"}}>{item.service.name}</Text>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>￥{item.price}</Text>
                  </View>
                  <View style={{width:"180rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                    <Text style={{color:"#cc0033",fontSize:"26rpx"}}>{item.status_title}</Text>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>×{item.num}</Text>
                  </View>
                  <View style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>预计:{item.has_time}分钟</Text>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>合计:￥{item.p_total}</Text>
                  </View>
                </View>

              </View>)
            })}


          </View>}
          {worker&&worker.length>0&&<View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"0rpx 10rpx 5rpx 10rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>相关人员</Text>

            </View>
            <View>
              {worker.map((item,i)=>{
                return(<View key={i} style={{display:"flex",margin:"10rpx",padding:"10rpx",borderBottom:"1px solid #f0f2f5"}} onClick={this.toworker.bind(this,item.worker.id)}>
                  <View style={{width:"100rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",border:"solid 1rpx #f0f2f5"}}>
                    <Image src={set.server_up+item.worker.header_pic} style={{width:"100rpx",height:"100rpx"}} mode="widthFix"/>

                  </View>
                  <View style={{flex:1,display:"flex",paddingLeft:"30rpx",justifyContent:"center",flexDirection:"column"}}>
                    <Text style={{color:"#333333",fontSize:"26rpx"}}>{item.worker.real_name}</Text>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>负责{item.process}</Text>
                  </View>

                  <View style={{width:"200rpx",height:"100rpx",display:"flex",alignItems:"flex-end",justifyContent:"center",flexDirection:"column"}}>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>{item.worker.job_name}</Text>

                  </View>
                </View>)

              })}

            </View>


          </View>}
          {this.state.order&&this.state.order.photo&&<View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"0rpx 10rpx 5rpx 10rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>施工图片</Text>

            </View>
            <View>
              <View style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",border:"solid 1rpx #f0f2f5"}}>
                <Image src={set.server_up+this.state.order.photo} style={{width:"100%",height:"150rpx"}} mode="widthFix"/>
              </View>
            </View>


          </View>}
        </ScrollView>
          {this.state.order&&<View style={{position:"fixed",height:"105rpx",backgroundColor:"#000000",left:0,right:0,bottom:0,display:"flex"}}>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",flex:1}}>
              <Text style={{fontSize:"24rpx",color:"#ffffff"}}>
                实付: ￥{parseFloat(this.state.order.show_total).toFixed(2)}

              </Text>
            </View>
            {this.state.order.pay_status==0?<Button  open-type="getUserInfo" onGetUserInfo={this.getuserinfo.bind(this)} style={{width:"280rpx",backgroundColor:"#cc0033",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"0rpx"}}>
              <Text style={{fontSize:"30rpx",color:"#ffffff"}}>
                确认支付

              </Text>

            </Button>:<View style={{width:"280rpx",backgroundColor:"#cccccc",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Text style={{fontSize:"30rpx",color:"#ffffff"}}>
                已付款

              </Text>

            </View>}


          </View>}
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
export default connect(mapstate)(orther_pay)

