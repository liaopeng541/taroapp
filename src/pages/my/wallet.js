import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num,
} from '../../actions/IndexAction'
// import base from "../base"
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"

class Wallet extends Component {
  constructor(props) {
    // base(this)
    super(props)
    this.state = {
      sild: []
    }
  }

  config = {
    navigationBarTitleText: '门店',
    enablePullDownRefresh: true,
  }

  onReachBottom() {
    console.log("bbbbb");
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  onPullDownRefresh() {
  //  this.fetchData()
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getUserInfo({
      success(res) {
        const userInfo = res.userInfo
        const nickName = userInfo.nickName
        const avatarUrl = userInfo.avatarUrl
        const gender = userInfo.gender // 性别 0：未知、1：男、2：女
        const province = userInfo.province
        const city = userInfo.city
        const country = userInfo.country
        console.log(res)
      }
    })
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

  componentDidHide() {
  }

  render() {
    return (
      <View>
        <View>
        <View style={{
          backgroundColor: "#cc0033",
          height: "105rpx",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingBottom: "10rpx",
          position:"relative",
          top:"0rpx",
          left:"0rpx",
          right:"0rpx",
          zIndex:99
        }}>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
            <Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>
          </View>
          <View style={{flex:1,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <Text style={{color: "#ffffff", fontSize: "36rpx"}}>我的钱包</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView
        >
          <Image src="http://app.jzdzsw.cn/backend/web/data/walletbg.jpg" mode="widthFix" style={{width:"100%"}}/>
          <View style={{display:"flex",alignItems:"center",height:"150rpx",borderBottom:"solid 2rpx #f0f2f5",justifyContent:"space-between"}}>
            <View style={{width:"140rpx",height:"150rpx",alignItems:"center",justifyContent:"center",display:"flex"}}>
              <View style={{display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"40rpx",height:"80rpx",width:"80rpx",backgroundColor:"#f6cc28"}}>
                <Image src={require("../../assets/images/tel.png")} style={{width: "40rpx", height: "40rpx"}}/>
              </View>
            </View>
            <View style={{flex:1}}>
              <Text style={{display:"block",color:"#333333",fontSize:"26rpx",fontWeight:"bold"}}>
                余额
              </Text>

            </View>
            <View style={{width:"200rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex",paddingRight:"10rpx"}}>
              <View style={{height:"50rpx",width:"200rpx",borderRadius:"25rpx",alignItems:"center",justifyContent:"center",display:"flex",marginRight:"10rpx"}}><Text style={{fontSize:"30rpx",color:"#cc0033",fontWeight:"bold"}}>￥183.00</Text></View>
            </View>


          </View>
          <View style={{display:"flex",alignItems:"center",height:"130rpx",borderBottom:"solid 2rpx #f0f2f5",justifyContent:"space-between"}}>
            <View style={{width:"140rpx",height:"130rpx",alignItems:"center",justifyContent:"center",display:"flex"}}>
              <View style={{display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"40rpx",height:"80rpx",width:"80rpx",backgroundColor:"#6890ff"}}>
                <Image src={require("../../assets/images/washcard.png")} style={{width: "40rpx", height: "40rpx"}}/>
              </View>
            </View>
            <View style={{flex:1}}>
              <Text style={{display:"block",color:"#333333",fontSize:"26rpx",fontWeight:"bold"}}>
                充值
              </Text>
              <Text style={{display:"block",color:"#999999",fontSize:"20rpx"}}>
                享更大优惠，余额自由使用
              </Text>
            </View>
            <View style={{width:"100rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex",paddingRight:"10rpx"}}>

              <Image src={require("../../assets/images/right.png")} style={{width: "40rpx", height: "40rpx"}}/>
            </View>
          </View>
          <View style={{display:"flex",alignItems:"center",height:"130rpx",borderBottom:"solid 2rpx #f0f2f5",justifyContent:"space-between"}}>
            <View style={{width:"140rpx",height:"130rpx",alignItems:"center",justifyContent:"center",display:"flex"}}>
              <View style={{display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"40rpx",height:"80rpx",width:"80rpx",backgroundColor:"#6890ff"}}>
                <Image src={require("../../assets/images/washcard.png")} style={{width: "40rpx", height: "40rpx"}}/>
              </View>
            </View>
            <View style={{flex:1}}>
              <Text style={{display:"block",color:"#333333",fontSize:"26rpx",fontWeight:"bold"}}>
                转账
              </Text>
              <Text style={{display:"block",color:"#999999",fontSize:"20rpx"}}>
                转账给朋友，不差钱
              </Text>
            </View>
            <View style={{width:"100rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex",paddingRight:"10rpx"}}>

              <Image src={require("../../assets/images/right.png")} style={{width: "40rpx", height: "40rpx"}}/>
            </View>
          </View>
          <View style={{display:"flex",alignItems:"center",height:"130rpx",borderBottom:"solid 2rpx #f0f2f5",justifyContent:"space-between"}}>
            <View style={{width:"140rpx",height:"130rpx",alignItems:"center",justifyContent:"center",display:"flex"}}>
              <View style={{display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"40rpx",height:"80rpx",width:"80rpx",backgroundColor:"#6890ff"}}>
                <Image src={require("../../assets/images/washcard.png")} style={{width: "40rpx", height: "40rpx"}}/>
              </View>
            </View>
            <View style={{flex:1}}>
              <Text style={{display:"block",color:"#333333",fontSize:"26rpx",fontWeight:"bold"}}>
                交易记录
              </Text>
              <Text style={{display:"block",color:"#999999",fontSize:"20rpx"}}>
                您的详细消费记录
              </Text>
            </View>
            <View style={{width:"100rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex",paddingRight:"10rpx"}}>

              <Image src={require("../../assets/images/right.png")} style={{width: "40rpx", height: "40rpx"}}/>
            </View>
          </View>




        </ScrollView>
        </View>
      </View>
    )
  }
}

const mapstate = state => {
  return {
    data: state.usermodel,
    cart_num: state.cart_num,
    cart: state.cart,
    goodslist: state.goodslist,
    vip: state.vip,
    progress: state.progress,
    pushdata: state.pushdata
  }
}
export default connect(mapstate)(Wallet)

