import { combineReducers} from 'redux'
import {usermodel,cart_num,cart,goodslist,vip,car,progress,pushdata,gohome_btn,wxusermodel,store,editcar} from "./IndexModel"

const rootreducer= combineReducers({
  usermodel, //把所有的reducer添加进来
  cart_num,
  cart,
  goodslist,
  vip,
  car,
  progress,
  pushdata,
  gohome_btn,
  wxusermodel,
  editcar,
  store
})
export default rootreducer