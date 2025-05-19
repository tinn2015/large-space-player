import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import { AtList, AtListItem, AtButton, AtMessage } from "taro-ui";

import "./index.less";

type PageStateProps = {
  store: {
    userStore: {
      userInfo: any;
      userProfile: {
        nickname: string;
        gender: string;
        height: string;
        weight: string;
        birthday: string;
        preferredPosition: string;
      };
      clearUserInfo: Function;
    };
  };
};

interface MyProps extends PageStateProps {}

@inject("store")
@observer
class My extends Component<MyProps> {
  navigateToUserInfo = () => {
    Taro.navigateTo({
      url: "/pages/userInfo/index",
    });
  };

  handleLogout = () => {
    Taro.showModal({
      title: "提示",
      content: "确定要退出登录吗？",
      success: (res) => {
        if (res.confirm) {
          // 清除用户信息
          this.props.store.userStore.clearUserInfo();

          // 清除本地存储
          Taro.removeStorageSync("userInfo");

          // 返回到登录页
          Taro.reLaunch({
            url: "/pages/index/index",
          });
        }
      },
    });
  };

  render() {
    const { userInfo } = this.props.store.userStore;
    const defaultAvatar = "https://img.icons8.com/color/96/000000/user.png";

    if (!userInfo) {
      // 如果没有用户信息，跳转到登录页
      Taro.redirectTo({
        url: "/pages/index/index",
      });
      return null;
    }

    return (
      <View className="my-page">
        <AtMessage />

        <View className="user-header">
          <Image className="avatar" src={userInfo.avatarUrl || defaultAvatar} />
          <Text className="nickname">{userInfo.nickName || "游客"}</Text>
        </View>

        <View className="card-section">
          <AtList>
            <AtListItem
              title="个人信息"
              arrow="right"
              onClick={this.navigateToUserInfo}
            />
            <AtListItem
              title="用户协议"
              arrow="right"
              onClick={() => {
                Taro.showToast({
                  title: "用户协议功能开发中",
                  icon: "none",
                });
              }}
            />
            <AtListItem
              title="隐私政策"
              arrow="right"
              onClick={() => {
                Taro.showToast({
                  title: "隐私政策功能开发中",
                  icon: "none",
                });
              }}
            />
            <AtListItem
              title="关于我们"
              arrow="right"
              onClick={() => {
                Taro.showToast({
                  title: "关于我们功能开发中",
                  icon: "none",
                });
              }}
            />
            <AtListItem
              title="联系客服"
              arrow="right"
              onClick={() => {
                Taro.showToast({
                  title: "联系客服功能开发中",
                  icon: "none",
                });
              }}
            />
          </AtList>
        </View>

        <AtButton
          type="secondary"
          className="logout-btn"
          onClick={this.handleLogout}
        >
          退出登录
        </AtButton>
      </View>
    );
  }
}

export default My;
