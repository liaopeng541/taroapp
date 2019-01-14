import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView, Input} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num,
} from '../../actions/IndexAction'
// import base from "../base"
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"

class Storedetail extends Component {
  constructor(props) {
    // base(this)
    super(props)
    this.state = {
      store: null
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
    /*
    var store=null
    this.props.store.store.map((item,i)=>{
      if(item.id==this.$router.params.id)
      {
        store=item
      }
    })
     if(!store)
     {
       Taro.navigateBack();
     }else{
      this.setState({
        store:store
      })
     }
     *
     */

  }


  back() {
    Taro.navigateBack()
  }

  componentDidHide() {
  }

  render() {
    return (
      <View style={{backgroundColor: "#f0f2f5", height: "100vh"}}>
        <View style={{backgroundColor: "#ffffff"}}>
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
              <Text style={{color: "#ffffff", fontSize: "36rpx", fontWeight: "bold"}}>门店详情</Text>
            </View>
            <View style={{height: "80rpx", width: "70rpx", display: "flex", alignItems: "flex-end"}}>
              {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
            </View>
          </View>
          <ScrollView>
            {/***头部轮播***/}
            <View>
              <Swiper autoplay={true} circular={true} indicatorDots={true}
                      style={{background: "#ffffff", height: "58vw"}}>
                {

                  this.state.store && this.state.store.thumbs.map((item, i) => {
                    return (<SwiperItem key={i}>
                      <Image src={set.upurl + item} style={{width: "100vw"}} mode="widthFix"></Image>
                    </SwiperItem>)
                  })
                }

              </Swiper>
            </View>
            <View style={{padding: "20rpx"}}>
              <View>
                <Text style={{fontSize: "26rpx", color: "#3333333"}}>
                  店铺名称:sldkjflksdfjlk
                </Text>
              </View>
              <View>
                <Text style={{fontSize: "26rpx", color: "#999999"}}>
                  店铺名称:sldkjflksdfjlk
                </Text>
              </View>
              <View>
                <Text style={{fontSize: "26rpx", color: "#999999"}}>
                  店铺名称:sldkjflksdfjlk
                </Text>
              </View>
              <View style={{display:"flex",flexWrap:"wrap",padding:"10rpx"}}>
                <View
                  style={{
                    border: "solid 2rpx #cccccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "5rpx",
                    padding: "5rpx 10rpx 5rpx 10rpx",
                    borderRadius: "5rpx"
                  }}>
                  <Text style={{fontSize: "20rpx", color: "#cc0033"}}>1111</Text>
                </View>
                <View
                  style={{
                    border: "solid 2rpx #cccccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "5rpx",
                    padding: "5rpx 10rpx 5rpx 10rpx",
                    borderRadius: "5rpx"
                  }}>
                  <Text style={{fontSize: "20rpx", color: "#cc0033"}}>1111</Text>
                </View>
              </View>
              <View style={{display: "flex", alignItems: "center", padding: "5rpx 10rpx 5rpx 10rpx"}}>
                <Image src={require("../../assets/images/location.png")} style={{width: "32rpx", height: "32rpx"}}/>
                <Text style={{color: "#999999", fontSize: "26rpx"}}>2222</Text>
              </View>
            </View>
            <View style={{height:"500rpx",width:"100%"}}>

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
    pushdata: state.pushdata,
    store: state.store
  }
}
export default connect(mapstate)(Storedetail)

