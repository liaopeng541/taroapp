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
    this.state = {}
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
      <ScrollView>
        <View
          style={{
            backgroundImage: `url(${require('../../assets/images/mybk.png')})`,
            height: "280rpx", display: "flex",paddingBottom:"20rpx"
          }}>
          <View style={{width: "200rpx", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>

            <Image
              src={this.props.userinfo && this.props.userinfo.userinfo ? this.props.userinfo.userinfo.avatarUrl : require("../../assets/images/avatar.png")}
              style={{width: "150rpx", height: "150rpx", borderRadius: "75rpx", marginBottom: "20rpx"}}></Image>

          </View>

          <View style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "column"
          }}>
            <View style={{height: "50rpx", width: "100%"}}>
              <Text style={{color: "#ffffff", fontSize: "36rpx", fontWeight: "bold"}}>12122222</Text>
            </View>
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
                      亨亨用户
                    </Text>


                    <Text style={{fontSize: "26rpx", color: "#ffffff"}}>
                      长期有效
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
                      ￥0
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
                      0
                    </Text>
                  </View>

                </View>
              </View>


            </View>

          </View>

        </View>
        <View style={{display:"flex",alignItems:"center",height:"120rpx",borderBottom:"solid 20rpx #f0f2f5",justifyContent:"space-between"}}>

          <View style={{width:"140rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex"}}>
            <Image src="http://app.jzdzsw.cn/backend/web/Logo/11.jpg" style={{width: "90rpx", height: "90rpx",borderRadius:"35rpx"}}/>
          </View>
          <View style={{flex:1}}>
            <Text style={{display:"block",color:"#666666",fontSize:"28rpx"}}>
              湘UL7075
            </Text>
            <Text style={{display:"block",color:"#999999",fontSize:"20rpx"}}>
              哈弗H6
            </Text>
          </View>
          <View style={{width:"80rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex"}}>
            <Image src={require("../../assets/images/right.png")} style={{width: "46rpx", height: "46rpx"}}/>
          </View>


        </View>
        <View style={{display:"flex",alignItems:"center",height:"120rpx",borderBottom:"solid 2rpx #f0f2f5",justifyContent:"space-between"}}>

          <View style={{width:"140rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex"}}>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"35rpx",height:"70rpx",width:"70rpx",backgroundColor:"#a389ec"}}>
              <Image src={require("../../assets/images/washcar.png")} style={{width: "40rpx", height: "40rpx"}}/>
            </View>

          </View>
          <View style={{flex:1}}>
            <Text style={{display:"block",color:"#333333",fontSize:"26rpx"}}>
              我的消费
            </Text>

          </View>
          <View style={{width:"100rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex",paddingRight:"10rpx"}}>
            <View style={{height:"50rpx",width:"50rpx",borderRadius:"25rpx",backgroundColor:"#cc0033",alignItems:"center",justifyContent:"center",display:"flex",marginRight:"10rpx"}}><Text style={{fontSize:"22rpx",color:"#ffffff",fontWeight:"bold"}}>100</Text></View>
            <Image src={require("../../assets/images/right.png")} style={{width: "36rpx", height: "36rpx"}}/>
          </View>


        </View>
        <View style={{display:"flex",alignItems:"center",height:"120rpx",borderBottom:"solid 2rpx #f0f2f5",justifyContent:"space-between"}}>

          <View style={{width:"140rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex"}}>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"35rpx",height:"70rpx",width:"70rpx",backgroundColor:"#6890ff"}}>
              <Image src={require("../../assets/images/washcard.png")} style={{width: "40rpx", height: "40rpx"}}/>
            </View>

          </View>
          <View style={{flex:1}}>
            <Text style={{display:"block",color:"#333333",fontSize:"26rpx"}}>
              我的洗车卡
            </Text>

          </View>
          <View style={{width:"100rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex",paddingRight:"10rpx"}}>
            <View style={{height:"50rpx",width:"50rpx",borderRadius:"25rpx",backgroundColor:"#cc0033",alignItems:"center",justifyContent:"center",display:"flex",marginRight:"10rpx"}}><Text style={{fontSize:"22rpx",color:"#ffffff",fontWeight:"bold"}}>100</Text></View>
            <Image src={require("../../assets/images/right.png")} style={{width: "36rpx", height: "36rpx"}}/>
          </View>


        </View>
        <View style={{display:"flex",alignItems:"center",height:"120rpx",borderBottom:"solid 2rpx #f0f2f5",justifyContent:"space-between"}}>

          <View style={{width:"140rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex"}}>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"35rpx",height:"70rpx",width:"70rpx",backgroundColor:"#08c65a"}}>
              <Image src={require("../../assets/images/myinfo.png")} style={{width: "36rpx", height: "36rpx"}}/>
            </View>

          </View>
          <View style={{flex:1}}>
            <Text style={{display:"block",color:"#333333",fontSize:"26rpx"}}>
              我的资料
            </Text>

          </View>
          <View style={{width:"100rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex",paddingRight:"10rpx"}}>
            <View style={{height:"50rpx",width:"50rpx",borderRadius:"25rpx",alignItems:"center",justifyContent:"center",display:"flex",marginRight:"10rpx"}}><Text style={{fontSize:"22rpx",color:"#ffffff",fontWeight:"bold"}}></Text></View>
            <Image src={require("../../assets/images/right.png")} style={{width: "36rpx", height: "36rpx"}}/>
          </View>


        </View>
        <View style={{display:"flex",alignItems:"center",height:"120rpx",borderBottom:"solid 2rpx #f0f2f5",justifyContent:"space-between"}}>

          <View style={{width:"140rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex"}}>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"35rpx",height:"70rpx",width:"70rpx",backgroundColor:"#f6cc28"}}>
              <Image src={require("../../assets/images/tel.png")} style={{width: "36rpx", height: "36rpx"}}/>
            </View>

          </View>
          <View style={{flex:1}}>
            <Text style={{display:"block",color:"#333333",fontSize:"26rpx"}}>
              客服电话
            </Text>

          </View>
          <View style={{width:"200rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex",paddingRight:"10rpx"}}>
            <View style={{height:"50rpx",width:"200rpx",borderRadius:"25rpx",alignItems:"center",justifyContent:"center",display:"flex",marginRight:"10rpx"}}><Text style={{fontSize:"22rpx",color:"#666666",fontWeight:"bold"}}>0743-8519899</Text></View>

          </View>


        </View>
        <View style={{display:"flex",alignItems:"center",height:"120rpx",borderBottom:"solid 2rpx #f0f2f5",justifyContent:"space-between"}}>

          <View style={{width:"140rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex"}}>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"35rpx",height:"70rpx",width:"70rpx",backgroundColor:"#f893bf"}}>
              <Image src={require("../../assets/images/weixing.png")} style={{width: "36rpx", height: "36rpx"}}/>
            </View>

          </View>
          <View style={{flex:1}}>
            <Text style={{display:"block",color:"#333333",fontSize:"26rpx"}}>
              在线客服
            </Text>

          </View>
          <View style={{width:"100rpx",height:"120rpx",alignItems:"center",justifyContent:"center",display:"flex",paddingRight:"10rpx"}}>
            <View style={{height:"50rpx",width:"50rpx",borderRadius:"25rpx",alignItems:"center",justifyContent:"center",display:"flex",marginRight:"10rpx"}}><Text style={{fontSize:"22rpx",color:"#ffffff",fontWeight:"bold"}}></Text></View>
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
    pushdata: state.pushdata
  }
}
export default connect(mapstate)(My)

