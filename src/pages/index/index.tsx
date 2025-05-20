import { Component } from "react";
import { View, Button, Text, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import { AtButton, AtMessage } from "taro-ui";

// 引入图片资源
import scanQrCode from "../../assets/scan3.png";

import "./index.less";

type PageStateProps = {
  store: {
    userStore: {
      userInfo: any;
      setUserInfo: Function;
      phoneNumber: string;
      setPhoneNumber: Function;
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

  componentDidMount() {}

  // 使用getUserProfile获取用户信息（基础库 2.10.4 版本及以上）
  handleGetUserProfile = () => {
    if (this.state.canIUseGetUserProfile) {
      Taro.getUserProfile({
        desc: "用于完善用户资料",
        success: (res) => {
          this.handleLoginSuccess(res.userInfo);
        },
        fail: () => {
          Taro.atMessage({
            type: "error",
            message: "获取用户信息失败",
          });
        },
      });
    } else {
      // 兼容处理
      Taro.getUserInfo({
        success: (res) => {
          this.handleLoginSuccess(res.userInfo);
        },
        fail: () => {
          Taro.atMessage({
            type: "error",
            message: "获取用户信息失败",
          });
        },
      });
    }
  };

  // 处理登录成功
  handleLoginSuccess = (userInfo) => {
    this.props.store.userStore.setUserInfo(userInfo);
    Taro.setStorageSync("userInfo", userInfo);
    this.setState({ isLoggedIn: true });

    // 获取手机号按钮显示
    Taro.atMessage({
      type: "success",
      message: "登录成功",
    });
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
        Taro.showModal({
          title: "扫码成功",
          content: `扫码结果：${res.result}`,
          showCancel: false,
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

        <View className="scan-container">
          <View className="qr-box">
            <View className="qr-code">
              <Image className="qr-image" src={scanQrCode} />
            </View>
            <View className="scan-btn" onClick={this.handleScan}>
              扫描订单二维码
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
