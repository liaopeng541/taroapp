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

class Index extends Component {
  constructor(props) {
    // base(this)
    super(props)
    this.state = {
      sild: [
        'http://app.jzdzsw.cn/backend/web/uploads/15175626017756.jpg',
        'http://app.jzdzsw.cn/backend/web/uploads/15175626446609.jpg',
        'http://app.jzdzsw.cn/backend/web/uploads/15209522543075.jpg'
      ],
      title_opac: 0
    }
  }

  config = {
    navigationBarTitleText: '亨亨养车',
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: "#cc0033",
    navigationBarTextStyle: {color: "#ffffff", fontWeight: "bold"}

  }

  onReachBottom() {
    console.log("bbbbb");
  }

  componentWillReceiveProps(nextProps) {

  }

  onPullDownRefresh() {
    // this.fetchData()
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    this.title_opac = 0;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    var that = this;
    wx.getUserInfo({
      success(res) {
        that.props.dispatch(set_userinfo(res.userInfo))
      }
    })
  }

  onPageScroll(e) {
    this.setState({
      title_opac: e.scrollTop / 100 > 1 ? 1 : e.scrollTop / 100
    }, () => {
      console.log(this.state.title_opac)
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
  toWallet()
  {
    Taro.navigateTo({url:"/pages/my/wallet"})
  }
  componentDidHide() {
  }

  render() {
    return (
      <View>
        <View style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "#cc0033",
          height: "120rpx",
          zIndex: 9,
          opacity: this.state.title_opac ? this.state.title_opac : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Text style={{
            color: "#ffffff",
            fontSize: "35rpx",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "50rpx"
          }}>亨亨养车</Text>
        </View>
        <ScrollView
          onScrollToUpper={this.u}
          onScrollToLower={this.d}
          onScroll={this.s}
        >

          {/***头部轮播***/}
          <View>
            <Swiper autoplay={true} circular={true} indicatorDots={true}
                    style={{background: "#000000", height: "58vw"}}>
              {
                this.state.sild.map((item, i) => {
                  return (<SwiperItem key={i}>
                    <Image src={item} style={{width: "100vw"}} mode="widthFix"></Image>
                  </SwiperItem>)
                })
              }

            </Swiper>
          </View>
          {/***用户信息***/}
          <View style={{
            height: "80rpx",
            padding: "0rpx 10rpx 0rpx 10rpx",
            backgroundImage: `url(${require('../../assets/images/carbk.png')})`,
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            flexDirection: "row"
          }}>
            <Image src={require("../../assets/images/user.png")} style={{width: "30rpx", height: "30rpx"}}/>
            {this.props.userinfo && <Image src={this.props.userinfo.userinfo.avatarUrl} style={{
              width: "50rpx",
              marginLeft: "20rpx",
              height: "50rpx",
              borderRadius: "25rpx"
            }}/>}
            <Text style={{fontSize: "26rpx", marginLeft: "20rpx", color: "#666666"}}>
              {this.props.userinfo && this.props.userinfo.userinfo.nickName}
            </Text>
          </View>
          <View style={{padding: "20rpx 0rpx 20rpx 0rpx", display: "flex", height: "150rpx"}}>
            <View style={{
              flex: 1,
              borderRight: "solid 1px #f0f2f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}>

              <Image src={require("../../assets/images/menu/menu3.png")}
                     style={{maxWidth: "100rpx", maxHeight: "100rpx"}} mode="widthFix"/>
              <Text style={{fontSize: "24rpx", fontWeight: "bold", color: "#333333", marginTop: "10rpx"}}>
                实卡兑换
              </Text>

              <Text style={{fontSize: "20rpx", color: "#999999", height: "20rpx"}}>


              </Text>


            </View>
            <View style={{
              flex: 1,
              borderRight: "solid 1px #f0f2f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }} onClick={this.toWallet.bind(this)}>

              <Image src={require("../../assets/images/menu/menu2.png")}
                     style={{maxWidth: "100rpx", maxHeight: "100rpx"}} mode="widthFix"/>
              <Text style={{fontSize: "26rpx", fontWeight: "bold", color: "#333333", marginTop: "10rpx"}}>
                我的钱包
              </Text>


              <Text style={{fontSize: "20rpx", color: "#999999", height: "20rpx"}}>
                0元
              </Text>


            </View>
            <View style={{
              flex: 1,
              borderRight: "solid 1px #f0f2f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}>
              <Image src={require("../../assets/images/menu/menu1.png")}
                     style={{maxWidth: "100rpx", maxHeight: "100rpx"}} mode="widthFix"/>
              <Text style={{fontSize: "24rpx", fontWeight: "bold", color: "#333333", marginTop: "10rpx"}}>
                我的洗车卡
              </Text>
              <Text style={{fontSize: "20rpx", color: "#999999", height: "20rpx"}}>
                0张
              </Text>


            </View>
            <View style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}>
              <Image src={require("../../assets/images/menu/menu4.png")}
                     style={{maxWidth: "100rpx", maxHeight: "100rpx"}} mode="widthFix"/>
              <Text style={{fontSize: "24rpx", fontWeight: "bold", color: "#333333", marginTop: "10rpx"}}>
                我的消费
              </Text>
              <Text style={{fontSize: "20rpx", color: "#999999", height: "20rpx"}}>

              </Text>


            </View>
          </View>

          {/***会员信息***/}
          <View style={{
            height: "80rpx",
            padding: "0rpx 10rpx 0rpx 10rpx",
            backgroundImage: `url(${require('../../assets/images/carbk.png')})`,
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            flexDirection: "row"
          }}>
            <Image src={require("../../assets/images/VIP.png")} style={{width: "30rpx", height: "30rpx"}}/>
            <Text style={{fontSize: "24rpx", marginLeft: "20rpx", color: "#333333"}}>
              亨亨会员
            </Text>
          </View>
          <View style={{display: "flex", height: "280rpx", justifyContent: "space-between"}}>
            <Image src="http://app.jzdzsw.cn/backend/web/uploads/15209562411192.png"
                   style={{margin: "20rpx 10rpx 20rpx 20rpx", background: "#cccccc", flex: 1, borderRadius: "10rpx"}}
                   mode="widthFix">


            </Image>
            <Image src="http://app.jzdzsw.cn/backend/web/uploads/15209521742126.png"
                   style={{margin: "20rpx 20rpx 20rpx 10rpx", background: "#cccccc", flex: 1, borderRadius: "10rpx"}}
                   mode="widthFix">


            </Image>


          </View>


        </ScrollView>
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
export default connect(mapstate)(Index)

