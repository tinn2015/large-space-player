export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/userInfo/index',
    'pages/my/index',
    'pages/scan/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#3B86FF',
    navigationBarTitleText: '大空间玩家',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#3B86FF',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/scan/index',
        text: '扫码'
      },
      {
        pagePath: 'pages/my/index',
        text: '我的'
      }
    ]
  }
})
