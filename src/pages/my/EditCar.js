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
import {AtIcon} from "taro-ui"

class EditCar extends Component {
  constructor(props) {

    super(props)
    base(this)
    this.state = {
      plate:""
    }
  }

  config = {
    navigationBarTitleText: '门店',
    enablePullDownRefresh: true,
  }

  onReachBottom() {
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
    if(this.props.editcar.editcar.id)
    {
      this.setState({
        plate:this.props.editcar.editcar.plate
      })
    }


  }
  inputcode(event)
  {
    this.setState({
      plate:event.detail.value.toUpperCase()
    })

  }
  setProvince()
  {
    if(this.props.editcar.editcar.series_id)
    {
      return;
    }
    Taro.navigateTo({
      url:"/pages/my/Province"
    })
  }
  setLetter()
  {
    if(this.props.editcar.editcar.series_id)
    {
      return;
    }
    Taro.navigateTo({
      url:"/pages/my/Letter"
    })
  }
  tocarbrand()
  {
    Taro.navigateTo({
      url:"/pages/my/CarBrand"
    })
  }
  tocartype()
  {
    if(!this.props.editcar.editcar.series_id)
    {
      wx.showToast({title:"请先选择品牌",icon:"none"})
      return;
    }
    Taro.navigateTo({
      url:"/pages/my/CarType"
    })
  }
  componentDidHide() {
  }
  back()
  {
    Taro.navigateBack()
  }
  savecar()
  {
    if(!this.state.plate)
    {
      wx.showToast({title:"请输入车牌号",icon:"none"})
      return
    }
    if(!this.props.editcar.editcar.series_id)
    {
      wx.showToast({title:"请选择汽车品牌",icon:"none"})
      return
    }
    wx.showLoading({title:"加载中..."})
    var databody = {
      openid: this.props.wxuser.wxuser.openid,
      address: this.props.editcar.editcar.address?this.props.editcar.editcar.address:"",
      plate: this.state.plate,
      series: this.props.editcar.editcar.series?this.props.editcar.editcar.series:"",
      series_id: this.props.editcar.editcar.series_id?this.props.editcar.editcar.series_id:"",
      letter: this.props.editcar.editcar.letter?this.props.editcar.editcar.letter:"",
      carname: this.props.editcar.editcar.carname?this.props.editcar.editcar.carname:"",
      car_id: this.props.editcar.editcar.car_id?this.props.editcar.editcar.car_id:"",
      id: this.props.editcar.editcar.id?this.props.editcar.editcar.id:"",
    }
    console.log(databody)
    this.wx_request(set.setusercar, databody,"POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((data) => {
      console.log(data)
      wx.hideLoading();
      if(data.data.code==0)
      {
        this.props.dispatch(set_userinfo(Object.assign({},this.props.userinfo.userinfo,data.data.data)))
        wx.showToast({title:this.props.editcar.editcar.id?"修改成功":"添加成功",icon:"none"})
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
  render() {
    var disabled=this.props.editcar.editcar.series_id?"#999999":"#333333"
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
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"boldß"}}>编辑车辆</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView>
          <View style={{padding:"20rpx",display:"flex",borderBottom:"solid 1rpx #f0f2f5"}}>
            <View style={{width:"180rpx",display:"flex",alignItems:"center"}}>
              <Text style={{color:"#cc0033",fontSize:"26rpx"}}>* </Text><Text style={{fontSize:"26rpx",color:disabled,marginLeft:"5rpx"}}> 车牌号码</Text>
            </View>
            <View style={{flex:1,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
              <View style={{border:"solid 1rpx #f0f2f5",height:"70rpx",borderRadius:"10rpx",display:"flex"}}>
                <View onClick={this.setProvince.bind(this)} style={{borderRight:"solid 2rpx #f0f0f5",width:"110rpx",alignItems:"center",display:"flex",height:"70rpx",justifyContent:"space-between"}}>
                  <View style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Text style={{fontSize:"26rpx",color:"#666666"}}>{this.props.editcar.editcar.address}</Text>
                  </View>
                  <View stylwe={{display:"flex",alignItems:"center",justifyContent:"center",width:"50rpx",backgroundColor:"#cc0033",height:"100%"}}>
                  <AtIcon prefixClass='icon' value='xiangxia' size='14' color='#666666'></AtIcon>
                  </View>
                </View>
                <View onClick={this.setLetter.bind(this)} style={{borderRight:"solid 1rpx #f0f0f5",width:"110rpx",alignItems:"center",display:"flex",height:"70rpx",justifyContent:"space-between"}}>
                  <View style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Text style={{fontSize:"26rpx",color:"#666666"}}>{this.props.editcar.editcar.letter}</Text>
                  </View>
                  <View stylwe={{display:"flex",alignItems:"center",justifyContent:"center",width:"50rpx",backgroundColor:"#cc0033",height:"100%"}}>
                    <AtIcon prefixClass='icon' value='xiangxia' size='14' color='#666666'></AtIcon>
                  </View>
                </View>
                <View style={{width:"220rpx",alignItems:"center",display:"flex",height:"70rpx",display:"flex",padding:"0rpx 20rpx 0rpx 20rpx"}}>
                  <Input disabled={this.props.editcar.editcar.series_id} value={this.state.plate} onInput={this.inputcode.bind(this)} maxlength={7} style={{color:"#999999",fontSize:"26rpx"}} placeholder={"车牌号码"}/>


                </View>

              </View>


            </View>
          </View>
          <View onClick={this.tocarbrand.bind(this)} style={{padding:"20rpx",display:"flex",borderBottom:"solid 1rpx #f0f2f5"}}>
            <View style={{width:"180rpx",display:"flex",alignItems:"center"}}>
              <Text style={{color:"#cc0033",fontSize:"26rpx"}}>* </Text><Text style={{fontSize:"26rpx",color:"#333333",marginLeft:"5rpx"}}> 品牌车系</Text>
            </View>
            <View style={{flex:1,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>

              <Text style={{fontSize:"26rpx",color:"#999999"}}>{this.props.editcar.editcar.series}</Text>


            </View>
            <View style={{width:"60rpx",alignItems:"center",justifyContent:"center",display:"flex"}}>
              <AtIcon prefixClass='icon' value='xiangyou' size='16' color='#999999'></AtIcon>

            </View>
          </View>
          <View onClick={this.tocartype.bind(this)} style={{padding:"20rpx",display:"flex",borderBottom:"solid 1rpx #f0f2f5"}}>
            <View style={{width:"180rpx",display:"flex",alignItems:"center"}}>
              <Text style={{fontSize:"26rpx",color:"#333333",marginLeft:"5rpx"}}> 车 型</Text>
            </View>
            <View style={{flex:1,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>

              <Text style={{fontSize:"26rpx",color:"#999999"}}>{this.props.editcar.editcar.carname}</Text>


            </View>
            <View style={{width:"60rpx",alignItems:"center",justifyContent:"center",display:"flex"}}>
              <AtIcon prefixClass='icon' value='xiangyou' size='16' color='#999999'></AtIcon>

            </View>
          </View>





        </ScrollView>
        </View>
        <View onClick={this.savecar.bind(this)}  style={{position:"fixed",bottom:0,left:0,right:0,height:"90rpx",backgroundColor:"#cc0033",zIndex:99,alignItems:"center",justifyContent:"center",display:"flex"}}>
          <Text style={{fontSize:"26rpx",color:"#ffffff"}}>保 存</Text>
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
    editcar:state.editcar,
    wxuser:state.wxusermodel
  }
}
export default connect(mapstate)(EditCar)

