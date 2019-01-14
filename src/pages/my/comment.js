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
import {AtIcon,AtRate,AtTag,AtInput} from "taro-ui"

class Comment extends Component {
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
  back()
  {
    Taro.navigateBack()
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
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"bold"}}>订单评价</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView style={{paddingBottom:"100rpx"}}>


          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"5rpx 10rpx 10rpx 10rpx",border:"solid 2rpx #f0f2f5",display:"flex",justifyContent:"space-between"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>服务项目</Text>
              <Text style={{fontSize:"26rpx",color:"#999999"}}>车辆:湘UL7075</Text>
            </View>
            <View>
              <View style={{display:"flex",margin:"5rpx",padding:"10rpx",borderBottom:"1px solid #f0f2f5",alignItems:"center"}}>
                <View style={{width:"130rpx",height:"130rpx",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#cccccc"}}>

                </View>
                <View style={{flex:1,height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",marginLeft:"60rpx"}}>
                  <View style={{display:"flex",width:"100%"}}>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>项目类型:</Text>
                    <Text style={{color:"#333333",fontSize:"26rpx",marginLeft:"20rpx"}}>洗车项目</Text>
                  </View>
                  <View style={{display:"flex",width:"100%",marginTop:"10rpx"}}>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>服务时间:</Text>
                    <Text style={{color:"#333333",fontSize:"26rpx",marginLeft:"20rpx"}}>2018年12月31日 14:06</Text>
                  </View>
                  <View style={{display:"flex",width:"100%",marginTop:"10rpx"}}>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>项目类型:</Text>
                    <Text style={{color:"#333333",fontSize:"26rpx",marginLeft:"20rpx"}}>民营小区中石化店</Text>
                  </View>
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
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"0rpx 10rpx 5rpx 10rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>服务评价</Text>

            </View>
            <View style={{padding:"10rpx"}}>
              <View style={{display:"flex",alignItems:"center",margin:"10rpx"}}>
                <Text style={{fontSize:"26rpx",marginRight:"20rpx",color:"#333333"}}>服务评分:</Text><AtRate value={2} /> <Text style={{fontSize:"26rpx",marginLeft:"20rpx",color:"#333333"}}>很差</Text>
              </View>
              <View style={{display:"flex",margin:"20rpx",flexWrap:"wrap"}}>
                <View style={{margin:"10rpx"}}>
                  <AtTag
                    name='tag-1'
                    type='primary'
                    circle
                  >
                    服务好
                  </AtTag>
                </View>

                <View style={{margin:"10rpx"}}>
                  <AtTag
                    name='tag-1'
                    type='primary'
                    circle
                  >
                    服务好
                  </AtTag>
                </View>
                <View style={{margin:"10rpx"}}>
                  <AtTag
                    name='tag-1'
                    type='primary'
                    circle
                  >
                    服务好
                  </AtTag>
                </View>
                <View style={{margin:"10rpx"}}>
                  <AtTag
                    name='tag-1'
                    type='primary'
                    circle
                  >
                    服务好
                  </AtTag>
                </View>
              </View>
              <View style={{display:"flex",width:"100%",height:"300rpx",backgroundColor:"#efefef"}}>
                <Input
                  type='text'
                  placeholder='我们的服务还满意吗？'
                  style={{flex:1,margin:"20rpx",fontSize:"26rpx",color:"#333333"}}
                />


              </View>
              <View style={{display:"flex",flexWrap:"wrap",paddingTop:"10rpx"}}>
                <View style={{width:"180rpx",height:"220rpx",margin:"10rpx",backgroundColor:"#cccccc",borderRadius:"10rpx"}}>

                </View>
              </View>

            </View>


          </View>
        </ScrollView>
          <View style={{position:"fixed",bottom:0,left:0,right:0,height:"90rpx",backgroundColor:"#cc0033",zIndex:99,alignItems:"center",justifyContent:"center",display:"flex"}}>
            <Text style={{fontSize:"26rpx",color:"#ffffff"}}>提交评价</Text>
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
export default connect(mapstate)(Comment)

