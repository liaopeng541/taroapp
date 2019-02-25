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
import {AtIcon,AtModal,AtModalHeader,AtModalContent,AtModalAction} from "taro-ui"

class MyCar extends Component {
  constructor(props) {

    super(props)
    base(this)
    this.state = {
      showdel:false,
      car_id:"",
      car_plate:""
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
      this.fetchData()

  }

  componentWillUnmount() {
  }

  componentDidShow() {
    this.fetchData();
  }
  hidedel()
  {
    this.setState({
      showdel:false,
      car_id:null,
      car_plate:""
    })
  }
  showdel(item,e)
  {
    e.stopPropagation();
    this.setState({
      showdel:true,
      car_id:item.id,
      car_plate:item.car_plate
    })
  }
  setdefault(id,e)
  {
    e.stopPropagation();
    wx.showLoading({title: "加载中"})
    var databody={
      openid:this.props.wxuser.wxuser.openid,
      id:id
    }
    this.wx_request(set.setdefaultcar, databody,"POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((data)=>
    {
      if(parseInt(data.data.code)==0)
      {
        wx.showToast({
          title: '设置成功',
          icon: 'none',
          duration: 1800
        })
         this.fetchData();

        this.props.dispatch(set_userinfo(data.data.data))
      }else{
        wx.showToast({
          title: data.data.message,
          icon: 'none',
          duration: 1800
        })
      }
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
  delCar(id,e)
  {
    e.stopPropagation();
    wx.showLoading({title: "加载中"})
    var databody={
      openid:this.props.wxuser.wxuser.openid,
      id:id
    }
    this.wx_request(set.deletecar, databody,"POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((data)=>
    {
      if(parseInt(data.data.code)==0)
      {
        this.setState({
          showdel:false,
          car_id:"",
          car_plate:"",
        })
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 1800
        })
        this.fetchData();

        this.props.dispatch(set_userinfo(data.data.data))
      }else{
        this.setState({
          showdel:false,
          car_id:"",
          car_plate:"",
        })
        wx.showToast({
          title: data.data.message,
          icon: 'none',
          duration: 1800
        })
      }
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
  editCar(item)
  {
    this.props.dispatch(set_editcar(item))
    Taro.navigateTo({url:"/pages/my/EditCar"})

  }
  fetchData() {
    wx.showLoading({title: "加载中"})
    var databody = {
      openid:this.props.wxuser.wxuser.openid
    }
    this.wx_request(set.getusercar, databody,"POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((data) => {
      var newuser=Object.assign({},this.props.userinfo.userinfo,{car_list:data.data.data})

      this.props.dispatch(set_userinfo(newuser))
      wx.stopPullDownRefresh();
      wx.hideLoading();
    }).catch((err) => {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '网络访问失败，请重试',
        icon: 'none',
        duration: 1800
      })
    })

  }
  addcar()
  {
    if(this.props.userinfo&&this.props.userinfo.userinfo&&this.props.userinfo.userinfo.car_list)
    {
      if(this.props.userinfo.userinfo.car_list.length>=2)
      {
        wx.showToast({title:"您己绑定了两台车，无法再添加更多",icon:"none"})
        return
      }
    }
    this.props.dispatch(set_editcar({address:"湘",letter:"U",series:"选择品牌",carname:"选择车型"}))
    Taro.navigateTo({
      url:"/pages/my/EditCar"
    })
  }
  back()
  {
    Taro.navigateBack()
  }
  componentDidHide() {
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
              <Text style={{color: "#ffffff", fontSize: "36rpx", fontWeight: "boldß"}}>我的车辆</Text>
            </View>
            <View style={{height: "80rpx", width: "70rpx", display: "flex", alignItems: "flex-end"}}>

              {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
            </View>
          </View>
          <ScrollView style={{backgroundColor: "#f0f2f5", minHeight: "100vh"}}>
            {this.props.userinfo&&this.props.userinfo.userinfo&&this.props.userinfo.userinfo.car_list&&this.props.userinfo.userinfo.car_list.length>0
            &&this.props.userinfo.userinfo.car_list.map((item,i)=>{
              return(<View key={i}
                style={{display: "flex", borderBottom: "20rpx solid #f0f2f5", backgroundColor: "#ffffff"}}>
                <View style={{
                  width: "180rpx",
                  height: "180rpx",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>

                  <Image src={item.photo?set.server_up+item.photo:require("../../assets/images/ic_launcher.png")}
                         style={{width: "160rpx", height: "160rpx", borderRadius: "5rpx", border: "1rpx solid #f0f2f5"}} mode="widthFix"/>


                </View>
                <View style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column"
                }}>
                  <View style={{display: "flex", alignItems: "center"}}>
                    <Image src={set.server_up+item.logo} style={{
                      width: "60rpx",
                      height: "60rpx",
                      borderRadius: "30rpx",
                      border: "1rpx solid #f0f2f5"
                    }}/>
                    <Text style={{color: "#3333333", fontSize: "30rpx", marginLeft: "10rpx"}}>{item.car_plate}</Text>
                  </View>

                  <Text style={{color: "#666666", fontSize: "26rpx", marginTop: "10rpx"}}>{item.brand_name+item.series}</Text>

                </View>
                <View onClick={this.editCar.bind(this,item)} style={{
                  width: "100rpx",
                  height: "180rpx",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>

                  <AtIcon prefixClass='icon' value='bianji' size='26' color='#999999'></AtIcon>


                </View>
                <View onClick={this.showdel.bind(this,item)} style={{
                  width: "100rpx",
                  height: "180rpx",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>

                  <AtIcon prefixClass='icon' value='jiufuqianbaoicon05' size='26' color='#999999'></AtIcon>
                </View>
                <View style={{
                  width: "100rpx",
                  height: "180rpx",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column"
                }}>

                  <AtIcon onClick={this.setdefault.bind(this,item.id)} prefixClass='icon' value={item.default==1?'danxuan':'guanbi'} size='30' color={item.default==1?'#cc0033':'#999999'}></AtIcon>
                  <Text style={{color: "#999999", fontSize: "20rpx"}}>默认</Text>
                  {/*<AtIcon prefixClass='icon' value='danxuan' size='30' color='#999999'></AtIcon>*/}
                </View>

              </View>)
            })}




          </ScrollView>
        </View>
        <View onClick={this.addcar.bind(this)}  style={{position:"fixed",bottom:0,left:0,right:0,height:"90rpx",backgroundColor:"#cc0033",zIndex:99,alignItems:"center",justifyContent:"center",display:"flex"}}>
          <Text style={{fontSize:"26rpx",color:"#ffffff"}}>添 加</Text>
        </View>
        <AtModal isOpened={this.state.showdel}>
          <AtModalHeader>温馨提示</AtModalHeader>
          <AtModalContent>
            您确定删除{this.state.car_plate}么？
          </AtModalContent>
          <AtModalAction> <Button onClick={this.hidedel.bind(this)}>取消</Button> <Button onClick={this.delCar.bind(this,this.state.car_id)}>确定</Button> </AtModalAction>
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
export default connect(mapstate)(MyCar)

