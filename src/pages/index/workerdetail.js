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
import {AtIcon,AtRate,AtTag} from "taro-ui"
class Workerdetail extends Component {
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
      <View style={{backgroundColor:"#f0f2f5",height:"90vh"}}>
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
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"bold"}}>员工详情</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView style={{paddingBottom:"100rpx"}}>


          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"5rpx 10rpx 10rpx 10rpx",border:"solid 2rpx #f0f2f5",display:"flex",justifyContent:"space-between"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>服务技师</Text>
            </View>
            <View style={{display:"flex",height:"100%"}}>
              <View style={{display:"flex",margin:"5rpx",padding:"10rpx",borderBottom:"1px solid #f0f2f5",alignItems:"center"}}>
                <View style={{width:"130rpx",height:"130rpx",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#cccccc",borderRadius:"65rpx"}}>

                </View>
                <View style={{flex:1,height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",marginLeft:"60rpx"}}>
                  <View style={{display:"flex",width:"100%",alignItems:"flex-end"}}>
                    <Text style={{color:"#333333",fontSize:"30rpx"}}>候发亮</Text>
                    <Text style={{color:"#999999",fontSize:"26rpx",marginLeft:"20rpx"}}>美容技师</Text>
                  </View>
                  <View style={{display:"flex",width:"100%",marginTop:"10rpx",alignItems:"center"}}>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>服务评价</Text>
                    <View style={{marginLeft:"10rpx"}}>
                      <AtRate value={2}/>
                    </View>

                  </View>
                  <View style={{display:"flex",width:"100%",marginTop:"10rpx"}}>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>打赏:</Text><Text style={{color:"#cc0033",fontSize:"26rpx"}}>3</Text>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>点赞:</Text><Text style={{color:"#cc0033",fontSize:"26rpx"}}>28</Text>
                  </View>
                </View>



              </View>
              <View style={{display:"flex",alignItems:"center",justifyContent:"center",width:"150rpx",height:"100%",backgroundColor:"#cccccc"}}>
                  <View style={{backgroundColor:"#cc0033",height:"40rpx",width:"60rpx",alignItems:"center",justifyContent:"center"}}>
                      <Text style={{color:"#ffffff",fontSize:"26rpx"}}>打赏</Text>
                  </View>
              </View>


            </View>


          </View>
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"10rpx 10rpx 10rpx 10rpx",border:"solid 2rpx #f0f2f5",display:"flex",justifyContent:"space-between"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>服务技师</Text>

              <AtIcon prefixClass='icon' value='dianzan' size='20' color='#F00'></AtIcon>
            </View>
            <View>
              <View style={{display:"flex",margin:"10rpx",padding:"10rpx",borderBottom:"1px solid #f0f2f5"}}>
                <View style={{width:"100rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#cccccc",borderRadius:"50rpx"}}>

                </View>
                <View style={{flex:1,height:"100rpx",display:"flex",paddingLeft:"30rpx",justifyContent:"center",flexDirection:"column"}}>
                  <View style={{flex:1}}>

                    <Text style={{color:"#333333",fontSize:"26rpx"}}>廖俊坪</Text>
                    <Text style={{color:"#999999",fontSize:"26rpx",marginLeft:"20rpx"}}>美容技师</Text>
                  </View>
                  <Text style={{color:"#999999",fontSize:"26rpx"}}>负责 预冲洗</Text>
                </View>

                <View style={{flex:1,display:"flex",alignItems:"flex-end",justifyContent:"center",flexDirection:"column"}}>
                  <AtIcon prefixClass='icon' value='dianzan' size='20' color='#F00'></AtIcon>

                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx",padding:"10rpx",borderBottom:"1px solid #f0f2f5"}}>
                <View style={{width:"100rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#cccccc",borderRadius:"50rpx"}}>

                </View>
                <View style={{flex:1,height:"100rpx",display:"flex",paddingLeft:"30rpx",justifyContent:"center",flexDirection:"column"}}>
                  <View style={{flex:1}}>

                    <Text style={{color:"#333333",fontSize:"26rpx"}}>廖俊坪</Text>
                    <Text style={{color:"#999999",fontSize:"26rpx",marginLeft:"20rpx"}}>美容技师</Text>
                  </View>
                  <Text style={{color:"#999999",fontSize:"26rpx"}}>负责 预冲洗</Text>
                </View>

                <View style={{flex:1,display:"flex",alignItems:"flex-end",justifyContent:"center",flexDirection:"column"}}>
                  <AtIcon prefixClass='icon' value='dianzan' size='20' color='#F00'></AtIcon>

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
export default connect(mapstate)(Workerdetail)

