import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView} from '@tarojs/components'
import {AtButton} from "taro-ui"
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num, set_wxuser
} from '../../actions/IndexAction'
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"

class My extends Component {
  constructor(props) {

    super(props)
    this.state = {}
  }

  config = {
    navigationBarTitleText: '亨亨养车',
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: "#cc0033",
  //  navigationBarTextStyle: {color: "#ffffff", fontWeight: "bold"}
  //   navigationBarTextStyle: ""

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

  gootoorder() {
    Taro.navigateTo({url: "/pages/my/otoorder"})
  }

  towashcard() {
    Taro.navigateTo({url: "/pages/my/washcard"})
  }

  onPageScroll(e) {

  }

  fetchData() {
    wx.showLoading({title: "加载中"})



  }
  toaccount()
  {
    Taro.navigateTo({url:"/pages/my/account"})
  }
  tologin(val) {
    if (val.detail.userInfo) {
      var wxuser = Object.assign({}, this.props.wxuser.wxuser, val.detail.userInfo);
      this.props.dispatch(set_wxuser(wxuser))
      wx.setStorageSync("wxuser", JSON.stringify(wxuser));
      setTimeout(() => {
        Taro.navigateTo({
          url: "/pages/my/login"
        })
      }, 200)
    }
  }

  componentDidHide() {
  }
  tomycar()
  {
    Taro.navigateTo({url:"/pages/my/MyCar"})
  }
  render() {
    return (
      <ScrollView>
        <View
          style={{
            backgroundImage:`url("http://app.jzdzsw.cn/backend/web/wxbackimage/mybk.png")`,
            height: "280rpx", display: "flex", paddingBottom: "20rpx"
          }}>
          <View style={{width: "200rpx", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>

            <Image
              src={this.props.userinfo && this.props.userinfo.userinfo ? this.props.userinfo.userinfo.wx_head_pic : require("../../assets/images/avatar.png")}
              style={{width: "150rpx", height: "150rpx", borderRadius: "75rpx", marginBottom: "20rpx"}}></Image>

          </View>

          <View style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "column"
          }}>
            {this.props.userinfo.userinfo&&this.props.userinfo.userinfo.wx_nickname?<View style={{height: "40rpx", width: "100%"}}>
              <Text style={{fontSize:"30rpx",color:"#ffffff"}}>{this.props.userinfo.userinfo.wx_nickname}</Text>
            </View>:<View style={{height: "60rpx", width: "100%"}}>
              <AtButton open-type="getUserInfo" size='small' onGetUserInfo={this.tologin.bind(this)}><Text
                style={{color: "#ffffff"}}> 请登陆 </Text></AtButton>
            </View>}

            <View style={{width: "100%", height: "120rpx", display: "flex"}}>
              <View style={{flex: 1, padding: "30rpx 0rpx 20rpx 0rpx", display: "flex"}}>

                <View style={{
                  borderRight: "solid 2rpx #ffffff",
                  flex: 1,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  flexDirection: "column",
                  paddingRight: "30rpx"
                }}>
                  <View style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <Text style={{fontSize: "26rpx", color: "#ffffff"}}>
                      {this.props.userinfo.userinfo&&this.props.userinfo.userinfo.user_level?this.props.userinfo.userinfo.user_level:"非会员"}
                    </Text>


                    <Text style={{fontSize: "26rpx", color: "#ffffff"}}>
                      {this.props.userinfo.userinfo&&this.props.userinfo.userinfo.level_end_day?this.props.userinfo.userinfo.level_end_day:"长期有效"}
                    </Text>
                  </View>
                </View>

                <View style={{
                  borderRight: "solid 2rpx #ffffff",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column"
                }}>
                  <View style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <View style={{display: "flex", alignItems: "center"}}>
                      <Image src={require("../../assets/images/yue.png")} style={{width: "32rpx", height: "32rpx"}}/>
                      <Text style={{fontSize: "26rpx", color: "#ffffff"}}>
                        余额
                      </Text>
                    </View>
                    <Text style={{fontSize: "26rpx", color: "#ffffff"}}>
                      ￥{this.props.userinfo.userinfo&&this.props.userinfo.userinfo.user_money?this.props.userinfo.userinfo.user_money:0}
                    </Text>
                  </View>

                </View>
                <View style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexDirection: "column",
                  paddingLeft: "30rpx"
                }}>
                  <View style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <View style={{display: "flex", alignItems: "center"}}>
                      <Image src={require("../../assets/images/jifeng.png")} style={{width: "32rpx", height: "32rpx"}}/>
                      <Text style={{fontSize: "26rpx", color: "#ffffff"}}>
                        积分
                      </Text>
                    </View>
                    <Text style={{fontSize: "26rpx", color: "#ffffff"}}>
                      ￥{this.props.userinfo.userinfo&&this.props.userinfo.userinfo.pay_points?this.props.userinfo.userinfo.pay_points:0}
                    </Text>
                  </View>

                </View>
              </View>


            </View>

          </View>

        </View>
        <View onClick={this.tomycar.bind(this)} style={{
          display: "flex",
          alignItems: "center",
          height: "120rpx",
          borderBottom: "solid 20rpx #f0f2f5",
          justifyContent: "space-between"
        }}>
          {this.props.userinfo.userinfo&&this.props.userinfo.userinfo.car&&<View
            style={{
            display: "flex",
            alignItems: "center",
            flex:1,
            justifyContent: "space-between"
          }}>

          <View
            style={{
            width: "140rpx",
            height: "120rpx",
            alignItems: "center",
            justifyContent: "center",
            display: "flex"
          }}>
            <Image src={set.server_up+this.props.userinfo.userinfo.car.logo}
                   style={{width: "90rpx", height: "90rpx", borderRadius: "35rpx"}} mode="widthFix"/>
          </View>
          <View style={{flex: 1}}>
            <Text style={{display: "block", color: "#666666", fontSize: "28rpx"}}>
              {this.props.userinfo.userinfo.car.car_plate}
            </Text>
            <Text style={{display: "block", color: "#999999", fontSize: "20rpx"}}>
              {this.props.userinfo.userinfo.car.series}
            </Text>
          </View>
          <View
            style={{width: "80rpx", height: "120rpx", alignItems: "center", justifyContent: "center", display: "flex"}}>
            <Image src={require("../../assets/images/right.png")} style={{width: "46rpx", height: "46rpx"}}/>
          </View>

          </View>}

        </View>
        <View onClick={this.gootoorder.bind(this)} style={{
          display: "flex",
          alignItems: "center",
          height: "120rpx",
          borderBottom: "solid 2rpx #f0f2f5",
          justifyContent: "space-between"
        }}>

          <View style={{
            width: "140rpx",
            height: "120rpx",
            alignItems: "center",
            justifyContent: "center",
            display: "flex"
          }}>
            <View style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "35rpx",
              height: "70rpx",
              width: "70rpx",
              backgroundColor: "#a389ec"
            }}>
              <Image src={require("../../assets/images/washcar.png")} style={{width: "40rpx", height: "40rpx"}}/>
            </View>

          </View>
          <View style={{flex: 1}} >
            <Text style={{display: "block", color: "#333333", fontSize: "26rpx"}}>
              我的消费
            </Text>

          </View>
          <View style={{
            width: "100rpx",
            height: "120rpx",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            paddingRight: "10rpx"
          }}>
            {this.props.userinfo.userinfo&&this.props.userinfo.userinfo.oto_order_count&&this.props.userinfo.userinfo.oto_order_count>0&&<View style={{
              height: "50rpx",
              width: "50rpx",
              borderRadius: "25rpx",
              backgroundColor: "#cc0033",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              marginRight: "10rpx"
            }}><Text style={{fontSize: "22rpx", color: "#ffffff", fontWeight: "bold"}}>{this.props.userinfo.userinfo.oto_order_count}</Text></View>}
            <Image src={require("../../assets/images/right.png")} style={{width: "36rpx", height: "36rpx"}}/>
          </View>


        </View>
        <View onClick={this.towashcard.bind(this)} style={{
          display: "flex",
          alignItems: "center",
          height: "120rpx",
          borderBottom: "solid 2rpx #f0f2f5",
          justifyContent: "space-between"
        }}>

          <View style={{
            width: "140rpx",
            height: "120rpx",
            alignItems: "center",
            justifyContent: "center",
            display: "flex"
          }}>
            <View style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "35rpx",
              height: "70rpx",
              width: "70rpx",
              backgroundColor: "#6890ff"
            }}>
              <Image src={require("../../assets/images/washcard.png")} style={{width: "40rpx", height: "40rpx"}}/>
            </View>

          </View>
          <View  style={{flex: 1}}>
            <Text style={{display: "block", color: "#333333", fontSize: "26rpx"}}>
              我的洗车卡
            </Text>

          </View>
          <View style={{
            width: "100rpx",
            height: "120rpx",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            paddingRight: "10rpx"
          }}>
            {this.props.userinfo.userinfo&&this.props.userinfo.userinfo.bag_count&&this.props.userinfo.userinfo.bag_count>0&&<View style={{
              height: "50rpx",
              width: "50rpx",
              borderRadius: "25rpx",
              backgroundColor: "#cc0033",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              marginRight: "10rpx"
            }}><Text style={{fontSize: "22rpx", color: "#ffffff", fontWeight: "bold"}}>{this.props.userinfo.userinfo.bag_count}</Text></View>}
            <Image src={require("../../assets/images/right.png")} style={{width: "36rpx", height: "36rpx"}}/>
          </View>


        </View>
        <View onClick={this.toaccount.bind(this)}  style={{
          display: "flex",
          alignItems: "center",
          height: "120rpx",
          borderBottom: "solid 2rpx #f0f2f5",
          justifyContent: "space-between"
        }}>

          <View style={{
            width: "140rpx",
            height: "120rpx",
            alignItems: "center",
            justifyContent: "center",
            display: "flex"
          }}>
            <View style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "35rpx",
              height: "70rpx",
              width: "70rpx",
              backgroundColor: "#08c65a"
            }}>
              <Image src={require("../../assets/images/myinfo.png")} style={{width: "36rpx", height: "36rpx"}}/>
            </View>

          </View>
          <View  style={{flex: 1}}>
            <Text style={{display: "block", color: "#333333", fontSize: "26rpx"}}>
              资金记录
            </Text>

          </View>
          <View style={{
            width: "100rpx",
            height: "120rpx",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            paddingRight: "10rpx"
          }}>
            <View style={{
              height: "50rpx",
              width: "50rpx",
              borderRadius: "25rpx",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              marginRight: "10rpx"
            }}><Text style={{fontSize: "22rpx", color: "#ffffff", fontWeight: "bold"}}></Text></View>
            <Image src={require("../../assets/images/right.png")} style={{width: "36rpx", height: "36rpx"}}/>
          </View>


        </View>
        <View style={{
          display: "flex",
          alignItems: "center",
          height: "120rpx",
          borderBottom: "solid 2rpx #f0f2f5",
          justifyContent: "space-between"
        }}>

          <View style={{
            width: "140rpx",
            height: "120rpx",
            alignItems: "center",
            justifyContent: "center",
            display: "flex"
          }}>
            <View style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "35rpx",
              height: "70rpx",
              width: "70rpx",
              backgroundColor: "#f6cc28"
            }}>
              <Image src={require("../../assets/images/tel.png")} style={{width: "36rpx", height: "36rpx"}}/>
            </View>

          </View>
          <View style={{flex: 1}}>
            <Text style={{display: "block", color: "#333333", fontSize: "26rpx"}}>
              客服电话
            </Text>

          </View>
          <View style={{
            width: "200rpx",
            height: "120rpx",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            paddingRight: "10rpx"
          }}>
            <View style={{
              height: "50rpx",
              width: "200rpx",
              borderRadius: "25rpx",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              marginRight: "10rpx"
            }}><Text style={{fontSize: "22rpx", color: "#666666", fontWeight: "bold"}}>0743-8519899</Text></View>

          </View>


        </View>
        <View style={{
          display: "flex",
          alignItems: "center",
          height: "120rpx",
          borderBottom: "solid 2rpx #f0f2f5",
          justifyContent: "space-between"
        }}>

          <View style={{
            width: "140rpx",
            height: "120rpx",
            alignItems: "center",
            justifyContent: "center",
            display: "flex"
          }}>
            <View style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "35rpx",
              height: "70rpx",
              width: "70rpx",
              backgroundColor: "#f893bf"
            }}>
              <Image src={require("../../assets/images/weixing.png")} style={{width: "36rpx", height: "36rpx"}}/>
            </View>

          </View>
          <View style={{flex: 1}}>
            <Text style={{display: "block", color: "#333333", fontSize: "26rpx"}}>
              在线客服
            </Text>

          </View>
          <View style={{
            width: "100rpx",
            height: "120rpx",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            paddingRight: "10rpx"
          }}>
            <View style={{
              height: "50rpx",
              width: "50rpx",
              borderRadius: "25rpx",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              marginRight: "10rpx"
            }}><Text style={{fontSize: "22rpx", color: "#ffffff", fontWeight: "bold"}}></Text></View>
            <Image src={require("../../assets/images/right.png")} style={{width: "36rpx", height: "36rpx"}}/>
          </View>


        </View>


      </ScrollView>
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
export default connect(mapstate)(My)

