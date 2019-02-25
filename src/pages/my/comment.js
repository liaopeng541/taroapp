import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Textarea, SwiperItem, Image, ScrollView,Input} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num,
} from '../../actions/IndexAction'
import base from "../base"
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"
import {AtIcon,AtRate,AtTag,AtInput} from "taro-ui"

class Comment extends Component {
  constructor(props) {

    super(props)
    base(this)
    this.state = {
      order:null,
      process:[],
      lable:[],
      star: 4,
      score_title:[
        '',
        '非常差',
        '很差',
        '一般',
        '满意',
        '非常满意'
      ],
      all_up:false,
      showtips: false,
      uplist:[],
      content:""


    }
  }

  config = {
    navigationBarTitleText: '订单评价',
    enablePullDownRefresh: false,
  }
  back()
  {
    Taro.navigateBack()
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
    this.onPullDownRefresh()

  }
  changestar(val)
  {
    this.setState({
      star:val
    })
  }
  fetchData() {
    wx.showLoading({title: "加载中",mask:true})
    var databody={
      // openid:this.props.wxuser.wxuser.openid,
      openid:"o1MBZ5JMtqvchLsGg6ViQuB1OvYM",
      order_id:41985
    }
    this.wx_request(set.oto.comment, databody,"POST", {'Content-Type': 'application/x-www-form-urlencoded'}).then((data)=>
    {

      this.setState(data.data.data)


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
  setcontent(e)
  {
    this.setState({
      content:e.detail.value
    })

  }
  upimage()
  {
    this.chooseImage().then((res)=>{
      let that=this;
      console.log(res.tempFilePaths)
      res.tempFilePaths.map((item,i)=>{
        wx.uploadFile({
          url: set.upimage,
          filePath: item,
          name: 'file',
          formData: {
            openid:"o1MBZ5JMtqvchLsGg6ViQuB1OvYM",
          },
          success(res){
            that.state.uplist.push(res.data);
            that.setState({
              uplist:that.state.uplist
            })
          },
          fail(){
            wx.showToast({title:"上传失败，请重试",icon:"none"});
          }
        })
      })

    })
  }
  up(item)
  {
    var all_up=true;
    this.state.process.map((process,i)=>{
      if(process.id==item.id)
      {
        process.checked=!item.checked;
        this.state.process[i].checked=process.checked;
      }
      if(!process.checked)
      {
        all_up=false;
      }
    })
    this.setState({
      all_up:all_up,
      process:this.state.process
    })

  }
  all_up()
  {
    this.state.process.map((process,i)=>{
      this.state.process[i].checked=!this.state.all_up;
    })
    this.setState({
      all_up:!this.state.all_up,
      process:this.state.process
    })
  }
  componentDidHide() {

  }
  subcomment()
  {

    if(!this.state.content)
    {
      wx.showToast({title:"请填写评论内容",icon:"none"})
      return;
    }
    wx.showLoading({title: "加载中",mask:true})
    var up_list=[];
    this.state.process&&this.state.process.length>0&&this.state.process.map((process,i)=>{
      if(!process.checked)
      {
        up_list.push(process.worker.id)
      }
    })

    var databody={
      // openid:this.props.wxuser.wxuser.openid,
      openid:"o1MBZ5JMtqvchLsGg6ViQuB1OvYM",
      otoorder_id:41985,
      images:JSON.stringify(this.state.uplist),
      star:JSON.stringify(this.state.star),
      content:this.state.content,
      lable_list:JSON.stringify(this.state.lable),
      up_list:JSON.stringify(up_list)
    }
    this.wx_request(set.subcomment,databody,"POST",{
      'Accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }).then((res)=>{
      if(res.data.code==0)
      {
        wx.hideLoading();
        setTimeout(()=>{this.back()},300);
      }else{
        wx.showToast({title:res.data.message,icon:"none"})
        return
      }
    }).catch((e)=>{
      wx.showToast({title:"网络访问失败，请重试"})
      return
    })

  }
  toworker(id)
  {
    Taro.navigateTo({url:"/pages/index/workerdetail?id="+id})
  }
  setlabel(item)
  {
    console.log(item)
    this.state.lable.map((lable,i)=>{
      if(item.id==lable.id)
      {
        this.state.lable[i].checked=!item.checked;
      }
    })
    this.setState({
      lable:this.state.lable
    })
  }
  render() {
    const {process,lable,uplist}=this.state;
    return (
      <View style={{backgroundColor:"#f0f2f5",height:"90vh",paddingTop:"105rpx"}}>
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
          <Text style={{color: "#ffffff", fontSize: "36rpx",fontWeight:"bold"}}>订单评价</Text>
          </View>
          <View style={{height:"80rpx",width:"70rpx",display:"flex",alignItems:"flex-end"}}>
            {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
          </View>
        </View>
        <ScrollView style={{paddingBottom:"100rpx"}}>
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"5rpx 10rpx 10rpx 10rpx",border:"solid 2rpx #f0f2f5",display:"flex",justifyContent:"space-between"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>服务项目</Text>
              <Text style={{fontSize:"26rpx",color:"#999999"}}>车辆:{this.state.order&&this.state.order.plate?this.state.order.plate:""}</Text>
            </View>
            <View>
              <View style={{display:"flex",margin:"5rpx",padding:"10rpx",borderBottom:"1px solid #f0f2f5",alignItems:"center"}}>
                <View style={{width:"130rpx",height:"130rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {this.state.order&&this.state.order.photo&&<Image src={set.server_up+this.state.order.photo} style={{width:"130rpx",height:"130rpx"}} mode="widthFix" />}

                </View>
                <View style={{flex:1,height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",marginLeft:"60rpx"}}>
                  <View style={{display:"flex",width:"100%"}}>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>项目类型:</Text>
                    <Text style={{color:"#333333",fontSize:"26rpx",marginLeft:"20rpx"}}>{this.state.order&&this.state.order.order_type_title?this.state.order.order_type_title:""}</Text>
                  </View>
                  <View style={{display:"flex",width:"100%",marginTop:"10rpx"}}>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>服务时间:</Text>
                    <Text style={{color:"#333333",fontSize:"26rpx",marginLeft:"20rpx"}}>{this.state.order&&this.state.order.add_time?this.state.order.add_time:""}</Text>
                  </View>
                  <View style={{display:"flex",width:"100%",marginTop:"10rpx"}}>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>项目类型:</Text>
                    <Text style={{color:"#333333",fontSize:"26rpx",marginLeft:"20rpx"}}>{this.state.order&&this.state.order.store_name?this.state.order.store_name:""}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"10rpx 10rpx 10rpx 10rpx",border:"solid 2rpx #f0f2f5",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>服务技师</Text>

              <View onClick={this.all_up.bind(this)}>
              <AtIcon prefixClass='icon' value='dianzan' size='20' color={this.state.all_up?"#F00":'#CCC'}></AtIcon>
              </View>
            </View>
            <View>
              {process&&process.length>0&&process.map((item,i)=>{
                return(<View key={i} style={{display:"flex",margin:"10rpx",padding:"10rpx",borderBottom:"1px solid #f0f2f5"}}>
                  <View onClick={this.toworker.bind(this,item.worker.id)} style={{width:"100rpx",height:"100rpx",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#cccccc",borderRadius:"50rpx"}}>
                      <Image src={set.server_up+item.worker.header_pic} style={{flex:1,borderRadius:"50rpx"}} mode="widthFix"/>
                  </View>
                  <View style={{flex:1,height:"100rpx",display:"flex",paddingLeft:"30rpx",justifyContent:"center",flexDirection:"column"}}>
                    <View onClick={this.toworker.bind(this,item.worker.id)} >

                      <Text style={{color:"#333333",fontSize:"26rpx"}}>{item.worker.real_name}</Text>
                      <Text style={{color:"#999999",fontSize:"26rpx",marginLeft:"20rpx"}}>{item.worker.job_name}</Text>
                    </View>
                    <Text style={{color:"#999999",fontSize:"26rpx"}}>负责 {item.process_name}</Text>
                  </View>

                  <View onClick={this.up.bind(this,item)} style={{flex:1,display:"flex",alignItems:"flex-end",justifyContent:"center",flexDirection:"column"}}>
                    <AtIcon prefixClass='icon' value='dianzan' size='20' color={item.checked?"#F00":'#CCC'}></AtIcon>

                  </View>
                </View>)
                })}


            </View>


          </View>
          <View style={{borderBottom:"10rpx solid #f0f2f5",display:"flex",flexDirection:"column"}}>
            <View style={{padding:"0rpx 10rpx 5rpx 10rpx",border:"solid 2rpx #f0f2f5"}}>
              <Text style={{fontSize:"26rpx",color:"#333333"}}>服务评价</Text>

            </View>
            <View style={{padding:"10rpx"}}>
              <View style={{display:"flex",alignItems:"center",margin:"10rpx"}}>
                <Text style={{fontSize:"26rpx",marginRight:"20rpx",color:"#333333"}}>服务评分:</Text>

                  <AtRate value={this.state.star} onChange={this.changestar.bind(this)} />

                <Text style={{fontSize:"26rpx",marginLeft:"20rpx",color:"#333333"}}>{this.state.score_title[this.state.star]}</Text>
              </View>
              <View style={{display:"flex",margin:"20rpx",flexWrap:"wrap"}}>
                {lable&&lable.length>0&&lable.map((item,i)=>{
                  return(<View key={i} style={{margin:"5rpx"}} onClick={this.setlabel.bind(this,item)}>
                    <AtTag
                      name='tag-1'
                      type='primary'
                      circle
                      active={item.checked}
                    >
                      {item.content}
                    </AtTag>
                  </View>)
                })}



              </View>
              <View style={{display:"flex",width:"100%",height:"300rpx",backgroundColor:"#efefef"}}>
                <Textarea
                  type='text'
                  placeholder='我们的服务还满意吗？'
                  style={{flex:1,margin:"20rpx",fontSize:"26rpx",color:"#333333"}}
                  value={this.state.content}
                  onInput={this.setcontent.bind(this)}
                />


              </View>
              <View style={{display:"flex",flexWrap:"wrap",paddingTop:"10rpx"}}>
                {uplist&&uplist.length>0&&uplist.map((item,i)=>{

                  return(<View key={i}  style={{width:"160rpx",height:"200rpx",margin:"10rpx",borderRadius:"10rpx",border:"#f0f2f5 solid 1rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Image src={set.upurl+item} style={{width:"158rpx"}} mode={"widthFix"}/>
                  </View>)
                })}
                <View onClick={this.upimage.bind(this)} style={{width:"160rpx",height:"200rpx",margin:"10rpx",border:"#f0f2f5 solid 1rpx",borderRadius:"10rpx",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Text style={{fontSize:"50rpx",color:"#999999"}}>+</Text>
                </View>
              </View>

            </View>


          </View>
        </ScrollView>
          <View onClick={this.subcomment.bind(this)} style={{position:"fixed",bottom:0,left:0,right:0,height:"90rpx",backgroundColor:"#cc0033",zIndex:99,alignItems:"center",justifyContent:"center",display:"flex"}}>
            <Text style={{fontSize:"26rpx",color:"#ffffff"}}>提交评价</Text>
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
    pushdata: state.pushdata
  }
}
export default connect(mapstate)(Comment)

