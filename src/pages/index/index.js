import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView,} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {AtModal, AtModalHeader, AtModalContent, AtModalAction,AtButton} from "taro-ui"
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num, set_wxuser
} from '../../actions/IndexAction'
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"
import "./css/index.css"
import base from "../base"
class Index extends Component {
  constructor(props) {
    super(props)
    base(this)
    this.state = {
      sild: [],
      title_opac: 0,
      wxerror: false
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

  getCatch() {
    wx.removeStorageSync("wxuser");
    wx.removeStorageSync("userinfo");

    var wxuser = wx.getStorageSync("wxuser");
    if (wxuser) {
      this.wxuser = JSON.parse(wxuser);
      this.props.dispatch(set_wxuser(this.wxuser))
    }
    var userinfo = wx.getStorageSync("userinfo");
    if (userinfo) {
      this.userinfo = JSON.parse(userinfo)
      this.props.dispatch(set_userinfo(this.userinfo))
    }
  }

  componentDidShow() {
    this.getwxuser().then((res) => {
      this.fetchData()
    });
  }

  fetchData() {
    wx.showLoading({title: "加载中..."})
    var databody = {
      device_token: this.props.wxuser.wxuser.openid
    }
    this.wx_request(set.home, databody, "POST").then((res) => {
      this.setState({
        sild: res.data.data.sild
      })
      this.props.dispatch(set_viplist(res.data.data.vip))
      wx.hideLoading();
    })


  }

  test() {
    console.log(this.props.vip.viplist)
  }

  onPageScroll(e) {
    this.setState({
      title_opac: e.scrollTop / 100 > 1 ? 1 : e.scrollTop / 100
    }, () => {
      console.log(this.state.title_opac)
    })
  }


  tootoorder() {
    Taro.navigateTo({url: "/pages/my/otoorder"})
  }

  towashcard() {
    Taro.navigateTo({url: "/pages/my/washcard"})
  }

  toWallet() {
    this.checkLogin.then(()=>{
      Taro.navigateTo({url: "/pages/my/wallet"})
    }).catch(()=>{
      Taro.navigateTo({url: "/pages/my/login"})
    })

  }

  componentDidHide() {
  }
  tologin(val)
  {
    wx.showLoading({title:"加载中..",mask:true})

    if(val.detail.userInfo)
    {

      var wxuser=Object.assign({},this.props.wxuser.wxuser,val.detail.userInfo,val.detail);
      console.log(wxuser)
      wx.hideLoading();
      this.props.dispatch(set_wxuser(wxuser))
      wx.setStorageSync("wxuser",JSON.stringify(wxuser));

      setTimeout(()=>{
        wx.hideLoading();
        Taro.navigateTo({
          url:"/pages/my/login"
        })
      },200)


    }

  }
  tovipdetail(id)
  {
    Taro.navigateTo({url:"/pages/index/vip?id="+id})
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
                    style={{background: "#ffffff", height: "58vw"}}>
              {

                this.state.sild.map((item, i) => {
                  return (<SwiperItem key={i}>
                    <Image src={set.upurl + item.image} style={{width: "100vw"}} mode="widthFix"></Image>
                  </SwiperItem>)
                })
              }

            </Swiper>
          </View>
          {/***用户信息***/}
          <View style={{
            height: "80rpx",
            padding: "0rpx 10rpx 0rpx 10rpx",
            backgroundImage: `url('../../assets/images/carbk.png')`,
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}>
            <View style={{height: "100%", display: "flex", alignItems: "center",flex:1}}>
              <Image src={require("../../assets/images/user.png")} style={{width: "30rpx", height: "30rpx"}}/>
              {this.props.userinfo.userinfo?<View style={{height: "100%", display: "flex", alignItems: "center", flex: 1,justifyContent:"space-between"}}>
                <View style={{height: "100%", display: "flex", alignItems: "center",flex:1}}>
                <Image
                  src={this.props.userinfo && this.props.userinfo.userinfo ? this.props.wxuser.wxuser.avatarUrl : require("../../assets/images/avatar.png")}
                  style={{
                    width: "50rpx",
                    marginLeft: "20rpx",
                    height: "50rpx",
                    borderRadius: "25rpx"
                  }}/>
                <Text style={{fontSize: "26rpx", marginLeft: "20rpx", color: "#666666"}}>
                  {this.props.userinfo && this.props.userinfo.userinfo && this.props.wxuser.wxuser.nickName}
                </Text>
                </View>
                <View style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                  <Image
                    src={this.props.userinfo && this.props.userinfo.userinfo && this.props.userinfo.userinfo.car ? set.upurl + this.props.userinfo.userinfo.car.logo : require("../../assets/images/avatar.png")}
                    style={{
                      width: "50rpx",
                      marginLeft: "20rpx",
                      height: "50rpx",
                      borderRadius: "25rpx"
                    }}/>
                  <Text style={{fontSize: "26rpx", fontWeight: "bold", marginLeft: "20rpx", color: "#666666"}}>
                    {this.props.userinfo && this.props.userinfo.userinfo && this.props.userinfo.userinfo.car.car_plate}
                  </Text>
                </View>
              </View>:
                <View style={{height: "100%", display: "flex", alignItems: "center",flex:1,marginLeft:"20rpx"}}>
                  <View style={{height:"60rpx"}}>
                  <AtButton   open-type="getUserInfo" size='small'  onGetUserInfo={this.tologin.bind(this)}>
                      <Text  style={{color:"#cc0033",fontSize:"23rpx"}}>请登陆</Text>
                  </AtButton >
                  </View>
                </View>}
            </View>

          </View>
          <View style={{padding: "20rpx 0rpx 20rpx 0rpx", display: "flex", height: "150rpx"}}>
            <View onClick={this.test.bind(this)} style={{
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
            <View
              onClick={this.towashcard.bind(this)}
              style={{
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
            <View onClick={this.tootoorder.bind(this)} style={{
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
            {
              this.props.vip.viplist && this.props.vip.viplist.length > 0 && this.props.vip.viplist.map((item, i) => {
                return (parseInt(item.is_show) == 1 && <Image onClick={this.tovipdetail.bind(this,item.level_id)} src={set.upurl + item.thumb} key={i}
                                                              style={{
                                                                margin: "10rpx",
                                                                background: "#cccccc",
                                                                flex: 1,
                                                                borderRadius: "10rpx"
                                                              }}
                                                              mode={"widthFix"}
                />)

              })
            }
            {/*{this.props.vip.viplist && this.props.vip.viplist.length>0 && this.props.vip.viplist.map((item,i)=>{*/}
            {/*if(item.is_show==1)*/}
            {/*{*/}
            {/*return(<Image src={set.upurl+item.thumb} key={i}*/}
            {/*style={{margin: "20rpx 10rpx 20rpx 20rpx", background: "#cccccc", flex: 1, borderRadius: "10rpx"}}*/}
            {/*mode="widthFix"></Image>)*/}
            {/*}*/}
            {/*})}*/}


          </View>


        </ScrollView>
        <AtModal isOpened={this.state.wxerror}>
          <AtModalHeader>温馨提示</AtModalHeader>
          <AtModalContent>
            网络不稳定，获取微信信息失败，请点击重试
          </AtModalContent>
          <AtModalAction><Button onClick={this.getwxuser.bind(this)}>重试</Button></AtModalAction>
        </AtModal>
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
    wxuser: state.wxusermodel
  }
}
export default connect(mapstate)(Index)

