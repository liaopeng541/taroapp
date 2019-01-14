import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num,set_store
} from '../../actions/IndexAction'
 import base from "../base"
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"

class Index extends Component {
  constructor(props) {
    super(props)
    base(this)
    this.state = {
      isRefreshing: false,
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
    wx.showLoading();
    this.wx_request(set.storelist).then((res)=>{
        this.props.dispatch(set_store(res.data.data))
        wx.hideLoading();
    }).catch((e)=>{
      wx.hideLoading();
      wx.showToast({title:"网络访问失败，请重试",icon:"none"})
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
  todetail(id)
  {
    Taro.navigateTo({
      url:"/pages/store/storedetail?id="+id
    })
  }

  render() {
    return (
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
          <Text style={{color: "#ffffff", fontSize: "36rpx"}}>门 店</Text>
        </View>
        <ScrollView
        >

          {
            this.props.store.store&&this.props.store.store.map((item,i)=>{
              console.log(item)
              return(<View onClick={this.todetail.bind(this,item.id)} key={i} style={{borderBottom: "20rpx solid #f0f2f5"}}>
                <Image src={set.upurl+item.thumb} style={{width: "100%"}}
                       mode="widthFix"/>
                <View>

                  <View style={{display: "flex", padding: "10rpx"}}>
                    <Text style={{fontSize: "30rpx", color: "#333333"}}>{item.name}</Text>
                    <View
                      style={{flex: 1, display: "flex", flexWrap: "wrap", marginLeft: "20rpx", justifyContent: "flex-end"}}>
                      {item.store_label&&item.store_label.map((label,k)=>{
                          return(<View key={k}
                            style={{
                              border: "solid 2rpx #cccccc",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "5rpx",
                              padding: "5rpx 10rpx 5rpx 10rpx",
                              borderRadius: "5rpx"
                            }}>
                            <Text style={{fontSize: "20rpx", color: "#cc0033"}}>{label}</Text>
                          </View>)
                      })}
                    </View>

                  </View>
                </View>
                <View style={{display: "flex", alignItems: "center", padding: "5rpx 10rpx 5rpx 10rpx"}}>
                  <Image src={require("../../assets/images/location.png")} style={{width: "32rpx", height: "32rpx"}}/>
                  <Text style={{color: "#999999", fontSize: "26rpx"}}>{item.address}</Text>
                </View>

              </View>)
            })
          }


        </ScrollView>
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
    pushdata: state.pushdata,
    store:state.store
  }
}
export default connect(mapstate)(Index)

