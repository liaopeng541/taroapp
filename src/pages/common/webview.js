import Taro, {Component} from '@tarojs/taro'
import {WebView} from '@tarojs/components'
class webview extends Component{
  constructor(props)
  {
    super(props);
  }

  componentDidShow()
  {

  }

  render()
  {
    return(
      <WebView src="http://www.yiishop.com/backend/web/index.php?r=app/oto/share_weapp">

      </WebView>
    )
  }

}