import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num,set_editcar
} from '../../actions/IndexAction'
 import base from "../base"
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"

class Province extends Component {
  constructor(props) {

    super(props)
     base(this)
    this.state = {
      slists: [
        {
          abbreviated: "京",
          province: "京(北京)"
        },
        {
          abbreviated: "沪",
          province: "沪(上海)"
        },
        {
          abbreviated: "粤",
          province: "粤(广东)"
        },
        {
          abbreviated: "浙",
          province: "浙(浙江)"
        },
        {
          abbreviated: "津",
          province: "津(天津)"
        },
        {
          abbreviated: "川",
          province: "川(四川)"
        },
        {
          abbreviated: "黑",
          province: "黑(黑龙江)"
        },
        {
          abbreviated: "吉",
          province: "吉(吉林)"
        },
        {
          abbreviated: "辽",
          province: "辽(辽宁)"
        },
        {
          abbreviated: "鲁",
          province: "鲁(山东)"
        },
        {
          abbreviated: "湘",
          province: "湘(湖南)"
        },
        {
          abbreviated: "蒙",
          province: "蒙(内蒙古)"
        },
        {
          abbreviated: "冀",
          province: "冀(河北)"
        },
        {
          abbreviated: "新",
          province: "新(新疆)"
        },
        {
          abbreviated: "甘",
          province: "甘(甘肃)"
        },
        {
          abbreviated: "青",
          province: "青(青海)"
        },
        {
          abbreviated: "陕",
          province: "陕(陕西)"
        },
        {
          abbreviated: "宁",
          province: "宁(宁夏)"
        },
        {
          abbreviated: "豫",
          province: "豫(河南)"
        },
        {
          abbreviated: "晋",
          province: "晋(山西)"
        },
        {
          abbreviated: "皖",
          province: "皖(安徽)"
        },
        {
          abbreviated: "鄂",
          province: "鄂(湖北)"
        },
        {
          abbreviated: "苏",
          province: "苏(江苏)"
        },
        {
          abbreviated: "贵",
          province: "贵(贵州)"
        },
        {
          abbreviated: "黔",
          province: "黔(贵州)"
        },
        {
          abbreviated: "云",
          province: "云(云南)"
        },
        {
          abbreviated: "桂",
          province: "桂(广西)"
        },
        {
          abbreviated: "藏",
          province: "藏(西藏)"
        },
        {
          abbreviated: "赣",
          province: "赣(江西)"
        },
        {
          abbreviated: "闽",
          province: "闽(福建)"
        },
        {
          abbreviated: "琼",
          province: "琼(海南)"
        },
        {
          abbreviated: "渝",
          province: "渝(重庆)"
        },
        {
          abbreviated: "使",
          province: "使(大使馆)"
        },
        {
          abbreviated: "特殊",
          province: "特殊车牌"
        }
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

  componentDidShow() {

  }
  setprovince(item)
  {

    this.props.dispatch(set_editcar(Object.assign({},this.props.editcar.editcar,{address:item.abbreviated})))
    this.back();
  }

  fetchData() {



  }

  componentDidHide() {
  }
  back()
  {
    Taro.navigateBack()
  }
  render() {
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
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"boldß"}}>选择省份</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
          <View style={{padding:"20rpx",display:"flex",flexWrap:"wrap"}}>

            {this.state.slists.map((item,i)=>{
              return(<View key={i} onClick={this.setprovince.bind(this,item)} style={{borderBottom:"1rpx solid #f0f2f5",padding:"20rpx",width:"25vw",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Text style={{color:"#666666",fontSize:"26rpx"}}>
                  {item.province}
                </Text>
              </View>)
            })}








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
    pushdata: state.pushdata,
    editcar:state.editcar
  }
}
export default connect(mapstate)(Province)

