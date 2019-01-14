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

class Otoorder extends Component {
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
  back()
  {
    Taro.navigateBack()
  }
  componentDidHide() {
  }

  render() {
    return (
      <View style={{backgroundColor:"#f0f2f5",height:"100vh"}}>
        <View style={{backgroundColor:"#ffffff"}}>
        <View
          style={{
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
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"bold"}}>我的消费</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView >
          <View style={{borderBottom:"10rpx solid #f0f2f5"}}>
            <View style={{borderBottom:"1rpx solid #f0f2f5",padding:"15rpx",display:"flex"}}>
              <Text style={{flex:1,color:"#999999",fontSize:"26rpx"}}>
                订单号:201812311406108745
              </Text>
              <Text style={{width:"100rpx",color:"#cc0033",fontSize:"26rpx",textAlign:"right"}}>
                己完成
              </Text>

            </View>
            <View style={{borderBottom:"1rpx solid #f0f2f5",padding:"15rpx",display:"flex"}}>
              <View style={{width:"180rpx",height:"180rpx",backgroundColor:"#eeeeee"}}>

              </View>
              <View style={{flex:1,display:"flex",justifyContent:"center",flexDirection:"column",paddingLeft:"20rpx"}}>
                <Text style={{fontSize:"26rpx",color:"#333333"}}>湘UL7075在民营小区中石化店下单洗车项目</Text>
                <Text style={{fontSize:"26rpx",color:"#999999",marginTop:"5rpx"}}>含服务:1</Text>
                <Text style={{fontSize:"26rpx",color:"#999999",marginTop:"5rpx"}}>下单时间:2018-12-31 14:16</Text>
              </View>
              <View style={{display:"flex",alignItems:"center",justifyContent:"center",width:"150rpx",flexDirection:"column"}}>
                <Text style={{fontSize:"30rpx",textDecoration:"line-through",color:"#666666"}}>￥12.00</Text>
                <Text style={{fontSize:"30rpx",color:"#cc0033"}}>￥11.00</Text>
              </View>


            </View>
            <View style={{padding:"15rpx",display:"flex",justifyContent:"flex-end"}}>
              <View style={{width:"180rpx",display:"flex",alignItems:"center",justifyContent:"center",height:"60rpx",backgroundColor:"#cc0033",borderRadius:"5rpx"}}>
                  <Text style={{fontSize:"26rpx",color:"#ffffff"}}>立即评价</Text>
              </View>

            </View>
          </View>
          <View style={{borderBottom:"10rpx solid #f0f2f5"}}>
            <View style={{borderBottom:"1rpx solid #f0f2f5",padding:"15rpx",display:"flex"}}>
              <Text style={{flex:1,color:"#999999",fontSize:"26rpx"}}>
                订单号:201812311406108745
              </Text>
              <Text style={{width:"100rpx",color:"#cc0033",fontSize:"26rpx",textAlign:"right"}}>
                己完成
              </Text>

            </View>
            <View style={{borderBottom:"1rpx solid #f0f2f5",padding:"15rpx",display:"flex"}}>
              <View style={{width:"180rpx",height:"180rpx",backgroundColor:"#eeeeee"}}>

              </View>
              <View style={{flex:1,display:"flex",justifyContent:"center",flexDirection:"column",paddingLeft:"20rpx"}}>
                <Text style={{fontSize:"26rpx",color:"#333333"}}>湘UL7075在民营小区中石化店下单洗车项目</Text>
                <Text style={{fontSize:"26rpx",color:"#999999",marginTop:"5rpx"}}>含服务:1</Text>
                <Text style={{fontSize:"26rpx",color:"#999999",marginTop:"5rpx"}}>下单时间:2018-12-31 14:16</Text>
              </View>
              <View style={{display:"flex",alignItems:"center",justifyContent:"center",width:"150rpx",flexDirection:"column"}}>
                <Text style={{fontSize:"30rpx",textDecoration:"line-through",color:"#666666"}}>￥12.00</Text>
                <Text style={{fontSize:"30rpx",color:"#cc0033"}}>￥11.00</Text>
              </View>


            </View>
            <View style={{padding:"15rpx",display:"flex",justifyContent:"flex-end"}}>
              <View style={{width:"180rpx",display:"flex",alignItems:"center",justifyContent:"center",height:"60rpx",backgroundColor:"#cc0033",borderRadius:"5rpx"}}>
                <Text style={{fontSize:"26rpx",color:"#ffffff"}}>立即评价</Text>
              </View>

            </View>
          </View>
          <View style={{borderBottom:"10rpx solid #f0f2f5"}}>
            <View style={{borderBottom:"1rpx solid #f0f2f5",padding:"15rpx",display:"flex"}}>
              <Text style={{flex:1,color:"#999999",fontSize:"26rpx"}}>
                订单号:201812311406108745
              </Text>
              <Text style={{width:"100rpx",color:"#cc0033",fontSize:"26rpx",textAlign:"right"}}>
                己完成
              </Text>

            </View>
            <View style={{borderBottom:"1rpx solid #f0f2f5",padding:"15rpx",display:"flex"}}>
              <View style={{width:"180rpx",height:"180rpx",backgroundColor:"#eeeeee"}}>

              </View>
              <View style={{flex:1,display:"flex",justifyContent:"center",flexDirection:"column",paddingLeft:"20rpx"}}>
                <Text style={{fontSize:"26rpx",color:"#333333"}}>湘UL7075在民营小区中石化店下单洗车项目</Text>
                <Text style={{fontSize:"26rpx",color:"#999999",marginTop:"5rpx"}}>含服务:1</Text>
                <Text style={{fontSize:"26rpx",color:"#999999",marginTop:"5rpx"}}>下单时间:2018-12-31 14:16</Text>
              </View>
              <View style={{display:"flex",alignItems:"center",justifyContent:"center",width:"150rpx",flexDirection:"column"}}>
                <Text style={{fontSize:"30rpx",textDecoration:"line-through",color:"#666666"}}>￥12.00</Text>
                <Text style={{fontSize:"30rpx",color:"#cc0033"}}>￥11.00</Text>
              </View>


            </View>
            <View style={{padding:"15rpx",display:"flex",justifyContent:"flex-end"}}>
              <View style={{width:"180rpx",display:"flex",alignItems:"center",justifyContent:"center",height:"60rpx",backgroundColor:"#cc0033",borderRadius:"5rpx"}}>
                <Text style={{fontSize:"26rpx",color:"#ffffff"}}>立即评价</Text>
              </View>

            </View>
          </View>
          <View style={{borderBottom:"10rpx solid #f0f2f5"}}>
            <View style={{borderBottom:"1rpx solid #f0f2f5",padding:"15rpx",display:"flex"}}>
              <Text style={{flex:1,color:"#999999",fontSize:"26rpx"}}>
                订单号:201812311406108745
              </Text>
              <Text style={{width:"100rpx",color:"#cc0033",fontSize:"26rpx",textAlign:"right"}}>
                己完成
              </Text>

            </View>
            <View style={{borderBottom:"1rpx solid #f0f2f5",padding:"15rpx",display:"flex"}}>
              <View style={{width:"180rpx",height:"180rpx",backgroundColor:"#eeeeee"}}>

              </View>
              <View style={{flex:1,display:"flex",justifyContent:"center",flexDirection:"column",paddingLeft:"20rpx"}}>
                <Text style={{fontSize:"26rpx",color:"#333333"}}>湘UL7075在民营小区中石化店下单洗车项目</Text>
                <Text style={{fontSize:"26rpx",color:"#999999",marginTop:"5rpx"}}>含服务:1</Text>
                <Text style={{fontSize:"26rpx",color:"#999999",marginTop:"5rpx"}}>下单时间:2018-12-31 14:16</Text>
              </View>
              <View style={{display:"flex",alignItems:"center",justifyContent:"center",width:"150rpx",flexDirection:"column"}}>
                <Text style={{fontSize:"30rpx",textDecoration:"line-through",color:"#666666"}}>￥12.00</Text>
                <Text style={{fontSize:"30rpx",color:"#cc0033"}}>￥11.00</Text>
              </View>


            </View>
            <View style={{padding:"15rpx",display:"flex",justifyContent:"flex-end"}}>
              <View style={{width:"180rpx",display:"flex",alignItems:"center",justifyContent:"center",height:"60rpx",backgroundColor:"#cc0033",borderRadius:"5rpx"}}>
                <Text style={{fontSize:"26rpx",color:"#ffffff"}}>立即评价</Text>
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
export default connect(mapstate)(Otoorder)

