import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Swiper, SwiperItem, Image, ScrollView, Input} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
  set_userinfo, set_cart, set_goodslist, set_viplist, set_bind_car_num, set_progress,
  set_pushdata, set_pushdatanum, gohome_btn, set_cart_num,
} from '../../actions/IndexAction'
 import base from "../base"
import request from "../../libs/request"
import './index.less'
import set from "../../apis/api"
import {AtIcon, AtModal, AtRate, AtTabs, AtTabsPane, AtTag} from "taro-ui"

class Workerdetail extends Component {
  constructor(props) {
    super(props)
    base(this)
    this.state = {
      openstatus: "▼",
      descnum: 2,
      current: 0,
      giftlist:[],
      gift:1,
      tiptitle:"您的打赏是对我们最大的鼓励！",
      pay_code:2,
      worker_info:null,
      showtips:false,
    }
  }

  config = {
    navigationBarTitleText: '门店',
    enablePullDownRefresh: true,
  }
  opendesc() {
    if (this.state.descnum == 2) {
      this.setState({
        descnum: 0,
        openstatus: "▲"
      })
    } else {
      this.setState({
        descnum: 2,
        openstatus: "▼"
      })
    }
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
    this.fetchData();
  }
  fetchData() {
    wx.showLoading({title: "加载中"})
    var databody={
    //  worker_id:this.$router.params.worker_id
      worker_id:42
    }
    console.log(databody)
    this.wx_request(set.old.getworker, databody,"POST",{'Content-Type': 'application/x-www-form-urlencoded'}).then((response) => {
      var data = response.data;
      this.setState({
        giftlist:data.data.gift,
        gift:data.data.gift[0].id,
        tiptitle:data.data.gift[0].desc,
        worker_info:data.data.worker
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
  back() {
    Taro.navigateBack()
  }

  dotip()
  {
    console.log("bbb")
    this.setState({
      showtips:true
    })
  }
  closetip()
  {
    this.setState({
      showtips:false
    })
  }

  componentDidHide() {
  }

  handletab() {

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
              <Text style={{color: "#ffffff", fontSize: "36rpx", fontWeight: "bold"}}>员工详情</Text>
            </View>
            <View style={{height: "80rpx", width: "70rpx", display: "flex", alignItems: "flex-end"}}>
              {/*<Image src={require("../../assets/images/left.png")} style={{width:"50rpx",height:"50rpx"}}/>*/}
            </View>
          </View>
          <ScrollView style={{paddingBottom: "100rpx"}}>


            <View style={{borderBottom: "10rpx solid #f0f2f5", display: "flex", flexDirection: "column"}}>
              <View style={{
                padding: "5rpx 10rpx 10rpx 10rpx",
                border: "solid 2rpx #f0f2f5",
                display: "flex",
                justifyContent: "space-between"
              }}>
                <Text style={{fontSize: "26rpx", color: "#333333"}}>服务技师</Text>
              </View>
              <View style={{display: "flex", height: "100%", borderBottom: "1px solid #f0f2f5"}}>
                <View style={{display: "flex", margin: "5rpx", padding: "10rpx", alignItems: "center", flex: 1}}>
                  <View style={{
                    width: "130rpx",
                    height: "130rpx",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#cccccc",
                    borderRadius: "65rpx"
                  }}>
                    <Image src={(this.state.worker_info && this.state.worker_info.header_pic)?set.server_up+this.state.worker_info.header_pic:require("../../assets/images/avatar.png")}
                       style={{width: "130rpx",
                         height: "130rpx",borderRadius: "65rpx"}}
                    />

                  </View>
                  <View style={{
                    flex: 1,
                    height: "100rpx",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginLeft: "40rpx"
                  }}>
                    <View style={{display: "flex", width: "100%", alignItems: "flex-end"}}>
                      <Text style={{color: "#333333", fontSize: "30rpx"}}>{this.state.worker_info && this.state.worker_info.real_name}</Text>
                      <Text style={{color: "#999999", fontSize: "26rpx", marginLeft: "20rpx"}}>美容技师</Text>
                    </View>
                    <View style={{display: "flex", width: "100%", marginTop: "10rpx", alignItems: "center"}}>
                      <Text style={{color: "#999999", fontSize: "26rpx"}}>服务评价</Text>
                      <View style={{marginLeft: "10rpx"}}>
                        <AtRate value={this.state.worker_info && this.state.worker_info.comment_score?parseFloat(this.state.worker_info.comment_score):4}/>
                      </View>

                    </View>
                    <View style={{display: "flex", width: "100%", marginTop: "10rpx"}}>
                      <Text style={{color: "#999999", fontSize: "26rpx"}}>打赏:</Text><Text
                      style={{color: "#cc0033", fontSize: "26rpx"}}>{this.state.worker_info && this.state.worker_info.tips_num}</Text>
                      <Text style={{color: "#999999", fontSize: "26rpx"}}>点赞:</Text><Text
                      style={{color: "#cc0033", fontSize: "26rpx"}}> {this.state.worker_info && this.state.worker_info.up_num}</Text>
                    </View>
                  </View>


                </View>

                <View onClick={this.dotip.bind(this)} style={{display: "flex", alignItems: "center", justifyContent: "center", width: "160rpx"}}>
                  <View style={{
                    backgroundColor: "#cc0033",
                    height: "56rpx",
                    width: "120rpx",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    borderRadius: "10rpx"
                  }}>
                    <Text style={{color: "#ffffff", fontSize: "26rpx"}}>打赏</Text>
                  </View>
                </View>


              </View>
              <View style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
                <View style={{width: "90%"}}>
                  <Text style={{color: "#666666", fontSize: "26rpx"}}>{this.state.worker_info && this.state.worker_info.desc}</Text>
                </View>
                {/*<View style={{alignItems:"center",borderTop:"#eeeeee solid 1rpx",width:"100%",display:"flex", justifyContent:"center",padding:"5rpx"}}>*/}
                {/*<Text style={{color:"#999999",fontSize:"26rpx"}}>{this.state.openstatus}</Text>*/}
                {/*</View>*/}
              </View>

            </View>
            <View style={{minHeight: "700rpx"}}>
              <AtTabs
                animated={false}
                current={this.state.current}
                tabList={[
                  {title: '用户评价'},
                  {title: '打赏记录'},
                ]}
                onClick={this.handletab.bind(this)}>
                <AtTabsPane current={this.state.current} index={0}>
                  <View style={{
                    height: "70rpx",
                    display: "flex",
                    borderBottom: "solid 1rpx #eeeeee",
                    alignItems: "center",
                    paddingLeft: "10rpx"
                  }}>
                    <Text style={{color: "#333333", fontSize: "26rpx"}}>用户评价({(this.state.worker_info && this.state.worker_info.comment_num)?this.state.worker_info.comment_num:0})</Text>

                  </View>
                  <View
                    style={{padding: "20rpx", flexWrap: "wrap", display: "flex", borderBottom: "solid 1rpx #eeeeee",}}>
                    <View style={{margin: "10rpx"}}>
                      <AtTag
                        name='tag-1'
                        type='primary'
                        circle
                      >
                        <Text style={{color: "#333333", fontSize: "24rpx"}}>非常满意(287)</Text>
                      </AtTag>
                    </View>
                    <View style={{margin: "10rpx"}}>
                      <AtTag
                        name='tag-1'
                        type='primary'
                        circle
                      >
                        <Text style={{color: "#333333", fontSize: "24rpx"}}>非常满意(287)</Text>
                      </AtTag>
                    </View>
                    <View style={{margin: "10rpx"}}>
                      <AtTag
                        name='tag-1'
                        type='primary'
                        circle
                      >
                        <Text style={{color: "#333333", fontSize: "24rpx"}}>非常满意(287)</Text>
                      </AtTag>
                    </View>
                    <View style={{margin: "10rpx"}}>
                      <AtTag
                        name='tag-1'
                        type='primary'
                        circle
                      >
                        <Text style={{color: "#333333", fontSize: "24rpx"}}>非常满意(287)</Text>
                      </AtTag>
                    </View>


                  </View>
                  <View style={{margin: "10rpx"}}>
                    <View style={{
                      borderBottom: "1px solid #eeeeee",
                      padding: "10rpx",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <View style={{
                        width: "150rpx",
                        height: "100rpx",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>

                      </View>
                      <View style={{flex: 1, display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <View>
                          <Text>159***2691</Text>
                        </View>
                        <View style={{display: "flex", alignItems: "center"}}>
                          <AtRate size='15' value={4}/>
                          <Text>满意</Text>
                        </View>
                      </View>
                      <View style={{
                        width: "200rpx",
                        height: "100rpx",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <Text style={{fontSize: "20rpx", color: "#999999"}}>2019-01-25 11:54</Text>
                      </View>


                    </View>


                  </View>

                </AtTabsPane>
                <AtTabsPane current={this.state.current} index={1}>
                  <View>
                    <View style={{margin: "10rpx"}}>
                      <View style={{
                        borderBottom: "1px solid #eeeeee",
                        padding: "10rpx",
                        display: "flex",
                        alignItems: "center"
                      }}>
                        <View style={{
                          width: "100rpx",
                          height: "100rpx",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>

                        </View>
                        <View style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100rpx",
                          paddingLeft: "16rpx",
                          paddingRight: "16rpx"
                        }}>
                          <Text style={{fontSize: "26rpx", color: "#333333"}}>湘UQ**35的车主打赏了一颗棒棒糖</Text>

                        </View>
                        <View style={{
                          width: "200rpx",
                          height: "100rpx",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <Text style={{fontSize: "20rpx", color: "#999999"}}>2019-01-25 11:54</Text>
                        </View>

                      </View>
                    </View>
                    <View style={{margin: "10rpx"}}>
                      <View style={{
                        borderBottom: "1px solid #eeeeee",
                        padding: "10rpx",
                        display: "flex",
                        alignItems: "center"
                      }}>
                        <View style={{
                          width: "100rpx",
                          height: "100rpx",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>

                        </View>
                        <View style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100rpx",
                          paddingLeft: "16rpx",
                          paddingRight: "16rpx"
                        }}>
                          <Text style={{fontSize: "26rpx", color: "#333333"}}>湘UQ**35的车主打赏了一颗棒棒糖</Text>

                        </View>
                        <View style={{
                          width: "200rpx",
                          height: "100rpx",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <Text style={{fontSize: "20rpx", color: "#999999"}}>2019-01-25 11:54</Text>
                        </View>

                      </View>
                    </View>
                    <View style={{margin: "10rpx"}}>
                      <View style={{
                        borderBottom: "1px solid #eeeeee",
                        padding: "10rpx",
                        display: "flex",
                        alignItems: "center"
                      }}>
                        <View style={{
                          width: "100rpx",
                          height: "100rpx",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>

                        </View>
                        <View style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100rpx",
                          paddingLeft: "16rpx",
                          paddingRight: "16rpx"
                        }}>
                          <Text style={{fontSize: "26rpx", color: "#333333"}}>湘UQ**35的车主打赏了一颗棒棒糖</Text>

                        </View>
                        <View style={{
                          width: "200rpx",
                          height: "100rpx",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <Text style={{fontSize: "20rpx", color: "#999999"}}>2019-01-25 11:54</Text>
                        </View>

                      </View>
                    </View>
                  </View>
                </AtTabsPane>
              </AtTabs>


            </View>
          </ScrollView>
        </View>
        <AtModal isOpened={this.state.showtips}>
          <View style={{position: "relative"}}>
            <View style={{height: "180rpx", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <View style={{width: "140rpx", height: "140rpx", borderRadius: "70rpx", backgroundColor: "#cccccc"}}>
              </View>
            </View>
            <View style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Text style={{color:"#999999",fontSize:"24rpx"}}>含在口中，甜到心里</Text>
            </View>

            <View onClick={this.closetip.bind(this)} style={{position: "absolute", top: "10rpx", right: "10rpx"}}>
              <AtIcon prefixClass="icon" value="close" size={30} color={"#bbbbbb"}/>
            </View>
          </View>
          <View style={{display:"flex",flexWrap:"wrap",margin:"20rpx"}}>
            <View style={{margin:"10rpx",border:"solid 5rpx #cc0033",height:"140rpx",width:"140rpx",borderRadius:"10rpx"}}>

            </View>
            <View style={{margin:"10rpx",border:"solid 5rpx #cc0033",height:"140rpx",width:"140rpx",borderRadius:"10rpx"}}>

            </View>
            <View style={{margin:"10rpx",border:"solid 5rpx #cc0033",height:"140rpx",width:"140rpx",borderRadius:"10rpx"}}>

            </View>
            <View style={{margin:"10rpx",border:"solid 5rpx #cc0033",height:"140rpx",width:"140rpx",borderRadius:"10rpx"}}>

            </View>
            <View style={{margin:"10rpx",border:"solid 5rpx #cc0033",height:"140rpx",width:"140rpx",borderRadius:"10rpx"}}>

            </View>
            <View style={{margin:"10rpx",border:"solid 5rpx #cc0033",height:"140rpx",width:"140rpx",borderRadius:"10rpx"}}>

            </View>
          </View>
          <View style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"20rpx",marginTop:"50rpx"}}>
            <View style={{height:"80rpx",backgroundColor:"#cc0033",borderRadius:"10rpx",display:"flex",alignItems:"center",justifyContent:'center',width:"80%"}}>
              <Text style={{color:"#ffffff",fontSize:"24rpx",fontWeight:"bold"}}>好，赏了</Text>
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
    wxuser:state.wxusermodel
  }
}
export default connect(mapstate)(Workerdetail)

