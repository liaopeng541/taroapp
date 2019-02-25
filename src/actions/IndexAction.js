/**
 * Created by liao on 2017/12/14.
 */
export const get_userinfo=()=>{return{type:"get_userinfo"}}
export const set_userinfo=(userinfo)=>{return{type:"set_userinfo",userinfo:userinfo}}
export const get_wxuser=()=>{return{type:"get_wxuser"}}
export const set_wxuser=(wxuser)=>{return{type:"set_wxuser",wxuser:wxuser}}
export const get_store=()=>{return{type:"get_store"}}
export const set_store=(store)=>{return{type:"set_store",store:store}}
export const get_token=()=>{return{type:"get_token"}}
export const set_token=(token)=>{return{type:"set_token",token:token}}
export const get_device_token=()=>{return{type:"get_device_token"}}
export const set_device_token=(device_token)=>{return{type:"set_device_token",device_token:device_token}}
export const set_cart_num=(cart_num)=>{return{type:"set_cart_num",cart_num:cart_num}}
export const set_cart=(cart)=>{return{type:"set_cart",cart:cart}}
export const set_goodslist=(goodslist)=>{return{type:"set_goodslist",goodslist:goodslist}}
export const set_viplist=(viplist)=>{return{type:"set_viplist",viplist:viplist}}
export const set_bind_car_num=(num)=>{return{type:"set_bind_car_num",bind_car_num:num}}
export const set_progress=(progress)=>{return{type:"set_progress",progress:progress}}
export const set_pushdata=(pushdata)=>{return{type:"set_pushdata",pushdata:pushdata}}
export const set_pushdatanum=(pushdatanum)=>{return{type:"set_pushdatanum",pushdatanum:pushdatanum}}
export const gohome_btn=(status)=>{return{type:"gohome_btn",status:status}}

export const get_editcar=()=>{return{type:"get_editcar"}}
export const set_editcar=(editcar)=>{return{type:"set_editcar",editcar:editcar}}