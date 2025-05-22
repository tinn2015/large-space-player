import { Component, PropsWithChildren } from "react";
import { Provider } from "mobx-react";
import "taro-ui/dist/style/index.scss"; // 引入taro-ui样式
// import "taro-ui/dist/style/components/input.scss";
// import "taro-ui/dist/style/components/icon.scss";
// import "taro-ui/dist/style/components/form.scss";

import counterStore from "./store/counter";
import userStore from "./store/user";

import "./app.less";

const store = {
  counterStore,
  userStore,
};

class App extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
