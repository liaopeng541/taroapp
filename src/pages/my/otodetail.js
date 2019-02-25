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

class Otodetail extends Component {
  constructor(props) {

    super(props)
    base(this)
    this.state = {
      order: null,
      service:null,
      worker:null
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
    this.fetchData();

  }

  fetchData() {
    wx.showLoading({title: "加载中",mask:true})
    var databody={
      // openid:this.props.wxuser.wxuser.openid,
      openid:"o1MBZ5JMtqvchLsGg6ViQuB1OvYM",
      order_id:41985
    }
    this.wx_request(set.oto.getotoorderdetail, databody,"POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((data)=>
    {

      this.setState(data.data.data)


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
  back()
  {
    Taro.navigateBack()
  }
  componentDidHide() {
  }

  render() {
    const {service,worker}=this.state
    return (
      <View style={{backgroundColor:"#f0f2f5",height:"100vh",paddingTop:"105rpx"}}>
        <View style={{backgroundColor:"#ffffff"}}>
        <View style={{
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
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>{(this.state.order&&this.state.order.add_time)?this.state.order.add_time:""}</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>车辆信息</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>{(this.state.order&&this.state.order.car_plate)?this.state.order.car_plate:""}</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>服务门店</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>{(this.state.order&&this.state.order.store_name)?this.state.order.store_name:""}</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>订单金额</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>{(this.state.order&&this.state.order.total)?"￥"+this.state.order.total:""}</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>应付金额</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>{(this.state.order&&this.state.order.show_total)?"￥"+this.state.order.show_total:""}</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>订单状态</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>{(this.state.order&&this.state.order.status_title)?this.state.order.status_title:""}</Text>
                </View>
              </View>
              <View style={{display:"flex",margin:"10rpx 20rpx 10rpx 20rpx",borderBottom:"1rpx dashed #f0f2f5"}}>
                <View style={{width:"240rpx",paddingLeft:"10rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>付款方式</Text>
                </View>
                <View style={{flex:1,paddingRight:"10rpx",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333",textAlign:"right"}}>{(this.state.order&&this.state.order.level_total)?"会员优惠"+this.state.order.level_total:""}
                    {(this.state.order&&this.state.order.card_total)?" 卡劵抵扣"+this.state.order.card_total:""}</Text>
                </View>
              </View>


            </View>


          </View>
          {service&&service.length>0&&<View
            style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"0rpx 10rpx 5rpx 10rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>服务项目</Text>

            </View>
            {service.map((item,i)=>{

              return(<View key={i}>
                <View style={{display:"flex",margin:"10rpx",padding:"10rpx",borderBottom:"1px solid #f0f2f5"}}>
                  <View style={{width:"100rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",border:"solid 1rpx #f0f2f5"}}>
                    <Image src={set.server_up+item.service.thumb} style={{width:"100rpx",height:"100rpx"}} mode="widthFix"/>

                  </View>
                  <View style={{width:"180rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                    <Text style={{color:"#333333",fontSize:"26rpx"}}>{item.service.name}</Text>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>￥{item.price}</Text>
                  </View>
                  <View style={{width:"180rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                    <Text style={{color:"#cc0033",fontSize:"26rpx"}}>{item.status_title}</Text>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>×{item.num}</Text>
                  </View>
                  <View style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>预计:{item.has_time}分钟</Text>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>合计:￥{item.p_total}</Text>
                  </View>
                </View>

              </View>)
            })}


          </View>}
          {worker&&worker.length>0&&<View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"0rpx 10rpx 5rpx 10rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>相关人员</Text>

            </View>
            <View>
              {worker.map((item,i)=>{
                return(<View key={i} style={{display:"flex",margin:"10rpx",padding:"10rpx",borderBottom:"1px solid #f0f2f5"}}>
                  <View style={{width:"100rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",border:"solid 1rpx #f0f2f5"}}>
                    <Image src={set.server_up+item.worker.header_pic} style={{width:"100rpx",height:"100rpx"}} mode="widthFix"/>

                  </View>
                  <View style={{flex:1,display:"flex",paddingLeft:"30rpx",justifyContent:"center",flexDirection:"column"}}>
                    <Text style={{color:"#333333",fontSize:"26rpx"}}>{item.worker.real_name}</Text>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>负责{item.process}</Text>
                  </View>

                  <View style={{width:"200rpx",height:"100rpx",display:"flex",alignItems:"flex-end",justifyContent:"center",flexDirection:"column"}}>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>{item.worker.job_name}</Text>

                  </View>
                </View>)

              })}

            </View>


          </View>}
          {this.state.order&&this.state.order.photo&&<View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"0rpx 10rpx 5rpx 10rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>施工图片</Text>

            </View>
            <View>
              <View style={{margin:"20rpx",height:"150rpx",width:"150rpx",display:"flex",alignItems:"center",justifyContent:"center",border:"solid 1rpx #f0f2f5"}}>
                <Image src={set.server_up+this.state.order.photo} style={{width:"150rpx",height:"150rpx"}} mode="widthFix"/>
              </View>
            </View>


          </View>}
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

