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
class Washcard extends Component {
  constructor(props) {

    super(props)
    base(this)
    this.state = {
      list: [],
      total:-1
    }
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
  config = {
    navigationBarTitleText: '我的洗车卡',
    enablePullDownRefresh: true,
  }

  onReachBottom() {
    cacheResults.page++;
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    console.log("u")
  }
  back()
  {
    Taro.navigateBack()
  }

  sendcard(item)
  {
    Taro.navigateTo({url:"/pages/my/sendcard?detail="+JSON.stringify(item)})
  }


  componentWillUnmount() {
  }

  componentDidShow() {

    this.onPullDownRefresh();
  }

  onShareAppMessage(res)
  {
    console.log(res);
    return {
      title: '亨亨快洗',
//这一点很重要哦，小程序只能打开自己的页面，所以需要本地的地址+webViewUrl的地址才行。
      path: "/pages/mine/invite1/invite1?url=" + res.webViewUrl,
      imageUrl: "",
      success: (res) => {
        if (res.data.code == 0) {
          wx.showToast({
            title: '发送邀请好友成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    }
  }
  fetchData() {
    console.log("f")
    if(this.state.total>-1&&this.state.list.length==this.state.total)
    {
      return
    }
    wx.showLoading({title: "加载中",mask:true})
    var databody={
      // openid:this.props.wxuser.wxuser.openid,
      openid:"o1MBZ5JMtqvchLsGg6ViQuB1OvYM",
      page:cacheResults.page,
      cat_id:3
    }
    this.wx_request(set.oto.userbag, databody,"POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((data)=>
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

  componentDidHide() {
  }

  render() {
    let {list,total}=this.state;
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
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"bold"}}>我的洗车卡</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView >
          {list&&list.length>0&&list.map((item,i)=>{
            var bk=`url("http://app.jzdzsw.cn/backend/web/wxbackimage/coupon/j1.png")`;
            item.use_type==1&&(bk=`url("http://app.jzdzsw.cn/backend/web/wxbackimage/coupon/j4.png")`);
            return(<View key={i} style={{display:"flex",position:"relative",backgroundImage: bk,backgroundSize:"cover",height:"230rpx",margin:"15rpx",border:"2rpx solid #cccccc",borderRadius:"15rpx"}}>
              <View style={{height:"100%",width:"200rpx",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                  {item.service.name}
                </Text>
                <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                  ×{item.surplus_num}
                </Text>


              </View>
              <View style={{flex:1,display:"flex"}}>
                <View style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                    来源：{item.source}
                  </Text>
                  <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                    适用车辆：{item.car_plate?item.car_plate:"所有车辆"}
                  </Text>
                  <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                    适用门店：{item.store_name?item.store_name:"所有门店"}
                  </Text>
                  <Text style={{fontSize:"26rpx",color:"#ffffff",fontWeight:"bold"}}>
                    有效期至：{item.end_time}
                  </Text>
                </View>
                {item.use_type==1&&<Button open-type="share" data-id={1} style={{width:"120rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#cc0033"}}>
                    分享
                  </Text>

                </Button>}
                {item.use_type==0&&!item.car_id&&<View onClick={this.sendcard.bind(this,item)} style={{width:"120rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#cc0033"}}>
                    赠送
                  </Text>

                </View>}

                {item.use_type==0&&item.car_id&&<View style={{width:"120rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#999999"}}>
                    赠送
                  </Text>

                </View>}

              </View>
                {item.use_type==1&&<View style={{width:"200rpx",display:"flex",position:"absolute",top:"25%",left:"55%"}}>
                <Image src={require("../../assets/images/coupon/sharecard.png")} style={{flex:1}} mode={"widthFix"}/>
              </View>}

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
export default connect(mapstate)(Washcard)

