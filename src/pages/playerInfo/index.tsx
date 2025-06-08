import { Component } from "react";
import { View, Text, Image, Picker } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import {
  AtInput,
  AtButton,
  AtRadio,
  AtMessage,
  AtForm,
  AtList,
  AtListItem,
} from "taro-ui";
import generateNickname from "../../utils";

import "./index.less";

// 角色数据
const ROLES = [
  {
    value: "point_guard",
    label: "控球后卫",
    avatar: "https://img.icons8.com/color/96/000000/basketball-player.png",
  },
  {
    value: "shooting_guard",
    label: "得分后卫",
    avatar: "https://img.icons8.com/color/96/000000/basketball-player.png",
  },
  {
    value: "small_forward",
    label: "小前锋",
    avatar: "https://img.icons8.com/color/96/000000/basketball-player.png",
  },
  {
    value: "power_forward",
    label: "大前锋",
    avatar: "https://img.icons8.com/color/96/000000/basketball-player.png",
  },
  {
    value: "center",
    label: "中锋",
    avatar: "https://img.icons8.com/color/96/000000/basketball-player.png",
  },
];

type PageStateProps = {
  store: {
    userStore: {
      userInfo: any;
      userProfile: any;
      updateUserProfile: Function;
    };
  };
};

interface PlayerInfoState {
  nickName: string;
  sexCode: number;
  height: number;
  age: number;
}

interface PlayerInfoProps extends PageStateProps {}

@inject("store")
@observer
class PlayerInfo extends Component<PlayerInfoProps, PlayerInfoState> {
  state: PlayerInfoState = {
    nickName: "",
    sexCode: 1,
    height: 0,
    age: 1,
  };

  componentDidMount() {
    // 从store获取已有信息
    const { userProfile } = this.props.store.userStore;
    if (userProfile) {
      this.setState({
        nickName: userProfile.nickName || "",
        sexCode: userProfile.sexCode || 1,
        height: userProfile.height || "",
        age: userProfile.age || 1,
      });
    }
  }

  handleNicknameChange = (value: string): void => {
    this.setState({
      nickName: value,
    });
  };

  handleSexCodeChange = (value: number) => {
    this.setState({ sexCode: value });
  };

  handleHeightChange = (value: number): void => {
    this.setState({
      height: Number(value),
    });
  };

  handleAgeChange = (value: number) => {
    this.setState({ age: value });
  };

  // 生成昵称
  handleAutoGenerateNickname = () => {
    const nickname = generateNickname();
    this.setState({
      nickName: nickname,
    });
  };

  handleUploadInfo = () => {
    const { nickName, sexCode, height, age } = this.state;

    if (!nickName) {
      Taro.atMessage({
        type: "error",
        message: "请输入昵称",
      });
      return;
    }
    if (!height) {
      Taro.atMessage({
        type: "error",
        message: "请输入身高",
      });
      return;
    }

    console.log("保存的信息：", { nickName, sexCode, height, age });

    Taro.atMessage({
      type: "success",
      message: "信息保存成功",
    });
  };

  render() {
    const { nickName, sexCode, height, age } = this.state;

    return (
      <View className="player-info-page">
        <AtMessage />

        <View className="header-container">
          <View className="header-title">玩家信息</View>
          <View className="header-subtitle">完善信息开启游戏之旅</View>
        </View>

        <View className="player-info-container">
          <AtForm>
            <AtInput
              name="nickName"
              title="昵称"
              type="text"
              placeholder="请输入昵称"
              value={nickName}
              onChange={this.handleNicknameChange.bind(this, "value")}
            >
              <AtButton size="small" onClick={this.handleAutoGenerateNickname}>
                生成昵称
              </AtButton>
            </AtInput>
            <AtInput
              name="height"
              title="身高"
              type="number"
              placeholder="请输入身高"
              value={height.toString()}
              onChange={(e) => {
                this.handleHeightChange(Number(e));
              }}
            >
              <View>厘米</View>
            </AtInput>
            <View className="radio-title">
              <View className="radio-title-icon"></View>
              <View className="radio-title-text">选择性别</View>
            </View>
            <AtRadio
              options={[
                { label: "男", value: 1 },
                { label: "女", value: 2 },
                { label: "未知", value: 3 },
              ]}
              value={sexCode}
              onClick={(value) => {
                console.log("选择性别change", value);
                this.handleSexCodeChange(value);
              }}
            />
            <View className="radio-title">
              <View className="radio-title-icon"></View>
              <View className="radio-title-text">年龄段</View>
            </View>
            <AtRadio
              options={[
                { label: "儿童", value: 1 },
                { label: "成人", value: 2 },
              ]}
              value={age}
              onClick={(value) => {
                console.log("选择年龄change", value);
                this.handleAgeChange(value);
              }}
            />
          </AtForm>
        </View>

        <View className="save-button-container">
          <View className="save-button" onClick={this.handleUploadInfo}>
            保存信息
          </View>
        </View>
      </View>
    );
  }
}

export default PlayerInfo;
