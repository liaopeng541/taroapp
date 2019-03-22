import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView} from '@tarojs/components'

import base from "../pages/base"

const fillwdith=wx.getSystemInfoSync().windowWidth;
const fillhide=wx.getSystemInfoSync().windowHeight;

class goodslist extends Component {
  constructor(props) {
    super(props)
    base(this)
    this.state = {
      r_title: "🚗 下拉可刷新",
      r_top: 100
    }
  }


  onReachBottom() {
    console.log("bbbbb");
  }

  componentWillReceiveProps(nextProps) {


  }


  onPullDownRefresh() {
    //  this.fetchData()
  }

  componentWillUnmount() {
  }

  componentWillMount()
  {
    this.refirsh=false
    this.tocheing=false;
  }
  tochstart()
  {
    this.tocheing=true;
   // this.refirsh=false
  }
  componentDidShow() {
 //   this.onPullDownRefresh()


  }


  fetchData() {


    wx.showLoading({title: "加载中"})
    var databody={
      openid:this.props.wxuser.wxuser.openid,
      id:this.$router.params.id
    }
    this.wx_request(set.oto.getotoorder, databody,"POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((data)=>
    {


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
  getScroll(t,e)
  {
    if(this.timer)
    {
      clearTimeout(this.timer);
    }
    this.s_top=e.detail.scrollTop
    this.timer=setTimeout(()=>{
      this.dorefirsh();
    },10)
  }
  dorefirsh()
  {

    if(this.refirsh)
    {
      console.log("正在干");
      return;
    }
    //没松手,显示要他松手
    if(this.s_top<=30&&this.tocheing&&this.state.r_title!="🚙 松开刷新!")
    {
      this.setState({
        r_title:"🚙 松开刷新"
      })
    }
    //如果手己经松开
    if(this.s_top<=30&&!this.tocheing)
    {
      this.refirsh=true
      this.setState({
        r_top:40,
        r_title:"🚌 正在刷新"
      })
      setTimeout(()=>{
        this.setState({
          r_top:100,
          r_title:"🚗 下拉可刷新"
        })

        this.refirsh=false;
      },1000)
    }
    if(this.s_top>30&&this.s_top<100&&!this.tocheing){
      console.log("不用干")
      this.setState({
        r_top:this.s_top,
      },()=>{
        this.setState({
          r_top:100,
        })})
      this.refirsh=false;
    }



    return;



    if(this.s_top<=30)
    {
      this.refirsh=true
      this.setState({
        r_top:50,
        r_title:"🚙 松开刷新"
      })
      this.refirsh=true;
      console.log("可以干")

      setTimeout(()=>{
        this.setState({
          r_top:100,
          r_title:"🚗 下拉可刷新"
        })

        this.refirsh=false;
      },1000)

    }else if(this.s_top>30&&this.s_top<100){
      console.log("不用干")
          this.setState({
            r_top:this.s_top,
          },()=>{
            this.setState({
              r_top:100,
          })})}
          this.refirsh=false;




  }
  tochend()
  {
    this.tocheing=false;
    this.dorefirsh();
    // if(this.refirsh)
    // {
    //   console.log("aaaaaa")
    //
    //   this.setState({
    //     r_title:"🚌 正在刷新",
    //     r_top:50,
    //
    //   })
    //   setTimeout(()=>{
    //     this.setState({
    //       r_title:"🚗 下拉可刷新",
    //       r_top:100,
    //     })
    //     this.refirsh=false;
    //   },1000)
    // }else if (this.s_top<100) {
    //   this.setState({
    //     r_top:this.s_top,
    //   },()=>{
    //     this.setState({
    //       r_top:100,
    //     })
    //   })
    // }

  }
  getloadmore(e)
  {

    console.log(e)
  }
  componentDidHide() {
  }

  render() {
    return (
      <ScrollView style={{height:fillhide-50+"px",background:"#f4f4f4"}} scroll-y={true}
                  onScrollToLower={this.getloadmore.bind(this)}
                  scroll-top={this.state.r_top}
                  onScroll={this.getScroll.bind(this)}
                  onTouchend={this.tochend.bind(this)}
                  onTouchstart={this.tochstart.bind(this)}
                  scroll-with-animation={true}

      >
        <View style={{height:"100px",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <Text style={{fontSize:"14px",color:"#58595b",marginBottom:"10px"}}>{this.state.r_title}</Text>
        </View>
        <Swiper
          className='test-w'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
          autoplay
          style={{background:"#ffffff"}}
        >
          <SwiperItem>
            <View className='demo-text-1'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-2'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-3'>3</View>
          </SwiperItem>
        </Swiper>

        <View style={{display:"flex",flexWrap:"wrap"}}>
          <View style={{background:"#cccccc",width:(fillwdith/2-10)+"px",height:(fillwdith/2-10)+"px",margin:"5px"}}>

            <Text>{this.state.r_top}</Text>
          </View>
          <View style={{background:"#cccccc",width:(fillwdith/2-10)+"px",height:(fillwdith/2-10)+"px",margin:"5px"}}>

          </View>
          <View style={{background:"#cccccc",width:(fillwdith/2-10)+"px",height:(fillwdith/2-10)+"px",margin:"5px"}}>

          </View>
          <View style={{background:"#cccccc",width:(fillwdith/2-10)+"px",height:(fillwdith/2-10)+"px",margin:"5px"}}>

          </View>
          <View style={{background:"#cccccc",width:(fillwdith/2-10)+"px",height:(fillwdith/2-10)+"px",margin:"5px"}}>

          </View>
          <View style={{background:"#cccccc",width:(fillwdith/2-10)+"px",height:(fillwdith/2-10)+"px",margin:"5px"}}>

          </View>
          <View style={{background:"#cccccc",width:(fillwdith/2-10)+"px",height:(fillwdith/2-10)+"px",margin:"5px"}}>

          </View>
          <View style={{background:"#cccccc",width:(fillwdith/2-10)+"px",height:(fillwdith/2-10)+"px",margin:"5px"}}>

          </View>
        </View>



      </ScrollView>

    )
  }
}


export default goodslist

