import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.less'

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
      'pages/store/index',
      'pages/my/index'
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
        selectedIconPath: "asset/images/home_selected.png",
        iconPath: "asset/images/home.png",
        pagePath: "pages/my/index",
        text: "首页"
      }, {
        selectedIconPath: "asset/images/store_selected.png",
        iconPath: "asset/images/store.png",
        pagePath: "pages/store/index",
        text: "门店"
      },{
        selectedIconPath: "asset/images/my_selected.png",
        iconPath: "asset/images/my.png",
        pagePath: "pages/index/index",
        text: "我的"
      }
      ]
    }
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
