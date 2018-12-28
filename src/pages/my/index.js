import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num,
} from '../../actions/IndexAction'
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"

class My extends Component {
  constructor(props) {

    super(props)
    this.state = {

    }
  }

  config = {
    navigationBarTitleText: '亨亨养车',
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: "#cc0033",
    navigationBarTextStyle: {color: "#ffffff", fontWeight: "bold"}

  }

  onReachBottom() {

  }

  componentWillReceiveProps(nextProps) {

  }

  onPullDownRefresh() {
    // this.fetchData()
  }

  componentWillUnmount() {
  }

  componentDidShow() {

  }

  onPageScroll(e) {

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
        <View style={{
          backgroundImage: `url(${require('../../asset/images/mybk.png')})`,
          height:"300rpx"}}>

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
    pushdata: state.pushdata
  }
}
export default connect(mapstate)(My)

