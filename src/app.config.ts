export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/playerInfo/index',
    // 'pages/userInfo/index',
    // 'pages/my/index',
    // 'pages/scan/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#000000',
    navigationBarTitleText: '大空间玩家',
    navigationBarTextStyle: 'white'
  },
  // tabBar: {
  //   color: '#999',
  //   selectedColor: '#58C898',
  //   backgroundColor: '#fff',
  //   borderStyle: 'black',
  //   list: [
  //     {
  //       iconPath: 'assets/home.png',
  //       selectedIconPath: 'assets/home-active.png',
  //       pagePath: 'pages/index/index',
  //       text: '首页'
  //     },
  //     {
  //       iconPath: 'assets/me.png',
  //       selectedIconPath: 'assets/me-active.png',
  //       pagePath: 'pages/my/index',
  //       text: '我的'
  //     }
  //   ]
  // }
})
