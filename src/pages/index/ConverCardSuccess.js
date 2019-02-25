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
import {AtIcon} from "taro-ui"
class ConverCardSuccess extends Component {
  constructor(props) {
    // base(this)
    super(props)
    this.state = {
      sild: []
    }
  }

  config = {
    navigationBarTitleText: '实卡兑换',
    // enablePullDownRefresh: true,
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


  }

  componentDidHide() {
  }

  render() {
    return (
      <View style={{backgroundColor: "#f0f2f5", minHeight: "100vh",paddingTop:"105rpx"}}>
        <View>
          <View style={{
            backgroundColor: "#cc0033",
            height: "105rpx",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingBottom: "10rpx",
            position: "fixed",
            top: "0rpx",
            left: "0rpx",
            right: "0rpx",
            zIndex: 99,

          }}>
            <View style={{
              height: "80rpx",
              width: "70rpx",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center"
            }}>
              {/*<AtIcon prefixClass='icon' value='left' size='40' color='#ffffff'></AtIcon>*/}
            </View>
            <View style={{flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
              <Text style={{color: "#ffffff", fontSize: "36rpx", fontWeight: "bold"}}>实卡兑换</Text>
            </View>
            <View style={{height: "80rpx", width: "70rpx", display: "flex", alignItems: "flex-end"}}>
            </View>
          </View>
          <ScrollView>
            <View style={{alignItems:"center",marginTop:"80rpx",justifyContent:"center",display:"flex",flexDirection:"column"}}>
              <AtIcon prefixClass='icon' value='chenggongtishi' size='80' color='#24b166'></AtIcon>
              <Text style={{color:"#666666",fontSize:"30rpx",fontWeight:"bold",marginTop:"30rpx"}}>
                兑换成功
              </Text>



                  <View  style={{margin:"40rpx",borderRadius:"10rpx",backgroundColor:"#cc0033", width:"180rpx",display:"flex",alignItems:"center",justifyContent:"center",height:"70rpx"}}>
                    <Text style={{color:"#ffffff",fontSize:"26rpx"}}>返回首页</Text></View>


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
export default connect(mapstate)(ConverCardSuccess)

