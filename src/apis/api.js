//const domain = "http://www.yiishop.com/"
const domain="https://www.juyunba.com/"
const baseurl = domain + "backend/web/index.php?r="
const upurl = domain + "backend/web/"
const server_up = "http://app.jzdzsw.cn/backend/web/";
const api = {
  old:{
    getworker:baseurl+"app/newinterface/gettipgift",//获取员工详情
  },
  getopenid:baseurl+"app/wx/getopenid",
  //首页
  upurl: upurl,
  server_up: server_up,
  home: baseurl + "app/wx/home",
  appid: "wx686c76fcf9efa8f5",
  appsecret: "170de1a60a4af3fd7894708bc62d89c6",
  sendsms: baseurl + "app/wx/sendsms",
  login: baseurl + "app/wx/login",
  storelist: baseurl + "app/newinterface/storelist",
  getpay: baseurl + "app/wx/recharge",
  getrechargedetail: baseurl + "app/wx/getrechargedetail",
  getbrand: baseurl + "app/wx/getcarbrand",
  getusercar: baseurl + "app/wx/getusercar",
  setdefaultcar: baseurl + "app/wx/setdefaultcar",
  deletecar: baseurl + "app/wx/deletecar",
  getcartype: baseurl + "app/newinterface/getcartype",
  setusercar: baseurl + "app/wx/setusercar",
  oto: {
    otoorderlist: baseurl + "app/wx/otoorderlist",
    getotoorderdetail: baseurl + "app/wx/getotoorderdetail",
    otoorderpay: baseurl + "app/wx/otoorderpay",
    userbag: baseurl + "app/wx/userbag",
    sendcard: baseurl + "app/wx/sendcard",
    comment: baseurl + "app/wx/comment",
  },
  transfer: baseurl + "app/wx/transfer",
  account: baseurl + "app/wx/account",
  upimage: baseurl + "app/wx/upimage",
  subcomment: baseurl + "app/wx/subcomment",
  GetCooperate: baseurl + "app/wx/get-cooperate",
  getcard: baseurl + "app/wx/get-card",


}
export default api