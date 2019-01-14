const domain="http://www.yiishop.com/"
const baseurl=domain+"backend/web/index.php?r="
const upurl=domain+"backend/web/"
const api={
      //首页
      upurl:upurl,
      home:baseurl+"appv2/home/home",
      appid:"wx686c76fcf9efa8f5",
      appsecret:"170de1a60a4af3fd7894708bc62d89c6",
      sendsms:baseurl+"app/wx/sendsms",
      login:baseurl+"app/wx/login",
      storelist:baseurl+"app/newinterface/storelist",




}
export default api