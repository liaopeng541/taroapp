const base=function (obj) {
    obj.showLoading=(text)=>{
      wx.showLoading({
        title: text?text:'加载中',
      })
    }
    obj.hideLoading=(text)=>{
      wx.showLoading();
    }
    obj.showToast=()=>{
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    }



}
export default base