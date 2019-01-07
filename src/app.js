import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './store/index'

import configStore from './store'

import './app.less'
import 'taro-ui/dist/style/mixins/index.scss'
import "./icon.scss"
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/index/workerdetail',
      'pages/store/index',
      'pages/my/index',
      'pages/my/wallet',
      'pages/my/recharge',
      'pages/my/account',
      'pages/my/transfer',
      'pages/my/washcard',
      'pages/my/sendcard',
      'pages/my/carduse',
      'pages/my/otoorder',
      'pages/my/otodetail',
      'pages/my/comment'
    ],
    window: {
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      backgroundColor:"#fff",
      backgroundTextStyle:"drak",
      navigationStyle:"custom"
    },
    tabBar: {
      color: "#ffffff",
      backgroundColor:"#000000",
      selectedColor: "#cc0033",
      borderStyle: "black" ,
      list: [{
        selectedIconPath: "assets/images/home_selected.png",
        iconPath: "assets/images/home.png",
        pagePath: "pages/index/index",
        text: "首页"
      }, {
        selectedIconPath: "assets/images/store_selected.png",
        iconPath: "assets/images/store.png",
        pagePath: "pages/store/index",
        text: "门店"
      },{
        selectedIconPath: "assets/images/my_selected.png",
        iconPath: "assets/images/my.png",
        pagePath: "pages/my/index",
        text: "我的"
      }
      ]
    },
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
