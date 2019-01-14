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
  obj.wx_request=(url, data, method = 'GET', header)=>{
    return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: {},
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
  obj.getopenid=()=>
  {
    return new Promise((resolve,reject)=>{
      var wxuser = wx.getStorageSync("wxuser");
      if (wxuser) {
        wxuser=JSON.parse(wxuser)
        if(wxuser.openid)
        {
          console.log("读取缓存")
          resolve(wxuser);
        }else{
          console.log("重新获取")
          var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + set.appid + '&secret=' + set.appsecret + '&js_code=' + res.code + '&grant_type=authorization_code';
          obj.wx_request(url).then((res) => {
            resolve(res.data);
          }).catch((e) => {
            reject(e)
          })
        }
      }
    })
  }
  obj.setwxuser=(wxuser)=>{
    wxuser=Object.assign({},obj.props.wxuser.wxuser,wxuser);
    obj.props.dispatch(set_wxuser(wxuser))
    wx.setStorageSync("wxuser", JSON.stringify(wxuser))
  }
  obj.wx_login=()=>{
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res);
        }
      })
    })
  }
  // obj.to=(url,checklogin=false)=>{
  //   if(checklogin)
  //   {
  //     obj.checkLogin.then(()=>{
  //       Taro.navigateTo({url: "/pages/my/login"})
  //     }).catch(()=>{
  //       Taro.navigateTo({url: url})
  //     })
  //   }else{
  //     Taro.navigateTo({url: url})
  //   }
  //
  //
  // }
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
        obj.getopenid().then((wxuser)=>{
          obj.setwxuser(wxuser)
          resolve(wxuser)
        }).catch((e)=>{
          obj.setState({
            wxerror: true
          })
        })
      }).catch(()=>{
        //己失效，重新登录，读取openid
        obj.wx_login().then((res)=>{
          obj.getopenid().then((wxuser)=>{
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