import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView, Input} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num, set_editcar,
} from '../../actions/IndexAction'
import base from "../base"
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"
import {AtIcon} from "taro-ui"

class Sendcard extends Component {
  constructor(props) {

    super(props)
    base(this)
    this.state = {
      detail: null,
      plate: "",
      num: 1,
      mobile: ""
    }
  }

  config = {
    navigationBarTitleText: '门店',
    enablePullDownRefresh: false,
  }

  onReachBottom() {
    console.log("bbbbb");
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  onPullDownRefresh() {
    this.fetchData()
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    this.fetchData();
  }

  fetchData() {
    var card = JSON.parse(this.$router.params.detail);
    this.setState({detail: card})
  }

  componentDidHide() {
  }

  setProvince() {
    if (this.props.editcar.editcar.series_id) {
      return;
    }
    Taro.navigateTo({
      url: "/pages/my/Province"
    })
  }

  back() {
    this.props.dispatch(set_editcar({address: "湘", letter: "U", series: "选择品牌", carname: "选择车型"}))
    Taro.navigateBack()
  }

  setLetter() {
    if (this.props.editcar.editcar.series_id) {
      return;
    }
    Taro.navigateTo({
      url: "/pages/my/Letter"
    })
  }

  inputcode(event) {
    this.setState({
      plate: event.detail.value.toUpperCase()
    })

  }
  inputmobile(event) {
    this.setState({
      mobile: event.detail.value.toUpperCase()
    })

  }

  upnum() {
    if (!this.state.detail) {
      return;
    }
    if (this.state.num < this.state.detail.surplus_num) {
      var num = this.state.num + 1;

      this.setState({
        num: num
      })
    }
  }
  subcard()
  {
    if(!this.state.plate)
    {
      wx.showToast({title:"请输入接收人车牌号码",icon:"none"})
      return;
    }
    if(this.state.mobile)
    {
      if(!(/^1[345789]\d{9}$/.test(this.state.mobile))){
        wx.showToast({title:"收卡人手机号码有误，请重填",icon:"none"})
          return false;
      }
    }
    wx.showLoading({title:"加载中...",mask:true})
    var databody={
      openid:"o1MBZ5JMtqvchLsGg6ViQuB1OvYM",
      bag_id:this.state.detail.id,
      mobile:this.state.mobile,
      num:this.state.num,
      car_plate:this.props.editcar.editcar.address+this.props.editcar.editcar.letter+this.state.plate
    }
    this.wx_request(set.oto.sendcard, databody,"POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((data) => {
      console.log(data)
      wx.hideLoading();
      if(data.data.code==0)
      {
        wx.showToast({title:"赠送成功",icon:"none"})
        this.props.dispatch(set_editcar({address:"湘",letter:"U",series:"选择品牌",carname:"选择车型"}))
        setTimeout(()=>{
          Taro.navigateBack();
        },300)
      }else{
        wx.showToast({title:data.data.message,icon:"none"})
      }


    }).catch((e)=>{
      wx.hideLoading();
      wx.showToast({title:"网络访问失败，请重试",icon:"none"})
    })


  }
  downnum() {
    var num = 1;
    if (this.state.num > 1) {
      num = this.state.num - 1;
    }
    this.setState({
      num: num
    })
  }

  render() {
    return (
      <View style={{backgroundColor: "#f0f2f5", height: "100vh",paddingTop:"105rpx"}}>
        <View style={{backgroundColor: "#ffffff"}}>
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
              <Text style={{color: "#ffffff", fontSize: "36rpx", fontWeight: "bold"}}>赠出洗车卡</Text>
            </View>
            <View style={{height: "80rpx", width: "70rpx", display: "flex", alignItems: "flex-end"}}>
              {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
            </View>
          </View>
          <ScrollView>
            <View style={{borderBottom: "10rpx solid #f0f2f5", display: "flex", flexDirection: "column"}}>
              <View style={{padding: "10rpx 20rpx 10rpx 20rpx", border: "solid 2rpx #f0f2f5"}}>
                <Text style={{fontSize: "26rpx", color: "#333333"}}>赠出服务</Text>
              </View>
              <View style={{
                display: "flex",
                backgroundImage: `url("http://app.jzdzsw.cn/backend/web/wxbackimage/coupon/card.png")`,
                backgroundSize: "cover",
                height: "230rpx",
                margin: "10rpx",
                borderRadius: "15rpx"
              }}>
                <View style={{
                  height: "100%",
                  width: "240rpx",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column"
                }}>
                  <Text style={{fontSize: "30rpx", color: "#ffffff", fontWeight: "bold"}}>
                    快洗
                  </Text>
                  <Text style={{fontSize: "26rpx", color: "#ffffff", fontWeight: "bold"}}>
                    ×1
                  </Text>
                </View>
                <View style={{flex: 1, display: "flex"}}>
                  <View style={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <Text style={{fontSize: "24rpx", color: "#ffffff"}}>
                      来源：{this.state.detail && this.state.detail.source ? this.state.detail.source : ""}
                    </Text>
                    <Text style={{fontSize: "24rpx", color: "#ffffff", marginTop: "6rpx"}}>
                      适用车辆：{this.state.detail && this.state.detail.car_plate ? item.car_plate : "所有车辆"}
                    </Text>
                    <Text style={{fontSize: "24rpx", color: "#ffffff", marginTop: "6rpx"}}>
                      适用门店：{this.state.detail && this.state.detail.store_name ? item.store_name : "所有门店"}
                    </Text>
                    <Text style={{fontSize: "24rpx", color: "#ffffff", marginTop: "6rpx"}}>
                      有效期至：{this.state.detail && this.state.detail.end_time ? this.state.detail.end_time : "长期有效"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{
              borderBottom: "10rpx solid #f0f2f5",
              display: "flex",
              flexDirection: "column",
              paddingBottom: "20rpx"
            }}>
              <View style={{padding: "10rpx 20rpx 10rpx 20rpx", border: "solid 2rpx #f0f2f5"}}>
                <Text style={{fontSize: "26rpx", color: "#333333"}}>赠送用户（</Text><Text
                style={{fontSize: "26rpx", color: "#cc0033"}}>必填</Text><Text
                style={{fontSize: "26rpx", color: "#333333"}}>）</Text>

              </View>
              <View style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30rpx"}}>
                <Text style={{fontSize: "26rpx", color: "#333333", width: "200rpx", textAlign: "right"}}>接收车牌：</Text>
                <View style={{flex: 1}}>
                  <View style={{paddingLeft: "10rpx", width: "500rpx"}}>
                    <View
                      style={{border: "solid 1rpx #cccccc", height: "70rpx", borderRadius: "10rpx", display: "flex"}}>
                      <View onClick={this.setProvince.bind(this)} style={{
                        borderRight: "solid 1rpx #cccccc",
                        width: "110rpx",
                        alignItems: "center",
                        display: "flex",
                        height: "70rpx",
                        justifyContent: "space-between"
                      }}>
                        <View style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <Text
                            style={{fontSize: "26rpx", color: "#999999"}}>{this.props.editcar.editcar.address}</Text>
                        </View>
                        <View stylwe={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "50rpx",
                          backgroundColor: "#cc0033",
                          height: "100%"
                        }}>
                          <AtIcon prefixClass='icon' value='xiangxia' size='14' color='#999999'></AtIcon>
                        </View>
                      </View>
                      <View onClick={this.setLetter.bind(this)} style={{
                        borderRight: "solid 1rpx #cccccc",
                        width: "110rpx",
                        alignItems: "center",
                        display: "flex",
                        height: "70rpx",
                        justifyContent: "space-between"
                      }}>
                        <View style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <Text style={{fontSize: "26rpx", color: "#999999"}}>{this.props.editcar.editcar.letter}</Text>
                        </View>
                        <View stylwe={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "50rpx",
                          backgroundColor: "#cc0033",
                          height: "100%"
                        }}>
                          <AtIcon prefixClass='icon' value='xiangxia' size='14' color='#999999'></AtIcon>
                        </View>
                      </View>
                      <View style={{
                        width: "220rpx",
                        alignItems: "center",
                        display: "flex",
                        height: "70rpx",
                        padding: "0rpx 20rpx 0rpx 20rpx"
                      }}>
                        <Input disabled={this.props.editcar.editcar.series_id} value={this.state.plate}
                               onInput={this.inputcode.bind(this)} maxlength={7}
                               style={{color: "#999999", fontSize: "26rpx"}} placeholder={"车牌号码"}/>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30rpx"}}>
                <Text style={{fontSize: "26rpx", color: "#333333", width: "200rpx", textAlign: "right"}}>数量：</Text>
                <View style={{flex: 1}}>
                  <View style={{
                    margin: "10rpx",
                    display: "flex",
                    border: "2rpx solid #cccccc",
                    height: "60rpx",
                    borderRadius: "6rpx",
                    width: "260rpx",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <View onClick={this.upnum.bind(this)} style={{
                      height: "100%",
                      backgroundColor: "#f0f2f5",
                      width: "80rpx",
                      borderRight: "1rpx solid #cccccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Text style={{fontSize: "26rpx"}}>+</Text>
                    </View>
                    <Input style={{flex: 1, color: "#cc0033", fontSize: "26rpx", color: "#666666", textAlign: "center"}}
                           type="digit" disabled={true} value={this.state.num} />
                    <View onClick={this.downnum.bind(this)} style={{
                      height: "100%",
                      backgroundColor: "#f0f2f5",
                      width: "80rpx",
                      borderLeft: "1rpx solid #cccccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Text style={{fontSize: "26rpx"}}>-</Text>
                    </View>

                  </View>
                </View>
              </View>
            </View>
            <View style={{
              borderBottom: "10rpx solid #f0f2f5",
              display: "flex",
              flexDirection: "column",
              paddingBottom: "50rpx"
            }}>
              <View style={{padding: "10rpx 20rpx 10rpx 20rpx", border: "solid 2rpx #f0f2f5"}}>
                <Text style={{fontSize: "26rpx", color: "#333333"}}>免费短信通知（</Text><Text
                style={{fontSize: "26rpx", color: "#333333"}}>选填</Text><Text
                style={{fontSize: "26rpx", color: "#333333"}}>）</Text>
              </View>
              <View style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "40rpx"}}>
                <Text style={{fontSize: "26rpx", color: "#333333"}}>手机号码：</Text>
                <View style={{
                  margin: "10rpx",
                  display: "flex",
                  border: "2rpx solid #cccccc",
                  height: "60rpx",
                  borderRadius: "6rpx",
                  padding: "0rpx 2rpx 0rpx 10rpx",
                  width: "450rpx",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Input  onInput={this.inputmobile.bind(this)} maxlength={11}  style={{flex: 1, color: "#cc0033", fontSize: "26rpx", color: "#666666"}} type="digit"
                         placeholder="请输入收卡人手机号码..."/>
                </View>
              </View>
            </View>
          </ScrollView>
          <View onClick={this.subcard.bind(this)} style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "90rpx",
            backgroundColor: "#cc0033",
            zIndex: 99,
            alignItems: "center",
            justifyContent: "center",
            display: "flex"
          }}>
            <Text style={{fontSize: "26rpx", color: "#ffffff"}}>赠送</Text>
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
    editcar: state.editcar,
  }
}
export default connect(mapstate)(Sendcard)

