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
      moneylist: [
        {money: 99, checked: false},
        {money: 299, checked: false},
        {money: 599, checked: false},
        {money: 999, checked: false},
        {money: 1999, checked: false},
        {money: 2999, checked: false},

      ],
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
              {this.state.moneylist&&this.state.moneylist.map((item,i)=>{
                return(<View key={i} style={{ border: "2rpx solid #dad2b2",height:"80rpx",width:"190rpx",borderRadius:"10rpx",display:"flex",alignItems:"center",justifyContent:"center",margin:"20rpx"}}>
                  <Text style={{color:"#cc0033",fontSize:"30rpx"}}>{item.money}元</Text>
                </View>)
              })}
            </View>
          </View>

          <View style={{padding:"20rpx",borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{borderBottom:"2rpx solid #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>充值说明</Text>
            </View>
            {this.props.vip.viplist&&this.props.vip.viplist.map((item,i)=>{
              return(item.list_show==1&&<View key={i} style={{padding:"20rpx"}}>
                <View style={{borderBottom:"1px solid #f0f2f5",display:"flex",padding:"10rpx"}}>
                  <View style={{width:"150rpx"}}>
                    <Image src={set.upurl+item.thumb} style={{width:"150rpx"}} mode="widthFix"/>

                  </View>
                  <View style={{flex:1,display:"flex",alignItems:"center",paddingLeft:"20rpx"}}>
                    <Text style={{color:"#333333",fontSize:"26rpx"}}>
                      {item.level_desc}
                    </Text>

                  </View>

                </View>
              </View>)
            })}




          </View>
          




        </ScrollView>
        </View>
        <View style={{position:"fixed",bottom:0,left:0,right:0,height:"90rpx",backgroundColor:"#cc0033",zIndex:99,alignItems:"center",justifyContent:"center",display:"flex"}}>
          <Text style={{fontSize:"26rpx",color:"#ffffff"}}>立即充值</Text>
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

