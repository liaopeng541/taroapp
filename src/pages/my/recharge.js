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

class Recharge extends Component {
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
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"bold"}}>充值</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView >
          <View style={{padding:"20rpx",borderBottom:"10rpx solid #f0f2f5",display:"flex"}}>
            <View style={{flex:1,padding:"10rpx",display:"flex"}}>
              <Image src="https://wx.qlogo.cn/mmopen/vi_32/13fqPkeaUSMx4Eyu7jPT9FUJdYIXznX5Wg56S2rPZ6bFcdKfnjA4iafu1UzIUKXRI6H0bFOPPe0aiaLaGZuOT2Dw/132" style={{width:"60rpx",height:"60rpx",borderRadius:"25rpx"}}/>
              <View style={{flex:1,marginLeft:"20rpx"}}>
                <Text style={{display:"block",color:"#333333",fontSize:"26rpx"}}>
                  1597***2691
                </Text>
                <Text style={{display:"block",color:"#999999",fontSize:"20rpx"}}>
                  亨亨会员
                </Text>
              </View>
            </View>
            <View style={{flex:1,padding:"10rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>

                <Text style={{display:"block",color:"#333333",fontSize:"26rpx"}}>账户余额:</Text>
              <Text style={{display:"block",color:"#cc0033",fontSize:"26rpx"}}>183.00</Text><Text style={{display:"block",color:"#333333",fontSize:"26rpx"}}>元</Text>


            </View>



          </View>
          <View style={{padding:"20rpx",borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <Text style={{fontSize:"26rpx",color:"#333333"}}>充值金额</Text>
              <View style={{margin:"20rpx",display:"flex",border:"2rpx solid #cccccc",height:"50rpx",borderRadius:"10rpx",padding:"10rpx 20rpx 10rpx 20rpx"}}>
                <Input style={{flex:1,color:"#cc0033",textAlign:"center"}} type="digit"/>

              </View>
            <View style={{display:"flex",flexWrap:"wrap"}}>
              <View style={{ border: "2rpx solid #dad2b2",height:"80rpx",width:"190rpx",borderRadius:"10rpx",display:"flex",alignItems:"center",justifyContent:"center",margin:"20rpx"}}>
                <Text style={{color:"#cc0033",fontSize:"30rpx"}}>99元</Text>
              </View>
              <View style={{ border: "2rpx solid #dad2b2",height:"80rpx",width:"190rpx",borderRadius:"10rpx",display:"flex",alignItems:"center",justifyContent:"center",margin:"20rpx"}}>
                <Text style={{color:"#cc0033",fontSize:"30rpx"}}>99元</Text>
              </View>
              <View style={{ border: "2rpx solid #dad2b2",height:"80rpx",width:"190rpx",borderRadius:"10rpx",display:"flex",alignItems:"center",justifyContent:"center",margin:"20rpx"}}>
                <Text style={{color:"#cc0033",fontSize:"30rpx"}}>99元</Text>
              </View>
              <View style={{ border: "2rpx solid #dad2b2",height:"80rpx",width:"190rpx",borderRadius:"10rpx",display:"flex",alignItems:"center",justifyContent:"center",margin:"20rpx"}}>
                <Text style={{color:"#cc0033",fontSize:"30rpx"}}>99元</Text>
              </View>
              <View style={{ border: "2rpx solid #dad2b2",height:"80rpx",width:"190rpx",borderRadius:"10rpx",display:"flex",alignItems:"center",justifyContent:"center",margin:"20rpx"}}>
                <Text style={{color:"#cc0033",fontSize:"30rpx"}}>99元</Text>
              </View>
              <View style={{ border: "2rpx solid #dad2b2",height:"80rpx",width:"190rpx",borderRadius:"10rpx",display:"flex",alignItems:"center",justifyContent:"center",margin:"20rpx"}}>
                <Text style={{color:"#cc0033",fontSize:"30rpx"}}>99元</Text>
              </View>



            </View>





          </View>

          <View style={{padding:"20rpx",borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{borderBottom:"2rpx solid #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>充值说明</Text>
            </View>
            <View style={{padding:"20rpx"}}>
              <View style={{borderBottom:"1px solid #f0f2f5",display:"flex",padding:"10rpx"}}>
                <View style={{width:"150rpx"}}>

                </View>
                <View style={{flex:1,display:"flex",alignItems:"center"}}>
                  <Text style={{color:"#333333",fontSize:"26rpx"}}>
                    充值99到598元成为哼哼会员。快洗价11元每次，首次充值送3次快洗服务
                  </Text>

                </View>

              </View>
            </View>
            <View style={{padding:"20rpx"}}>
              <View style={{borderBottom:"1px solid #f0f2f5",display:"flex",padding:"10rpx"}}>
                <View style={{width:"150rpx"}}>

                </View>
                <View style={{flex:1,display:"flex",alignItems:"center"}}>
                  <Text style={{color:"#333333",fontSize:"26rpx"}}>
                    充值99到598元成为哼哼会员。快洗价11元每次，首次充值送3次快洗服务
                  </Text>

                </View>

              </View>
            </View>
            <View style={{padding:"20rpx"}}>
              <View style={{borderBottom:"1px solid #f0f2f5",display:"flex",padding:"10rpx"}}>
                <View style={{width:"150rpx"}}>

                </View>
                <View style={{flex:1,display:"flex",alignItems:"center"}}>
                  <Text style={{color:"#333333",fontSize:"26rpx"}}>
                    充值99到598元成为哼哼会员。快洗价11元每次，首次充值送3次快洗服务
                  </Text>

                </View>

              </View>
            </View>
            <View style={{padding:"20rpx"}}>
              <View style={{borderBottom:"1px solid #f0f2f5",display:"flex",padding:"10rpx"}}>
                <View style={{width:"150rpx"}}>

                </View>
                <View style={{flex:1,display:"flex",alignItems:"center"}}>
                  <Text style={{color:"#333333",fontSize:"26rpx"}}>
                    充值99到598元成为哼哼会员。快洗价11元每次，首次充值送3次快洗服务
                  </Text>

                </View>

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
export default connect(mapstate)(Recharge)

