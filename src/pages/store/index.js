import Taro, { Component} from '@tarojs/taro'
import { View, Button, Text, Swiper,SwiperItem,Image,ScrollView} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num,
} from '../../actions/IndexAction'
// import base from "../base"
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"
class Index extends Component {
    constructor(props)
    {
      // base(this)
      super(props)
      this.state={
        sild:[]
      }
    }
    config = {
    navigationBarTitleText: '门店',
      enablePullDownRefresh:true,
  }
  onReachBottom()
  {
    console.log("bbbbb");
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  onPullDownRefresh()
  {
    this.fetchData()
  }

  componentWillUnmount () { }

  componentDidShow () {
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
  componentDidHide () { }

  render () {
    return (
      <ScrollView
        onScrollToUpper={this.u}
        onScrollToLower={this.d}
        onScroll={this.s}
      >
        {/***头部轮播***/}
        <View style={{height:"60vw",background:"#f0f2f5"}}>
          <Swiper autoplay={true} indicatorDots={true}>
            {
              this.state.sild.map((item,i)=>{
                return(<SwiperItem key={i}>
                  <Image src={item} style={{height:"60vw"}}></Image>
                </SwiperItem>)
              })
            }

          </Swiper>
        </View>
        {/***用户信息***/}
        <View style={{height:"60vw",background:"#f0f2f5"}}>

        </View>

        {/***会员信息***/}
        <View style={{height:"60vw",background:"#f0f2f5"}}>

        </View>

        <View style={{height:"60vw",background:"#f0f2f5"}}>

        </View>

        <View style={{height:"60vw",background:"#f0f2f5"}}>

        </View>
      </ScrollView>
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
export default connect(mapstate)(Index)

