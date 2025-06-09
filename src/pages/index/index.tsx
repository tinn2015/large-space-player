import { Component } from "react";
import { View, Button, Text, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import { AtButton, AtMessage } from "taro-ui";
import { login, getUserInfo } from "../../utils/request";
// 引入图片资源
import scanQrCode from "../../assets/scan3.png";
import logoIcon from "../../assets/logo2.png";

import "./index.less";

type PageStateProps = {
  store: {
    userStore: {
      userInfo: any;
      setUserInfo: Function;
      phoneNumber: string;
      setPhoneNumber: Function;
      setUserProfile: Function;
    };
  };
};

interface IndexProps extends PageStateProps {}

@inject("store")
@observer
class Index extends Component<IndexProps> {
  state = {
    isLoggedIn: false,
    canIUseGetUserProfile: false,
  };

  componentDidMount() {
    this.checkLoginStatus();
  }

  // 检查登录状态
  checkLoginStatus = async () => {
    try {
      // 检查登录态是否过期
      const checkRes = await Taro.checkSession();
      console.log("登录态检查结果：", checkRes);

      // 获取本地存储的token
      const token = Taro.getStorageSync("token");
      console.log("token", token);

      if (!token) {
        // 如果没有token，执行登录流程
        await this.handleLogin();
      } else {
        // 如果有token，直接获取用户信息
        await this.getUserInfo();
      }
    } catch (error) {
      console.log("登录态已过期，需要重新登录", error);
      await this.handleLogin();
    }
  };

  // 处理登录逻辑
  handleLogin = async () => {
    try {
      // 获取登录code
      const loginRes = await Taro.login();
      if (loginRes.code) {
        // TODO: 调用后端登录接口，使用code换取token
        const res = await login(loginRes.code);
        console.log("登录结果res", res);
        Taro.setStorageSync("token", res.data.token);

        // 登录成功后获取用户信息
        await this.getUserInfo();
      } else {
        console.log("登录失败！" + loginRes.errMsg);
        Taro.showToast({
          title: "登录失败",
          icon: "none",
        });
      }
    } catch (error) {
      console.log("登录失败", error);
      Taro.showToast({
        title: "登录失败",
        icon: "none",
      });
    }
  };

  // 获取用户信息
  getUserInfo = async () => {
    try {
      // 获取用户信息
      const userInfo = await Taro.getUserInfo({
        lang: "zh_CN",
      });

      // 存储到全局状态
      this.props.store.userStore.setUserInfo(userInfo.userInfo);

      // 获取用户详细信息
      await this.getUserProfile();
    } catch (error) {
      console.log("获取用户信息失败", error);
      Taro.showToast({
        title: "获取用户信息失败",
        icon: "none",
      });
    }
  };

  // 获取用户详细信息
  getUserProfile = async () => {
    try {
      const profileRes = await Taro.getUserProfile({
        desc: "用于完善用户资料",
      });

      // 存储到全局状态
      this.props.store.userStore.setUserProfile(profileRes.userInfo);
    } catch (error) {
      console.log("获取用户详细信息失败", error);
      Taro.showToast({
        title: "获取用户详细信息失败",
        icon: "none",
      });
    }
  };

  // 获取手机号码
  handleGetPhoneNumber = (e) => {
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      // 解密手机号需要在服务端进行
      // 这里模拟一下
      this.props.store.userStore.setPhoneNumber("1380013xxxx");

      // 提示成功
      Taro.atMessage({
        type: "success",
        message: "手机号获取成功",
      });
    } else {
      Taro.atMessage({
        type: "error",
        message: "获取手机号失败",
      });
    }
  };

  // 处理扫码
  handleScan = () => {
    Taro.scanCode({
      success: (res) => {
        console.log("扫码结果：", res);
        // Taro.showModal({
        //   title: "扫码成功",
        //   content: `扫码结果：${res.result}`,
        //   showCancel: false,
        // });
        Taro.navigateTo({
          url: "/pages/playerInfo/index?userId=" + res.result,
        });
      },
      fail: () => {
        Taro.showToast({
          title: "扫码失败",
          icon: "none",
        });
      },
    });
  };

  render() {
    const { isLoggedIn } = this.state;
    const { userInfo } = this.props.store.userStore || {};

    return (
      <View className="index">
        <AtMessage />
        <View className="header-container">
          <Image className="header-logo" src={logoIcon} />
          <View className="header-title">吾知大空间</View>
        </View>
        <View className="content-container">
          <View className="content-scan-box" onClick={this.handleScan}>
            <Image className="content-scan-icon" src={scanQrCode} />
            <View className="content-scan-btn btn">扫描订单二维码</View>
          </View>
          <View className="content-history-btn btn">历史记录</View>
        </View>
      </View>
    );
  }
}

export default Index;
