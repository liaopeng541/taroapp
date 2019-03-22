import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num,
} from '../../actions/IndexAction'
import base from "../base"
import request from "../../libs/request"
import set from "../../apis/api"

class otopay extends Component {
  constructor(props) {
    super(props)
    base(this)
    this.state = {
      sild: []
    }
  }

  config = {
    navigationBarTitleText: '订单付款',
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
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    this.onPullDownRefresh()


  }
  back()
  {
    Taro.navigateBack()
  }
  fetchData() {


    wx.showLoading({title: "加载中"})
    var databody={
      openid:this.props.wxuser.wxuser.openid,
      id:this.$router.params.id
    }
    this.wx_request(set.oto.getotoorder, databody,"POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((data)=>
    {


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

  componentDidHide() {
  }

  render() {
    return (
      <View>
        <View>
          <ScrollView >
            <View>
              <Text>11</Text>
            </View>






          </ScrollView>
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
export default connect(mapstate)(otopay)

