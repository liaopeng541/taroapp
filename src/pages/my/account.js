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
import base from "../base";
import {AtIcon} from "taro-ui"
let cacheResults = {
  page: 0,
  total: 0,
  items: []
}
class Account extends Component {
  constructor(props) {
    super(props)
    base(this)
    this.state = {
      list: [],
      total:-1
    }
  }

  config = {
    navigationBarTitleText: '消费记录',
    enablePullDownRefresh: true,
  }

  onReachBottom() {
    cacheResults.page++;
    this.fetchData();
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
    this.onPullDownRefresh()

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
    this.wx_request(set.account, databody,"POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((data)=>
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
  back()
  {
    Taro.navigateBack()
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
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"bold"}}>消费记录</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView >
          {list&&list.length>0&&list.map((item,i)=>{
            let iconbg="#08c581";
            let iconimg="3"
            switch (parseInt(item.order_type)){
              case 0:iconbg="#a389ec";iconimg="goumaiyemiande-xiaogouwuche";break;
              case 2:iconbg="#f893bf";iconimg="3";break;
              case 3:iconbg="#08c581";iconimg="zhuanzhang";break;
              case 4:iconbg="#6890ff";iconimg="shoudaode";break;

            }
            return(<View key={i} style={{display:"flex"}}>
              <View style={{height:"150rpx",width:"150rpx",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <View style={{display:"flex",alignItems:"center",justifyContent:"center",height:"90rpx",width:"90rpx",borderRadius:"45rpx",backgroundColor:iconbg}}>

                  <AtIcon prefixClass='icon' value={iconimg} size='26' color='#ffffff'></AtIcon>
                </View>

              </View>
              <View style={{flex:1,display:"flex",borderBottom:"1rpx solid #f0f2f5"}}>
                <View style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"#333333"}}>
                    {item.desc}
                  </Text>
                  <Text style={{fontSize:"26rpx",color:"#efbd74"}}>
                    {item.change_time}
                  </Text>
                </View>
                <View style={{width:"150rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Text style={{fontSize:"26rpx",color:item.user_money>=0?"#cc0033":"#16ca0d"}}>

                    {item.user_money>=0?"+"+item.user_money:item.user_money}
                  </Text>

                </View>

              </View>

            </View>)
          })}







          




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
export default connect(mapstate)(Account)

