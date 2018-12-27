const base=function (obj) {
    obj.showLoading=(text)=>{
      wx.showLoading({
        title: text?text:'加载中',
      })
    }
    obj.hideLoading=(text)=>{
      wx.hideLoading();
    }



}
export default base