import { Component } from "react";
import { View, Button, Text, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import { AtButton, AtMessage } from "taro-ui";

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

  componentDidMount() {
    // 检查是否支持getUserProfile API
    if (Taro.canIUse("getUserProfile")) {
      this.setState({
        canIUseGetUserProfile: true,
      });
    }

    // 检查是否已登录
    Taro.checkSession({
      success: () => {
        const userInfo = Taro.getStorageSync("userInfo");
        if (userInfo) {
          this.props.store.userStore.setUserInfo(userInfo);
          this.setState({ isLoggedIn: true });
        }
      },
    });
  }

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

  render() {
    const { isLoggedIn } = this.state;
    const { userInfo } = this.props.store.userStore || {};

    return (
      <View className="index">
        <AtMessage />

        <View className="logo-container">
          <Image
            className="logo"
            src="https://img.icons8.com/color/96/000000/basketball-player.png"
          />
          <Text className="title">大空间玩家</Text>
        </View>

        {!isLoggedIn ? (
          <View className="login-container">
            <Text className="welcome-text">欢迎使用大空间玩家小程序</Text>
            <AtButton
              type="primary"
              className="login-btn"
              onClick={this.handleGetUserProfile}
            >
              微信登录
            </AtButton>
          </View>
        ) : (
          <View className="logged-container">
            <View className="user-info">
              <Image className="avatar" src={userInfo.avatarUrl} />
              <Text className="nickname">{userInfo.nickName}</Text>
            </View>

            <AtButton
              type="primary"
              className="phone-btn"
              openType="getPhoneNumber"
              onGetPhoneNumber={this.handleGetPhoneNumber}
            >
              获取手机号
            </AtButton>

            <AtButton
              type="secondary"
              className="edit-info-btn"
              onClick={() => {
                Taro.navigateTo({
                  url: "/pages/userInfo/index",
                });
              }}
            >
              编辑个人信息
            </AtButton>
          </View>
        )}
      </View>
    );
  }
}

export default Index;
