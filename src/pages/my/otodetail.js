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

class Otodetail extends Component {
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
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"bold"}}>消费详情</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView style={{paddingBottom:"100rpx"}}>
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"0rpx 10rpx 5rpx 10rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>订单信息</Text>

            </View>
            <View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>开单时间</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>2018-12-31 14:06:10</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>车辆信息</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>湘UL7075 哈弗H6</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>服务门店</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>民营小区中石化店</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>订单金额</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>￥12.00</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>应付金额</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>￥11.00</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>订单状态</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>己完成</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>付款方式</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>会员优惠1.00 卡劵抵扣11.00</Text>
                </View>
              </View>


            </View>


          </View>
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"0rpx 10rpx 5rpx 10rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>服务项目</Text>

            </View>
            <View>
              <View style={{display:"flex",margin:"10rpx",padding:"10rpx",borderBottom:"1px solid #f0f2f5"}}>
                <View style={{width:"100rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#cccccc"}}>

                </View>
                <View style={{width:"180rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                  <Text style={{color:"#333333",fontSize:"26rpx"}}>快洗</Text>
                  <Text style={{color:"#999999",fontSize:"26rpx"}}>￥12.00</Text>
                </View>
                <View style={{width:"180rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                  <Text style={{color:"#cc0033",fontSize:"26rpx"}}>己完成</Text>
                  <Text style={{color:"#999999",fontSize:"26rpx"}}>×1</Text>
                </View>
                <View style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                  <Text style={{color:"#999999",fontSize:"26rpx"}}>预计:3分钟</Text>
                  <Text style={{color:"#999999",fontSize:"26rpx"}}>合计:￥12.00</Text>
                </View>
              </View>

            </View>


          </View>
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"0rpx 10rpx 5rpx 10rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>相关人员</Text>

            </View>
            <View>
              <View style={{display:"flex",margin:"10rpx",padding:"10rpx",borderBottom:"1px solid #f0f2f5"}}>
                <View style={{width:"100rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#cccccc"}}>

                </View>
                <View style={{width:"180rpx",height:"100rpx",display:"flex",paddingLeft:"30rpx",justifyContent:"center",flexDirection:"column"}}>
                  <Text style={{color:"#333333",fontSize:"26rpx"}}>廖俊坪</Text>
                  <Text style={{color:"#999999",fontSize:"26rpx"}}>负责预冲洗</Text>
                </View>

                <View style={{flex:1,display:"flex",alignItems:"flex-end",justifyContent:"center",flexDirection:"column"}}>
                  <Text style={{color:"#999999",fontSize:"26rpx"}}>美容技师</Text>

                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx",padding:"10rpx",borderBottom:"1px solid #f0f2f5"}}>
                <View style={{width:"100rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#cccccc"}}>

                </View>
                <View style={{width:"180rpx",height:"100rpx",display:"flex",paddingLeft:"30rpx",justifyContent:"center",flexDirection:"column"}}>
                  <Text style={{color:"#333333",fontSize:"26rpx"}}>廖俊坪</Text>
                  <Text style={{color:"#999999",fontSize:"26rpx"}}>负责预冲洗</Text>
                </View>

                <View style={{flex:1,display:"flex",alignItems:"flex-end",justifyContent:"center",flexDirection:"column"}}>
                  <Text style={{color:"#999999",fontSize:"26rpx"}}>美容技师</Text>

                </View>
              </View>

            </View>


          </View>
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"0rpx 10rpx 5rpx 10rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>施工图片</Text>

            </View>
            <View>
              <View style={{backgroundColor:"#cccccc",margin:"20rpx",height:"150rpx",width:"150rpx"}}>
              </View>
            </View>


          </View>
        </ScrollView>
          <View style={{position:"fixed",bottom:0,left:0,right:0,height:"90rpx",backgroundColor:"#cc0033",zIndex:99,alignItems:"center",justifyContent:"center",display:"flex"}}>
            <Text style={{fontSize:"26rpx",color:"#ffffff"}}>立即评价</Text>
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
export default connect(mapstate)(Otodetail)

