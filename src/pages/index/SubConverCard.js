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

class SubConverCard extends Component {
  constructor(props) {
    // base(this)
    super(props)
    this.state = {
      detail:null
    }
  }

  config = {
    navigationBarTitleText: '实卡兑换',
    // enablePullDownRefresh: true,
  }

  onReachBottom() {
    console.log("bbbbb");
  }
  back()
  {
    Taro.navigateBack()
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
    this.setState({
      detail:JSON.parse(this.$router.params.card)
    })
    console.log(JSON.parse(this.$router.params.card))
  }

  fetchData() {


  }
  buycard()
  {

  }
  componentDidHide() {
  }

  render() {
    return (
      <View style={{backgroundColor: "#f0f2f5", minHeight: "100vh"}}>
        <View>
          <View style={{
            backgroundColor: "#cc0033",
            height: "105rpx",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingBottom: "10rpx",
            position: "relative",
            top: "0rpx",
            left: "0rpx",
            right: "0rpx",
            zIndex: 99
          }}>
            <View onClick={this.back.bind(this)} style={{
              height: "80rpx",
              width: "70rpx",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center"
            }}>
              <Image src={require("../../assets/images/left.png")} style={{width: "50rpx", height: "50rpx"}}/>
            </View>
            <View style={{flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
              <Text style={{color: "#ffffff", fontSize: "36rpx", fontWeight: "boldß"}}>实卡兑换</Text>
            </View>
            <View style={{height: "80rpx", width: "70rpx", display: "flex", alignItems: "flex-end"}}>
              {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
            </View>
          </View>
          <ScrollView>
            <View
              style={{
                border: "1rpx solid #f0f2f5",
                height: "70rpx",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:"#ffffff"
              }}>
              <View style={{display: "flex", alignItems: "center", justifyContent: "center", width: "150rpx"}}>
                <Text style={{fontSize: "26rpx", color: "#333333"}}>实卡信息</Text>
              </View>

              <View style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 1,
                paddingRight: "20rpx"
              }}>

              </View>
            </View>

            <View style={{
              border: "1rpx solid #f0f2f5",
              height: "70rpx",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:"#ffffff"
            }}>
              <View style={{display: "flex", alignItems: "center", justifyContent: "center", width: "150rpx"}}>
                <Text style={{fontSize: "26rpx", color: "#999999"}}>兑换码</Text>
              </View>

              <View style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 1,
                paddingRight: "20rpx"
              }}>
                <Text style={{fontSize: "26rpx", color: "#999999"}}>{this.state.detail&&this.state.detail.hashcode}</Text>
              </View>
            </View>
            <View
              style={{
                border: "1rpx solid #f0f2f5",
                height: "70rpx",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:"#ffffff"
              }}>
              <View style={{display: "flex", alignItems: "center", justifyContent: "center", width: "150rpx"}}>
                <Text style={{fontSize: "26rpx", color: "#999999"}}>卡片名称</Text>
              </View>

              <View style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 1,
                paddingRight: "20rpx"
              }}>
                <Text style={{fontSize: "26rpx", color: "#999999"}}>{this.state.detail&&this.state.detail.batch_name}</Text>
              </View>
            </View>
            <View style={{
              border: "1rpx solid #f0f2f5",
              height: "70rpx",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:"#ffffff"
            }}>
              <View style={{display: "flex", alignItems: "center", justifyContent: "center", width: "150rpx"}}>
                <Text style={{fontSize: "26rpx", color: "#999999"}}>实卡价值</Text>
              </View>

              <View style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 1,
                paddingRight: "20rpx"
              }}>
                <Text style={{fontSize: "26rpx", color: "#999999"}}>￥{this.state.detail&&this.state.detail.batch.total}</Text>
              </View>
            </View>



          </ScrollView>
        </View>
        <View style={{position:"fixed",bottom:0,left:0,right:0,height:"90rpx",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <View onClick={this.back.bind(this)} style={{backgroundColor:"#cc0033",zIndex:99,alignItems:"center",justifyContent:"center",display:"flex",flex:1,height:"90rpx",borderRight:"1rpx solid #cccccc"}}>
          <Text style={{fontSize:"26rpx",color:"#ffffff"}}>上一步</Text>
        </View>
          <View onClick={this.buycard.bind(this)} style={{backgroundColor:"#cc0033",zIndex:99,alignItems:"center",justifyContent:"center",display:"flex",flex:1,height:"90rpx"}}>
            <Text style={{fontSize:"26rpx",color:"#ffffff"}}>兑 换</Text>
          </View>
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
export default connect(mapstate)(SubConverCard)

