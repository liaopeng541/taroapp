import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num,
} from '../../actions/IndexAction'
import base from "../base"
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"

class ConverCard extends Component {
  constructor(props) {
    super(props)
    base(this)
    this.state = {
      sn:"708125554252",
      detail:null
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
  inputcard(val)
  {
    this.setState({
      sn:val.detail.value
    })
  }
  selectCard()
  {
    wx.showLoading({title:"正在查询"});
    this.setState({
      detail:null
    })
   if(!this.state.sn)
   {
     wx.showToast({title:"请输入兑换码",icon:"none"})
   }
    var databody={
      // openid:this.props.wxuser.wxuser.openid,
      openid:"o1MBZ5JMtqvchLsGg6ViQuB1OvYM",
      code:this.state.sn
    }
    this.wx_request(set.GetCooperate, databody,"POST",{'Content-Type': 'application/x-www-form-urlencoded'}).then((data) => {
      console.log(data)
       if(data.data.status==1)
      {
        console.log(data.data.data)
        this.setState({
          detail:data.data.data.card
        })
      }else{
         console.log("bbb")
         wx.showToast({title:data.data.message,icon:"none"})
       }
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
  fetchData() {


  }
  back()
  {
    Taro.navigateBack()
  }
  componentDidHide() {
  }

  tosubconvercard()
  {
    if(this.state.detail)
    {
      Taro.navigateTo({url:"/pages/index/SubConverCard?card="+JSON.stringify(this.state.detail)})
    }else {
      wx.showToast({title:"请先查询实卡",icon:"none"})
    }
  }
  render() {
    return (
      <View style={{backgroundColor: "#f0f2f5", minHeight: "100vh",paddingTop:"105rpx"}}>
        <View>
          <View style={{
            backgroundColor: "#cc0033",
            height: "105rpx",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingBottom: "10rpx",
            position: "fixed",
            top: "0rpx",
            left: "0rpx",
            right: "0rpx",
            zIndex: 99
          }}>
            <View onClick={this.back.bind(this)} style={{
              height: "80rpx",
              width: "70rpx",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center"
            }}>
              <Image src={require("../../assets/images/left.png")} style={{width: "50rpx", height: "50rpx"}}/>
            </View>
            <View style={{flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
              <Text style={{color: "#ffffff", fontSize: "36rpx", fontWeight: "boldß"}}>实卡兑换</Text>
            </View>
            <View style={{height: "80rpx", width: "70rpx", display: "flex", alignItems: "flex-end"}}>
              {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
            </View>
          </View>
          <ScrollView>
            <View style={{height: "100rpx", display: "flex", alignItems: "center"}}>
              <View style={{width: "100rpx", padding: "15rpx"}}>
                <Text style={{color: "#999999", fontSize: "26rpx"}}>
                  兑换码
                </Text>

              </View>
              <View

                style={{
                flex: 1,
                background: "#ffffff",
                height: "60rpx",
                marginRight: "30rpx",
                display:"flex",
                  alignItems:"center",
                  padding:"10rpx",
                borderRadius: "5rpx"
              }}

              >
                <Input style={{color:"#999999",fontSize:"26rpx",flex:1}} onInput={this.inputcard.bind(this)} value={this.state.sn}/>

              </View>

              <View
                onClick={this.selectCard.bind(this)}
                style={{
                width: "120rpx",
                height: "60rpx",
                backgroundColor: "#cc0033",
                marginRight: "20rpx",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10rpx"
              }}>
                <Text style={{color: "#ffffff", fontSize: "26rpx"}}>查询</Text>
              </View>


            </View>

            {this.state.detail&&<View
              style={{margin: "10rpx", backgroundColor: "#ffffff", borderRadius: "20rpx"}}>
              <View style={{
                padding: "10rpx",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                borderBottom: "1rpx solid #f0f2f5",
                display: "flex",
                height: "60rpx"
              }}>
                <Text style={{fontSize: "26rpx", fontWeight: "bold", color: "#666666"}}>新年礼品卡</Text>
              </View>

              {this.state.detail&&this.state.detail.service&&<View>
                <View style={{marginLeft:"20rpx"}}>
                  <Text style={{fontSize: "26rpx", color: "#666666"}}>卡内项目</Text>
                </View>
                <View
                  style={{
                  margin: "15rpx",
                  backgroundColor: "#ffffff",
                  borderRadius: "10rpx",
                  border: "solid 1rpx #f0f2f5"
                }}>
                  <View
                    style={{
                      borderRadius: "10rpx",
                      borderBottom: "solid 1rpx #f0f2f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                    <View style={{
                      width: "220rpx",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "120rpx"
                    }}>
                      <Text style={{fontSize: "26rpx", color: "#666666"}}>快洗</Text>
                    </View>
                    <View style={{
                      width: "150rpx",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "120rpx"
                    }}>
                      <Text style={{fontSize: "26rpx", color: "#666666"}}>1次</Text>
                    </View>
                    <View style={{flex: 1, display: "flex",flexDirection:"column"}}>
                      <Text style={{fontSize: "22rpx", color: "#666666"}}>有 效 期:30天</Text>
                      <Text style={{fontSize: "22rpx", color: "#666666"}}>指定车牌:不指定</Text>
                      <Text style={{fontSize: "22rpx", color: "#666666"}}>适用门店:所有门店</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      borderRadius: "10rpx",
                      borderBottom: "solid 1rpx #f0f2f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                    <View style={{
                      width: "220rpx",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "120rpx"
                    }}>
                      <Text style={{fontSize: "26rpx", color: "#666666"}}>快洗</Text>
                    </View>
                    <View style={{
                      width: "150rpx",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "120rpx"
                    }}>
                      <Text style={{fontSize: "26rpx", color: "#666666"}}>1次</Text>
                    </View>
                    <View style={{flex: 1, display: "flex",flexDirection:"column"}}>
                      <Text style={{fontSize: "22rpx", color: "#666666"}}>有 效 期:30天</Text>
                      <Text style={{fontSize: "22rpx", color: "#666666"}}>指定车牌:不指定</Text>
                      <Text style={{fontSize: "22rpx", color: "#666666"}}>适用门店:所有门店</Text>
                    </View>
                  </View>
                </View>
              </View>}


              {this.state.detail&&this.state.detail.packet&&this.state.detail.packet.balance>0&&<View
                style={{
                margin: "15rpx",
                backgroundColor: "#ffffff",
                borderRadius: "10rpx",
                border: "solid 1rpx #f0f2f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <View style={{
                  width: "150rpx",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "120rpx"
                }}>
                  <Text style={{fontSize: "26rpx", color: "#666666"}}>卡内余额</Text>
                </View>
                <View style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <Text style={{fontSize: "30rpx", color: "#cc0033"}}>￥{this.state.detail.packet.balance}</Text>
                </View>
              </View>}

              {this.state.detail&&this.state.detail.packet&&this.state.detail.packet.level_name&&<View
                style={{
                margin: "15rpx",
                backgroundColor: "#ffffff",
                borderRadius: "10rpx",
                border: "solid 1rpx #f0f2f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <View style={{
                  width: "150rpx",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "120rpx"
                }}>
                  <Text style={{fontSize: "26rpx", color: "#666666"}}>会员等级</Text>
                </View>
                <View style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <Text style={{fontSize: "30rpx", color: "#cc0033"}}>{this.state.detail.packet.level_name}</Text>
                </View>
              </View>}
              <View style={{
                border: "1rpx solid #f0f2f5",
                height: "70rpx",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <View style={{display: "flex", alignItems: "center", justifyContent: "center", width: "150rpx"}}>
                  <Text style={{fontSize: "26rpx", color: "#666666"}}>实卡价值</Text>
                </View>

                <View style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flex: 1,
                  paddingRight: "20rpx"
                }}>
                  <Text style={{fontSize: "26rpx", color: "#666666"}}>￥{(this.state.detail.batch&&this.state.detail.batch.total)?this.state.detail.batch.total:0.00}</Text>
                </View>
              </View>
              <View style={{
                border: "1rpx solid #f0f2f5",
                height: "70rpx",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <View style={{display: "flex", alignItems: "center", justifyContent: "center", width: "150rpx"}}>
                  <Text style={{fontSize: "26rpx", color: "#666666"}}>截至兑换</Text>
                </View>

                <View style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flex: 1,
                  paddingRight: "20rpx"
                }}>
                  <Text style={{fontSize: "26rpx", color: "#666666"}}>{this.state.detail.last_get_time}</Text>
                </View>
              </View>
              <View style={{
                border: "1rpx solid #f0f2f5",
                height: "70rpx",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <View style={{display: "flex", alignItems: "center", justifyContent: "center", width: "150rpx"}}>
                  <Text style={{fontSize: "26rpx", color: "#666666"}}>兑换价格</Text>
                </View>

                <View style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flex: 1,
                  paddingRight: "20rpx"
                }}>
                  <Text style={{fontSize: "26rpx", color: "#666666"}}>￥{this.state.detail.batch.price}</Text>
                </View>
              </View>


            </View>}


          </ScrollView>
        </View>
        <View onClick={this.tosubconvercard.bind(this)} style={{position:"fixed",bottom:0,left:0,right:0,height:"90rpx",backgroundColor:this.state.detail?"#cc0033":"#cccccc",zIndex:99,alignItems:"center",justifyContent:"center",display:"flex"}}>
          <Text style={{fontSize:"26rpx",color:"#ffffff"}}>下一步</Text>
        </View>
      </View>
    )
  }
}

const mapstate = state => {
  return {
    userinfo: state.usermodel,
    cart_num: state.cart_num,
    cart: state.cart,
    goodslist: state.goodslist,
    vip: state.vip,
    progress: state.progress,
    pushdata: state.pushdata,
    wxuser:state.wxusermodel
  }
}
export default connect(mapstate)(ConverCard)

