import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView,Input} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num,
} from '../../actions/IndexAction'
import base from "../base"
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"
let cacheResults = {
  page: 0,
  total: 0,
  items: []
}
class Otoorder extends Component {
  constructor(props) {

    super(props)
    base(this)
    this.state = {
      list: [],
      total:-1
    }
  }

  config = {
    navigationBarTitleText: '我的消费',
    enablePullDownRefresh: true,
  }



  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  onPullDownRefresh() {

     cacheResults = {
      page: 0,
      total: 0,
      items: []
    }
    this.setState({
      list:[],
      total:-1,
    },this.fetchData)
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    this.fetchData();

  }

  fetchData() {
    if(this.state.total>-1&&this.state.list.length==this.state.total)
    {
      return
    }
    wx.showLoading({title: "加载中",mask:true})
    var databody={
      // openid:this.props.wxuser.wxuser.openid,
      openid:"o1MBZ5JMtqvchLsGg6ViQuB1OvYM",
      page:cacheResults.page
    }
    this.wx_request(set.oto.otoorderlist, databody,"POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((data)=>
    {
      console.log(data.data.data)
      cacheResults.items=cacheResults.items.concat(data.data.data.list);
      cacheResults.total=data.data.data.total;
      console.log(cacheResults)
      this.setState({
        list:cacheResults.items,
        total:cacheResults.total
      })



      wx.stopPullDownRefresh();
      wx.hideLoading();

    }).catch((err)=>{
      wx.hideLoading();
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '网络访问失败，请重试',
        icon: 'none',
        duration: 1800
      })
    })

  }
  todetail(item)
  {
    Taro.navigateTo({url:"/pages/my/otodetail?id="+item.id})
  }
  tocomment(item)
  {
    Taro.navigateTo({url:"/pages/my/comment?order="+JSON.stringify(item)})
  }
  back()
  {
    Taro.navigateBack()
  }
  componentDidHide() {
  }
  onReachBottom() {
    cacheResults.page++;
    this.fetchData();
  }
  render() {
    let {list,total}=this.state;
    return (
      <View style={{backgroundColor:"#f0f2f5",height:"100vh",paddingTop:"105rpx"}}>
        <View style={{backgroundColor:"#ffffff"}}>
        <View
          style={{
          backgroundColor: "#cc0033",
          height: "105rpx",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingBottom: "10rpx",
          position:"fixed",
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
        <ScrollView>
          {list&&list.length>0&&list.map((item,i)=>{
            return(<View  key={i} style={{borderBottom:"10rpx solid #f0f2f5"}}>
              <View style={{borderBottom:"1rpx solid #f0f2f5",padding:"15rpx",display:"flex"}}>
                <Text style={{flex:1,color:"#999999",fontSize:"26rpx"}}>
                  订单号:{item.sn}
                </Text>
                <Text style={{width:"100rpx",color:"#cc0033",fontSize:"26rpx",textAlign:"right"}}>
                  {item.status_title}
                </Text>

              </View>
              <View onClick={this.todetail.bind(this,item)} style={{borderBottom:"1rpx solid #f0f2f5",padding:"15rpx",display:"flex"}}>
                <View style={{width:"180rpx",height:"180rpx"}}>
                  <Image src={set.server_up+item.photo} style={{width:"180rpx",height:"180rpx"}}/>

                </View>
                <View style={{flex:1,display:"flex",justifyContent:"center",flexDirection:"column",paddingLeft:"20rpx"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>{item.plate}在{item.store_name}下单{item.order_type_title}</Text>
                  <Text style={{fontSize:"26rpx",color:"#999999",marginTop:"5rpx"}}>含服务:{item.service_num}</Text>
                  <Text style={{fontSize:"26rpx",color:"#999999",marginTop:"5rpx"}}>下单时间:{item.add_time}</Text>
                </View>
                {item.show_total!=item.total?<View style={{display:"flex",alignItems:"center",justifyContent:"center",width:"150rpx",flexDirection:"column"}}>
                  <Text style={{fontSize:"30rpx",textDecoration:"line-through",color:"#666666"}}>￥{item.total}</Text>
                  <Text style={{fontSize:"30rpx",color:"#cc0033"}}>￥{item.show_total}</Text>
                </View>:
                <View style={{display:"flex",alignItems:"center",justifyContent:"center",width:"150rpx",flexDirection:"column"}}>
                  <Text style={{fontSize:"30rpx",color:"#666666"}}>￥{item.total}</Text>
                </View>}
              </View>
              <View style={{padding:"15rpx",display:"flex",justifyContent:"flex-end"}}>
                {item.pay_status==0&&<View style={{width:"180rpx",display:"flex",alignItems:"center",justifyContent:"center",height:"60rpx",backgroundColor:"#cc0033",borderRadius:"5rpx"}}>
                  <Text style={{fontSize:"26rpx",color:"#ffffff"}}>立即付款</Text>
                </View>}
                {item.pay_status==1&&item.status<3&&<View onClick={this.tocomment.bind(this,item)} style={{width:"180rpx",display:"flex",alignItems:"center",justifyContent:"center",height:"60rpx",backgroundColor:"#cc0033",borderRadius:"5rpx",marginLeft:"10rpx"}}>
                  <Text style={{fontSize:"26rpx",color:"#ffffff"}}>立即评价</Text>
                </View>}
              </View>
            </View>)
          })}
          {total>-1&&list.length==total&&<View style={{height:"60rpx",width:"100%",alignItems:"center",justifyContent:"center",display:"flex"}}>
            <Text style={{color:"#999999",fontSize:"26rpx"}}>
              没有更多了
            </Text>

          </View>}










          




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

