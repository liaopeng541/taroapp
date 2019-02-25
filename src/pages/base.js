import set from "../apis/api";
import {set_wxuser} from "../actions/IndexAction";
import Taro from "@tarojs/taro/types/index";
const base=function (obj) {

  obj.wx_checkSession=()=>{
    return new Promise(function (resolve, reject) {
      wx.checkSession({
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res);
        }
      })
    })
  }
  obj.wx_request=(url, data={}, method = 'GET', header={'content-type': 'application/json'})=>{
    return new Promise((resolve, reject)=>{
      wx.request({
        url: url,
        data: data,
        method: method,
        header: header,
        success: function (res) {
          resolve(res)
        },
        fail(res) {
          reject(res)
        }
      });
    })
  }
  obj.error=(e)=>{
    wx.hideLoading();
    obj.setState({
      wxerror: true
    })
  }
  obj.getopenid=(res)=>
  {
    return new Promise((resolve,reject)=>{
      var url=set.getopenid+"&code="+ res.code
      obj.wx_request(url, {},"POST",{'Content-Type': 'application/x-www-form-urlencoded'}).then((data) => {
        console.log("aaaaa")
        console.log(data.data.data);
        resolve(JSON.parse(data.data.data));
      }).catch(()=>{
        obj.error(e)
      })
    })


    // return new Promise((resolve,reject)=>{
    //   var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + set.appid + '&secret=' + set.appsecret + '&js_code=' + res.code + '&grant_type=authorization_code';
    //   obj.wx_request(url).then((res) => {
    //     resolve(res.data);
    //   }).catch((e) => {
    //     reject(e)
    //   })
    // })
  }
  obj.setwxuser=(wxuser)=>{
    wxuser=Object.assign({},obj.props.wxuser.wxuser,wxuser);
    obj.props.dispatch(set_wxuser(wxuser))
    wx.setStorageSync("wxuser", JSON.stringify(wxuser))
  }
  obj.checkwxuser=()=>
  {

    return new Promise((resolve,reject)=>{
      wx.showLoading({title:"加载中.."});

      //读取缓存
      var wxuser = wx.getStorageSync("wxuser");
      if(wxuser)
      {
        wxuser=JSON.parse(wxuser);
        //存在缓存判断是否登陆过期
        obj.wx_checkSession()
          .then((res)=>{
            //没有过期，用缓存的
            if(wxuser.openid)
            {
              console.log("读取缓存")
              obj.setwxuser(wxuser);
              wx.hideLoading();
              resolve(wxuser);
            }else{
              //缓存数据不完整，重新登陆
              obj.wx_login().then((res)=>{
                obj.getopenid(res).then((wxuser)=>{
                  console.log(wxuser)
                  obj.setwxuser(wxuser)
                  wx.hideLoading();
                  resolve(wxuser)
                }).catch((e)=>{
                  obj.error(e)
                })
              })
            }

          })
          .catch((e)=>
          {
            obj.wx_login().then((res)=>{
              obj.getopenid(res).then((wxuser)=>{
                console.log(wxuser)
                obj.setwxuser(wxuser)
                wx.hideLoading();
                resolve(wxuser)
              }).catch((e)=>{
                obj.error(e)
              })
            })


          })

      }else{
        obj.wx_login().then((res)=>{
          obj.getopenid(res).then((wxuser)=>{

            console.log(wxuser)
            obj.setwxuser(wxuser)
            wx.hideLoading();
            resolve(wxuser)
          }).catch((e)=>{
            obj.error(e)
          })
        })
      }

    })

  }
  obj.wx_login=()=>{
    return new Promise(function (resolve, reject) {

      wx.login({
        success: function (res) {
          console.log("登陆成功")
          console.log(res);
          resolve(res)
        },
        fail: function (res) {
          console.log("登陆失败")
          reject(res);
        }
      })
    })
  }
  obj.chooseImage=()=>{
    return new Promise(function (resolve, reject) {
      wx.chooseImage({
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res);
        }
      })
    })
  }

  obj.checkLogin=()=>{
    return new Promise((resolve,reject)=>{
      if(obj.props.userinfo.userinfo)
      {
          resolve();
      }else{
        reject();
      }
    })

  }
  obj.getwxuser=()=>{
    return new Promise((resolve,reject)=>{
      //先判断session是否有效
      obj.wx_checkSession().then((res)=>{
        //登陆有效，无需重复登陆，读取openid
        obj.wx_login().then((res)=>{
          obj.getopenid(res).then((wxuser)=>{
            console.log(wxuser)
            obj.setwxuser(wxuser)
            resolve(wxuser)
          }).catch((e)=>{
            obj.setState({
              wxerror: true
            })
          })
        })
      }).catch(()=>{
        //己失效，重新登录，读取openid
        obj.wx_login().then((res)=>{
          obj.getopenid(res).then((wxuser)=>{
            console.log(wxuser)
            obj.setwxuser(wxuser)
            resolve(wxuser)
          }).catch((e)=>{
            obj.setState({
              wxerror: true
            })
          })
        })
      })
    })
  }
}
export default base