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

class CarBrand extends Component {
  constructor(props) {

    super(props)
     base(this)
    this.state = {
      sild: [],
      view_index:"A",
      list:[],
      index:[],
      showright:false,
      rightlist:[],
      rightwidth:100,
      selectbrand:null
    }
  }

  config = {
    navigationBarTitleText: '门店',

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
    wx.showLoading({title:"正在加载.."})
    this.wx_request(set.getbrand).then((res)=>{
      this.setState({
        list:res.data,
        index:Object.keys(res.data).sort()
      })
      setTimeout(()=>{
        wx.hideLoading();
      },300)

    }).catch((e)=>{
      wx.hideLoading();
      wx.showToast({title:"网络访问失败,请重试",icon:"none"})
    })
  }

  componentDidHide() {
  }
  scrollbrand(item)
  {
    this.setState({
      view_index:item
    })
    console.log(item)
  }
  showrightlist(brand)
  {
    if(this.interval)
    {
      return;
    }
    this.setState({
      showright:true,
      selectbrand:brand,
      rightlist:brand.list?brand.list:[],
      rightwidth:100
    })
    // this.interval = setInterval(()=>{
    //   if(this.state.rightwidth<=30)
    //   {
    //     clearInterval(this.interval)
    //     this.interval=null;
    //
    //   }else{
    //     this.setState({
    //       rightwidth:this.state.rightwidth-10
    //     })
    //   }
    //
    // },2)
    this.setState({
      rightwidth:30
    })
  }
  back()
  {
    Taro.navigateBack()
  }
  setcar(car,e)
  {
    console.log(car)
    this.props.dispatch(set_editcar(Object.assign({},this.props.editcar.editcar,{brand_id:car.brand_id,series_id:car.series_id,series:car.series})))
    e.stopPropagation();
    this.back();
  }
  hidelist()
  {
    this.setState({
      showright:false,
      rightlist:[],
      rightwidth:100,

    })
    // if(this.interval)
    // {
    //   return;
    // }
    // this.interval = setInterval(()=>{
    //
    //   if(this.state.rightwidth>=99)
    //   {
    //     clearInterval(this.interval)
    //     this.interval=null;
    //     this.setState({
    //       showright:false,
    //       rightlist:[],
    //       rightwidth:100,
    //
    //     })
    //
    //   }else{
    //     this.setState({
    //       rightwidth:this.state.rightwidth+10
    //     })
    //   }
    //
    // },2)
  }
  render() {
    const {list,index,rightlist}=this.state
    return (
      <View>
        <View>
        <View
          style={{
          backgroundColor: "#cc0033",
          height: "8vh",
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
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"bold"}}>选择品牌</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView scroll-y scrollIntoView={this.state.view_index} style={{marginTop:"8vh",height:"92vh"}}>
          {index&&index.length>0&&index.map((item,i)=>{

            return(
              <View id={item} key={i} style={{paddingLeft:"20rpx"}}>
                <View style={{height:"80rpx",display:"flex",alignItems:"center"}}>
                  <Text style={{fontSize:"26rpx",color:"rgb(40,169,185)",fontWeight:"bold"}}>
                    {item}
                  </Text>

                </View>
                {list[item]&&list[item].length>0&&list[item].map((brand,j)=>{
                  return(<View onClick={this.showrightlist.bind(this,brand)} key={j} style={{height:"80rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <View style={{width:"90%",display:"flex",alignItems:"center",borderBottom:"#f0f2f5 1rpx solid",height:"79rpx"}}>
                      <Image src={"http://app.jzdzsw.cn/backend/web/"+brand.icon} style={{width:"60rpx",height:"60rpx",borderRadius:"30rpx"}}/>
                      <Text style={{fontSize:"26rpx",color:"#999999",fontWeight:"bold",marginLeft:"20rpx"}}>{brand.name}</Text>
                    </View>
                  </View>)
                })}
              </View>
            )
          })}


        </ScrollView>
          <View style={{width:"80rpx",position:"fixed",right:"0rpx",top:"15vh"}}>
            {index&&index.length>0&&index.map((item,i)=>{
              return( <View  onClick={this.scrollbrand.bind(this,item)}  key={i} style={{width:"80rpx",height:"40rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Text style={{fontSize:"26rpx",color:"rgb(40,169,185)",fontWeight:"bold"}}>
                  {item}
                </Text>
              </View>)
            })}
          </View>
          {this.state.showright&&<View onClick={this.hidelist.bind(this)} style={{display:"flex",background:"rgba(0,0,0,0.3)",position:"fixed",top:"8vh",left:"0",right:"0",bottom:"0"}}>

            <View style={{display:"flex",background:"#ffffff",position:"fixed",top:"8vh",left:this.state.rightwidth+"vw",right:"0",bottom:"0",flexDirection:"column"}}>
              <ScrollView style={{height:"92vh"}}  scroll-y>
                {!rightlist||rightlist.length==0&&<View style={{borderBottom:"solid 1rpx #f0f2f5",display:"flex",alignItems:"center",paddingLeft:"30rpx",height:"80rpx",width:"100%"}}>
                  <Text style={{fontSize:"26rpx",color:"#666666"}}>该品牌下无车系</Text>
                </View>}
                {rightlist&&rightlist.length>0&&rightlist.map((item,i)=>{

                  return (<View onClick={this.setcar.bind(this,item)} key={i} style={{borderBottom:"solid 1rpx #f0f2f5",display:"flex",alignItems:"center",paddingLeft:"30rpx",height:"80rpx",width:"100%"}}>
                    <Text style={{fontSize:"26rpx",color:"#666666"}}>{item.series}</Text>

                  </View>)
                })}
              </ScrollView>


            </View>


          </View>}
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
export default connect(mapstate)(CarBrand)

