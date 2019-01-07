import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView,Input} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num,
} from '../../actions/IndexAction'
// import base from "../base"
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"

class Washcard extends Component {
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
      <View style={{backgroundColor:"#f0f2f5",height:"100vh"}}>
        <View style={{backgroundColor:"#ffffff"}}>
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
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"bold"}}>我的洗车卡</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView >
          <View style={{display:"flex",position:"relative",backgroundImage: `url(${require('../../assets/images/coupon/j1.png')})`,backgroundSize:"cover",height:"230rpx",margin:"15rpx",border:"2rpx solid #cccccc",borderRadius:"15rpx"}}>
            <View style={{height:"100%",width:"200rpx",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
              <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                快洗
              </Text>
              <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                ×1
              </Text>


            </View>
            <View style={{flex:1,display:"flex"}}>
              <View style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                  来源：系统赠送
                </Text>
                <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                  适用车辆：湘UL7075
                </Text>
                <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                  适用门店：所有门店
                </Text>
                <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                  有效期至：2019年01月08日
                </Text>
              </View>
              <View style={{width:"120rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Text style={{fontSize:"26rpx",color:"#cc0033"}}>
                  分享
                </Text>

              </View>

            </View>
            <View style={{width:"200rpx",display:"flex",position:"absolute",top:"25%",left:"55%"}}>
              <Image src={require("../../assets/images/coupon/sharecard.png")} style={{flex:1}} mode={"widthFix"}/>
            </View>

          </View>
          <View style={{display:"flex",backgroundImage: `url(${require('../../assets/images/coupon/j4.png')})`,backgroundSize:"cover",height:"230rpx",margin:"15rpx",border:"2rpx solid #cccccc",borderRadius:"15rpx"}}>
            <View style={{height:"100%",width:"200rpx",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
              <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                快洗
              </Text>
              <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                ×1
              </Text>


            </View>
            <View style={{flex:1,display:"flex"}}>
              <View style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                  来源：系统赠送
                </Text>
                <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                  适用车辆：湘UL7075
                </Text>
                <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                  适用门店：所有门店
                </Text>
                <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                  有效期至：2019年01月08日
                </Text>
              </View>
              <View style={{width:"120rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Text style={{fontSize:"26rpx",color:"#cc0033"}}>
                  赠出
                </Text>

              </View>

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
export default connect(mapstate)(Washcard)

