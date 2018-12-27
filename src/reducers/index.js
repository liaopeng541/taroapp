import { combineReducers} from 'redux'
import {usermodel,cart_num,cart,goodslist,vip,car,progress,pushdata,gohome_btn} from "./IndexModel"

const rootreducer= combineReducers({
  usermodel, //把所有的reducer添加进来
  cart_num,
  cart,
  goodslist,
  vip,
  car,
  progress,
  pushdata,
  gohome_btn
})
export default rootreducer