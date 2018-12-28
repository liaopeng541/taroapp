/**
 * Created by liaopeng on 17/3/4.
 */
'use strict'
import querystring from 'query-string';
import fetch from "fetch"

var request = {}

function buildrequest(url, params, overtime = 0, type = "GET", contentType = "form",) {
  var header = {
    url: url,
    data: params,
    header: {
      // 'Accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: type,

  }
  if (contentType == 'json') {
    header.headers['Content-Type'] = 'application/json';
    }
  new Promise((resolve, reject) => {
    wx.request(header,(res)=>resolve(res),()=>reject)
  })

}

request.post = (url, body, overtime = 30, useCookie = false) => {
  return buildrequest(url, body, overtime, "POST", "form", useCookie);
}
request.get = (url, body, overtime = 30, useCookie = false) => {
  return buildrequest(url, body, overtime, "GET", "form", useCookie);
}
request.json = (url, body, overtime = 30, useCookie = false) => {
  return buildrequest(url, body, overtime, "POST", "json", useCookie);
}
export default request