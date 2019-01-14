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

class Sendcard extends Component {
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
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"bold"}}>赠出洗车卡</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView >
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"10rpx 20rpx 10rpx 20rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>赠出服务</Text>

            </View>

              <View style={{display:"flex",backgroundImage: `url(${require('../../assets/images/coupon/card.png')})`,backgroundSize:"cover",height:"230rpx",margin:"10rpx",borderRadius:"15rpx"}}>
                <View style={{height:"100%",width:"240rpx",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                  <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                    快洗
                  </Text>
                  <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                    ×1
                  </Text>


                </View>
                <View style={{flex:1,display:"flex"}}>
                  <View style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <Text style={{fontSize:"24rpx",color:"#ffffff"}}>
                      来源：系统赠送
                    </Text>
                    <Text style={{fontSize:"24rpx",color:"#ffffff"}}>
                      适用车辆：湘UL7075
                    </Text>
                    <Text style={{fontSize:"24rpx",color:"#ffffff"}}>
                      适用门店：所有门店
                    </Text>
                    <Text style={{fontSize:"24rpx",color:"#ffffff"}}>
                      有效期至：2019年01月08日
                    </Text>
                  </View>
                </View>

              </View>


          </View>
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column",paddingBottom:"20rpx"}}>
            <View style={{padding:"10rpx 20rpx 10rpx 20rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>赠送用户（</Text><Text style={{fontSize:"26rpx",color:"#cc0033"}}>必填</Text><Text style={{fontSize:"26rpx",color:"#333333"}}>）</Text>

            </View>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"30rpx"}}>
              <Text style={{fontSize:"26rpx",color:"#333333",width:"200rpx",textAlign:"right"}}>接收车牌：</Text>
              <View style={{flex:1}}>
              <View style={{margin:"10rpx",display:"flex",border:"2rpx solid #cccccc",height:"60rpx",borderRadius:"6rpx",padding:"0rpx 2rpx 0rpx 10rpx",width:"400rpx",alignItems:"center",justifyContent:"center"}}>
                <Input style={{flex:1,color:"#cc0033",fontSize:"26rpx",color:"#666666"}} type="digit"  placeholder="请输入收卡人手机号码..." />
              </View>
              </View>
            </View>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"30rpx"}}>
              <Text style={{fontSize:"26rpx",color:"#333333",width:"200rpx",textAlign:"right"}}>数量：</Text>
              <View style={{flex:1}}>
              <View style={{margin:"10rpx",display:"flex",border:"2rpx solid #cccccc",height:"60rpx",borderRadius:"6rpx",width:"260rpx",alignItems:"center",justifyContent:"center"}}>
                <View style={{height:"100%",backgroundColor:"#f0f2f5",width:"80rpx",borderRight:"1rpx solid #cccccc",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Text style={{fontSize:"26rpx"}}>+</Text>
                </View>
                <Input style={{flex:1,color:"#cc0033",fontSize:"26rpx",color:"#666666",textAlign:"center"}} type="digit"/>
                <View style={{height:"100%",backgroundColor:"#f0f2f5",width:"80rpx",borderLeft:"1rpx solid #cccccc",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Text style={{fontSize:"26rpx"}}>-</Text>
                </View>

              </View>
              </View>
            </View>
          </View>
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column",paddingBottom:"50rpx"}}>
            <View style={{padding:"10rpx 20rpx 10rpx 20rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>免费短信通知（</Text><Text style={{fontSize:"26rpx",color:"#333333"}}>选填</Text><Text style={{fontSize:"26rpx",color:"#333333"}}>）</Text>

            </View>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"40rpx"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>手机号码：</Text>
              <View style={{margin:"10rpx",display:"flex",border:"2rpx solid #cccccc",height:"60rpx",borderRadius:"6rpx",padding:"0rpx 2rpx 0rpx 10rpx",width:"450rpx",alignItems:"center",justifyContent:"center"}}>
                <Input style={{flex:1,color:"#cc0033",fontSize:"26rpx",color:"#666666"}} type="digit"  placeholder="请输入收卡人手机号码..." />


              </View>
            </View>
          </View>
        </ScrollView>
          <View style={{position:"fixed",bottom:0,left:0,right:0,height:"90rpx",backgroundColor:"#cc0033",zIndex:99,alignItems:"center",justifyContent:"center",display:"flex"}}>
              <Text style={{fontSize:"26rpx",color:"#ffffff"}}>赠送</Text>
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
export default connect(mapstate)(Sendcard)

