/**
 * Created by liao on 2017/12/14.
 */
export const usermodel=(state={userinfo:null},action)=>{
    switch (action.type)
    {
        case "set_userinfo":return {userinfo:action.userinfo};
        default:return state
    }
}
export const wxusermodel=(state={wxuser:null},action)=>{
  switch (action.type)
  {
    case "set_wxuser":return {wxuser:action.wxuser};
    default:return state
  }
}
export const store=(state={store:null},action)=>{
  switch (action.type)
  {
    case "set_store":return {store:action.store};
    default:return state
  }
}
export const cart_num=(state={cart_num:0},action)=>{
    switch (action.type)
    {
        case "set_cart_num":return {cart_num:action.cart_num};
        default:return state
    }
}
export const cart=(state={cart:null},action)=>{
    switch (action.type)
    {
        case "set_cart":return {cart:action.cart};
        default:return state
    }
}
export const goodslist =(state={goodslist:null},action)=>{
    switch (action.type)
    {
        case "set_goodslist":return {goodslist:action.goodslist};
        default:return state
    }
}
export const vip = (state={viplist:[]},action)=>{
    switch (action.type)
    {
        case "set_viplist":return {viplist:action.viplist};
        default:return state
    }
}
export const car = (state={bind_car_num:0},action)=>{
    switch (action.type)
    {
        case "set_bind_car_num":return {bind_car_num:action.bind_car_num};
        default:return state;
    }
}
export const progress  = (state={progress:0.1},action)=>{
    switch (action.type)
    {
        case "set_progress":return {progress:action.progress};
        default:return state;
    }
}
export const pushdata  = (state={pushdatanum:0,pushdata:[]},action)=>{
    switch (action.type)
    {
        case "set_pushdata":return {pushdata:action.pushdata,pushdatanum:state.pushdatanum};
        case "set_pushdatanum":return {pushdatanum:action.pushdatanum,pushdata:state.pushdata};
        default:return state;
    }
}
export const gohome_btn  = (state={show_btn:false},action)=>{
    switch (action.type)
    {
        case "gohome_btn":return {show_btn:action.status};
        default:return state;
    }
}