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

class Transfer extends Component {
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
  back()
  {
    Taro.navigateBack()
  }
  componentDidShow() {


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
          <View onClick={this.back.bind(this)} style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
            <Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>
          </View>
          <View style={{flex:1,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"bold"}}>转账</Text>
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
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"10rpx 20rpx 10rpx 20rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>接收人信息（</Text><Text style={{fontSize:"26rpx",color:"#cc0033"}}>必填</Text><Text style={{fontSize:"26rpx",color:"#333333"}}>）</Text>

            </View>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"20rpx"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>收款账号：</Text>
              <View style={{margin:"10rpx",display:"flex",border:"2rpx solid #cccccc",height:"60rpx",borderRadius:"6rpx",padding:"0rpx 10rpx 0rpx 10rpx",width:"400rpx",alignItems:"center",justifyContent:"center"}}>
                <Input style={{flex:1,color:"#cc0033",fontSize:"26rpx",color:"#666666"}} type="digit"  placeholder="收款人手机号码..." />

              </View>
            </View>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>转账金额：</Text>
              <View style={{margin:"10rpx",display:"flex",border:"2rpx solid #cccccc",height:"60rpx",borderRadius:"6rpx",padding:"0rpx 10rpx 0rpx 10rpx",width:"400rpx",alignItems:"center",justifyContent:"center"}}>
                <Input style={{flex:1,color:"#cc0033",fontSize:"26rpx",color:"#666666"}} type="digit"  placeholder="请输入转账金额..." />

              </View>
            </View>
          </View>
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column",paddingBottom:"100rpx"}}>
            <View style={{padding:"10rpx 20rpx 10rpx 20rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>安全验证（</Text><Text style={{fontSize:"26rpx",color:"#cc0033"}}>必填</Text><Text style={{fontSize:"26rpx",color:"#333333"}}>）</Text>

            </View>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"20rpx"}}>
                <Text style={{color:"#333333",fontSize:"26rpx"}}>
                  需要对您的手机159***2691进行验证，点击下面获取按钮接收验证码
                </Text>

            </View>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>短信验证：</Text>
              <View style={{margin:"10rpx",display:"flex",border:"2rpx solid #cccccc",height:"60rpx",borderRadius:"6rpx",padding:"0rpx 2rpx 0rpx 10rpx",width:"400rpx",alignItems:"center",justifyContent:"center"}}>
                <Input style={{flex:1,color:"#cc0033",fontSize:"26rpx",color:"#666666"}} type="digit"  placeholder="短信验证码..." />
                <View style={{backgroundColor:"#cc0033",display:"flex",alignItems:"center",justifyContent:"center",height:"56rpx",width:"110rpx",borderRadius:"10rpx"}}>
                  <Text style={{color:"#ffffff",fontSize:"26rpx"}}>获取</Text>
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
export default connect(mapstate)(Transfer)

