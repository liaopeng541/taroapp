import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView, Input} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num, set_editcar,
} from '../../actions/IndexAction'
import base from "../base"
import request from "../../libs/request"
import {AtModal,AtIcon} from "taro-ui"
import './index.less'
import set from "../../apis/api"

class Subrecharge extends Component {
  constructor(props) {
    super(props)
    base(this)
    this.state = {
      money: 99,
      up:0,
      bind:0,
      vip:{
        name:"",
        time:0
      },
      giftlist:[],
      bind_car:null,
      showcar:true,
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

  }

  onPullDownRefresh() {
      this.fetchData()
  }

  componentWillUnmount() {
  }

  back() {
    Taro.navigateBack()
  }

  componentDidShow() {
    if(this.props.userinfo.userinfo&&this.props.userinfo.userinfo.car)
    {
      this.state({
        bind_car:this.props.userinfo.userinfo.car
      })
    }
    this.fetchData()
  }
  fetchData()
  {
    wx.showLoading({title:"正在加载"})
    var databody = {
      //openid: this.props.wxuser.wxuser.openid,
     // money:this.$router.params.money
      openid:"o1MBZ5JMtqvchLsGg6ViQuB1OvYM",
      money:599
    }
    this.wx_request(set.getrechargedetail, databody, "POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((res) => {
      console.log(res)
      this.setState({
        giftlist:res.data.data.giftlist,
        vip:res.data.data.vip,
        bind:res.data.data.bind,
        up:res.data.data.up
      })


      wx.hideLoading();
      wx.stopPullDownRefresh()
    }).catch((e)=>{
      wx.hideLoading();
      wx.showToast({title:"网络加载失败，请重试",icon:"none"})

      wx.stopPullDownRefresh()
    })
  }
  subpay() {
    wx.showLoading({title: "正在加载.."})
    var databody = {
      openid: this.props.wxuser.wxuser.openid,
      money: this.$router.params.money
    }
    //获取签名
    this.wx_request(set.getpay, databody, 'POST', {'Content-Type': 'application/x-www-form-urlencoded'}).then((res) => {
      if (res.data.code == 0) {
        console.log(res.data.data)
        if(!res.data.data)
        {
          wx.showToast({title:"支付出错，请重试"})
          return;
        }
        var paydata = {
          timeStamp: res.data.data.timestamp.toString(),
          nonceStr: res.data.data.nonce_str,
          package: "prepay_id="+res.data.data.prepay_id,
          signType: "MD5",
          paySign: res.data.data.sign,
          success:()=>{
            console.log("success")
          },
          fail:()=>{
            console.log("fail")

          },
          complete:()=>{
            console.log("complete")
            wx.hideLoading();
          }
        };

        wx.requestPayment(paydata)

      }else{
        wx.hideLoading();
        wx.showToast({title:res.data.message,icon:"none"})

      }
    })


  }
  selectcar()
  {
    if(this.state.bind_car)
    {
      this.setState({
        showcar:true
      })

    }else{
      this.props.dispatch(set_editcar({address:"湘",letter:"U",series:"选择品牌",carname:"选择车型"}))
      Taro.navigateTo({
        url:"/pages/my/EditCar"
      })
    }
  }
  setmoney(item) {
    console.log(item)
    this.setState({
      money: item
    })

  }

  setmoneyforinput(e) {
    this.setState({
      money: e.detail.value
    })
  }

  componentDidHide() {
  }

  closecar()
  {
    this.setState({
      showcar:false
    })
  }
  setcar()
  {


  }
  subsetCar()
  {

  }
  render() {
    const  giftlist=this.state.giftlist
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
              <Text style={{color: "#ffffff", fontSize: "36rpx", fontWeight: "bold"}}>充值</Text>
            </View>
            <View style={{height: "80rpx", width: "70rpx", display: "flex", alignItems: "flex-end"}}>
              {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
            </View>
          </View>
          <ScrollView>
            <View style={{padding:"20rpx",borderBottom:"10rpx solid #f0f2f5",display:"flex"}}>
              <View style={{flex:1,padding:"10rpx",display:"flex",alignItems:"center"}}>
                <Image src="https://wx.qlogo.cn/mmopen/vi_32/13fqPkeaUSMx4Eyu7jPT9FUJdYIXznX5Wg56S2rPZ6bFcdKfnjA4iafu1UzIUKXRI6H0bFOPPe0aiaLaGZuOT2Dw/132" style={{width:"60rpx",height:"60rpx",borderRadius:"25rpx"}}/>
                <View style={{flex:1,marginLeft:"20rpx"}}>
                  <Text style={{display:"block",color:"#333333",fontSize:"26rpx"}}>
                    {this.props.userinfo&&this.props.wxuser&&this.props.wxuser.wxuser.nickName}
                  </Text>
                  <Text style={{display:"block",color:"#999999",fontSize:"20rpx"}}>

                  </Text>
                </View>
              </View>
              <View style={{flex:1,padding:"10rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>

                <Text style={{display:"block",color:"#333333",fontSize:"26rpx"}}>账户余额:</Text>
                <Text style={{display:"block",color:"#cc0033",fontSize:"26rpx"}}>{(this.props.userinfo&&this.props.userinfo.userinfo)?this.props.userinfo.userinfo.user_money:0.00}</Text><Text style={{display:"block",color:"#333333",fontSize:"26rpx"}}>元</Text>


              </View>



            </View>
            <View
              style={{padding: "20rpx", borderBottom: "10rpx solid #f0f2f5", display: "flex", alignItems: "center"}}>
              <Text style={{fontSize: "26rpx", color: "#333333"}}>充值金额</Text>
              <View style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Text style={{color: "#cc0033", fontSize: "30rpx"}}>
                  {this.$router.params.money}
                </Text>
                <Text style={{color: "#333333", fontSize: "26rpx", marginLeft: "10rpx"}}>
                  元
                </Text>

              </View>


            </View>
            {this.state.up>0&&<View
              style={{
                borderBottom: "10rpx solid #f0f2f5",
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
              }}>
              <View style={{
                padding: "20rpx",
                display: "flex",
                alignItems: "center",
                width: "100%",
                borderBottom: "2rpx solid #f0f2f5",
              }}>
                <Text style={{fontSize: "26rpx", color: "#333333", marginLeft: "20rpx"}}>会员升级</Text>
              </View>
              <View style={{
                borderBottom: "2rpx solid #f0f2f5",
                display: "flex",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                <View
                  style={{
                    padding: "20rpx",
                    borderBottom: "2rpx solid #f0f2f5",
                    display: "flex",
                    alignItems: "center",
                    width: "90%",
                    justifyContent: "space-between"
                  }}>
                  <View>
                    <Text style={{color: "#666666", fontSize: "26rpx", marginLeft: "10rpx"}}>
                      获得等级
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: "#cc0033", fontSize: "26rpx"}}>
                      {this.state.vip.name}
                    </Text>
                  </View>

                </View>
                <View
                  style={{
                    padding: "20rpx",
                    borderBottom: "2rpx solid #f0f2f5",
                    display: "flex",
                    alignItems: "center",
                    width: "90%",
                    justifyContent: "space-between"
                  }}>
                  <View>
                    <Text style={{color: "#666666", fontSize: "26rpx", marginLeft: "10rpx"}}>
                      获得等级
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: "#666666", fontSize: "30rpx"}}>
                      {this.state.vip.time}天
                    </Text>
                  </View>

                </View>
              </View>


            </View>}
            {giftlist&&giftlist.length>0&&<View
              style={{
                borderBottom: "10rpx solid #f0f2f5",
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
              }}>
              {this.state.bind>0&&<View
                style={{
                padding: "20rpx",
                display: "flex",
                alignItems: "center",
                width: "100%",
                borderBottom: "2rpx solid #f0f2f5",
              }}>
                <Text style={{fontSize: "26rpx", color: "#333333", marginLeft: "20rpx"}}>充值赠品</Text>
              </View>}
              <View style={{
                borderBottom: "2rpx solid #f0f2f5",
                display: "flex",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                <View
                  style={{
                    padding: "20rpx",
                    borderBottom: "2rpx solid #f0f2f5",
                    display: "flex",
                    alignItems: "center",
                    width: "90%",
                    justifyContent: "space-between"
                  }}>
                  <View>
                    <Text style={{color: "#666666", fontSize: "26rpx", marginLeft: "10rpx"}}>
                      赠品接收车辆
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: "#cc0033", fontSize: "26rpx", marginLeft: "10rpx"}}>
                      {this.state.bind_car&&this.state.bind_car.car_plate}
                    </Text>
                  </View>
                  <View onClick={this.selectcar.bind(this)}  style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <View style={{
                      width: "130rpx",
                      height: "50rpx",
                      backgroundColor: "#cc0033",
                      borderRadius: "10rpx",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Text style={{color: "#ffffff", fontSize: "22rpx"}}>
                        {this.state.bind_car?"指定车辆":"绑定车辆"}
                      </Text>
                    </View>

                  </View>

                </View>
                {giftlist.map((item,i)=>{
                  return(<View key={i}
                    style={{
                      padding: "20rpx",
                      borderBottom: "2rpx solid #f0f2f5",
                      display: "flex",
                      alignItems: "center",
                      width: "90%",
                      justifyContent: "space-between"
                    }}>
                    <View style={{width: "200rpx"}}>
                      <Text style={{
                        color: "#666666",
                        fontSize: "26rpx",
                        marginLeft: "10rpx",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        {item.service_name}
                      </Text>
                    </View>
                    <View style={{width: "100rpx"}}>
                      <Text style={{color: "#666666", fontSize: "26rpx", marginLeft: "5rpx"}}>
                        ×{item.num}
                      </Text>
                    </View>
                    <View style={{display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                      {item.lable.map((lable,j)=>{
                        return(<View key={j}
                          style={{
                            margin: "5rpx",
                            width: "100rpx",
                            height: "40rpx",
                            backgroundColor: "#a389ec",
                            borderRadius: "10rpx",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                          <Text style={{color: "#ffffff", fontSize: "20rpx"}}>
                            {lable}
                          </Text>
                        </View>)

                      })}

                    </View>

                  </View>)
                })}

              </View>


            </View>}

          </ScrollView>
        </View>
        <View style={{
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
        }} onClick={this.subpay.bind(this)}>
          <Text style={{fontSize: "26rpx", color: "#ffffff"}} >立即支付</Text>
        </View>

        <AtModal isOpened={this.state.showcar}>
          <View style={{position: "relative",backgroundColor:"#cc0033",display:"flex",alignItems:"center",justifyContent:"center",height:"80rpx"}}>

            <Text style={{color:"#ffffff",fontSize:"26rpx",fontWeight:"bold"}}>选择车辆</Text>

            <View onClick={this.closecar.bind(this)} style={{position: "absolute", top: "10rpx", right: "10rpx"}}>
              <AtIcon prefixClass="icon" value="close" size={26} color={"#ffffff"}/>
            </View>
          </View>
          <View style={{display:"flex",margin:"20rpx",flexDirection:"column",minHeight:"260rpx"}}>

            <View onClick={this.setcar.bind(this)} style={{margin:"10rpx",border:"solid 5rpx #cc0033",borderRadius:"10rpx",flexDirection:"row",display:"flex"}}>
              <View style={{height:"90rpx",width:"90rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <AtIcon prefixClass="icon" value="danxuan" size={26} color={"#cc0033"}/>
              </View>
                <View style={{height:"90rpx",width:"120rpx",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#cccccc"}}>

                </View>
                <View style={{flex:1,display:"flex",height:"90rpx",alignItems:"center",justifyContent:"center"}}>
                  <Text style={{color:"#333333",fontSize:"26rpx",fontWeight:"bold"}}>湘UL7075</Text>
                </View>
            </View>

            <View style={{margin:"10rpx",border:"solid 5rpx #f0f2f5",borderRadius:"10rpx",flexDirection:"row",display:"flex"}}>
              <View style={{height:"90rpx",width:"90rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <AtIcon prefixClass="icon" value="danxuan" size={26} color={"#f0f2f5"}/>

              </View>
              <View style={{height:"90rpx",width:"120rpx",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#cccccc"}}>

              </View>
              <View style={{flex:1,display:"flex",height:"90rpx",alignItems:"center",justifyContent:"center"}}>
                <Text style={{color:"#333333",fontSize:"26rpx",fontWeight:"bold"}}>湘U88888</Text>
              </View>
            </View>


          </View>
          <View onClick={this.subsetCar.bind(this)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"20rpx",marginTop:"50rpx"}}>
            <View style={{height:"80rpx",backgroundColor:"#cc0033",borderRadius:"10rpx",display:"flex",alignItems:"center",justifyContent:'center',width:"80%"}}>
              <Text style={{color:"#ffffff",fontSize:"24rpx",fontWeight:"bold"}}>确定</Text>
            </View>

          </View>

        </AtModal>

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
    wxuser: state.wxusermodel,
    editcar:state.editcar
  }
}
export default connect(mapstate)(Subrecharge)

