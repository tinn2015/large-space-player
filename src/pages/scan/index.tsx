import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import { AtButton, AtMessage } from "taro-ui";

import "./index.less";

type PageStateProps = {
  store: {
    userStore: {
      userInfo: any;
    };
  };
};

interface ScanProps extends PageStateProps {}

@inject("store")
@observer
class Scan extends Component<ScanProps> {
  handleScan = () => {
    Taro.scanCode({
      success: (res) => {
        console.log("扫码结果：", res);

        // 显示扫码结果
        Taro.showModal({
          title: "扫码成功",
          content: `扫码结果：${res.result}`,
          confirmText: "前往登记",
          success: (modalRes) => {
            if (modalRes.confirm) {
              // 跳转到信息录入页面
              Taro.navigateTo({
                url: "/pages/userInfo/index",
              });
            }
          },
        });
      },
      fail: () => {
        Taro.atMessage({
          type: "error",
          message: "扫码失败",
        });
      },
    });
  };

  checkUserLogin = () => {
    // 判断是否已登录
    const { userInfo } = this.props.store.userStore;
    if (!userInfo) {
      Taro.showModal({
        title: "提示",
        content: "请先登录",
        confirmText: "去登录",
        success: (res) => {
          if (res.confirm) {
            Taro.switchTab({
              url: "/pages/index/index",
            });
          }
        },
      });
      return false;
    }
    return true;
  };

  render() {
    return (
      <View className="scan-page">
        <AtMessage />

        <View className="scan-header">
          <Text className="scan-title">扫码登记</Text>
          <Text className="scan-desc">扫描场馆二维码进行登记</Text>
        </View>

        <View className="scan-content">
          <Image className="scan-icon" src="assets/images/scan.png" />

          <Text className="scan-tip">点击下方按钮开始扫码</Text>

          {/* <AtButton
            type="primary"
            className="scan-btn"
            onClick={() => {
              if (this.checkUserLogin()) {
                this.handleScan();
              }
            }}
          >
            开始扫码
          </AtButton>

          <View className="scan-history">
            <Text className="history-title">最近扫码记录</Text>
            <View className="empty-history">
              <Text className="empty-text">暂无扫码记录</Text>
            </View>
          </View> */}
        </View>
      </View>
    );
  }
}

export default Scan;
