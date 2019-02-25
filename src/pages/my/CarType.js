import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num, set_editcar,
} from '../../actions/IndexAction'
 import base from "../base"
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"
import {editcar} from "../../reducers/IndexModel";

class CarType extends Component {
  constructor(props) {

    super(props)
     base(this)
    this.state = {
      list: []
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
  setcar(car,e)
  {
    console.log(car)
    this.props.dispatch(set_editcar(Object.assign({},this.props.editcar.editcar,{carname:car.carname,car_id:car.car_id})))
    e.stopPropagation();
    this.back();
  }

  fetchData() {
    wx.showLoading({title: "加载中"})
    var databody = {
      id:this.props.editcar.editcar.series_id
    }
    console.log(databody)
    this.wx_request(set.getcartype, databody,"POST",{'Content-Type': 'application/x-www-form-urlencoded'}).then((data) => {
      console.log(data.data)
      this.setState({
        list:data.data
      })


      wx.hideLoading();
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
  back()
  {
    Taro.navigateBack()
  }
  render() {
    const {list}=this.state;
    return (
      <View style={{paddingTop:"105rpx"}}>
        <View>
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
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"boldß"}}>选择车型</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView>
          {list&&list.length>0&&list.map((item,i)=>{
            return(<View key={i} onClick={this.setcar.bind(this,item)}  style={{borderBottom:"solid 1rpx #f0f2f5",display:"flex",alignItems:"center",paddingLeft:"30rpx",height:"80rpx",width:"100%"}}>
              <Text style={{fontSize:"26rpx",color:"#666666"}}>{item.carname}</Text>
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
    pushdata: state.pushdata,
    editcar:state.editcar
  }
}
export default connect(mapstate)(CarType)

