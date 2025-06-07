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
  height: number | string;
  age: number;
}

interface PlayerInfoProps extends PageStateProps {}

@inject("store")
@observer
class PlayerInfo extends Component<PlayerInfoProps, PlayerInfoState> {
  state: PlayerInfoState = {
    nickName: "",
    sexCode: 1,
    height: "",
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

  handleHeightChange = (value: string): void => {
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
    Taro.atMessage({
      type: "success",
      message: "昵称生成成功！",
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

        <View className="player-info-container">
          <AtForm className="form-item-bg">
            <View className="nickname-button-container">
              <AtButton
                type="primary"
                size="small"
                onClick={this.handleAutoGenerateNickname}
              >
                自动生成昵称
              </AtButton>
            </View>
            <AtInput
              className="form-item-bg"
              name="nickName"
              title="昵称"
              type="text"
              placeholder="请输入或者生成昵称"
              value={nickName}
              onChange={this.handleNicknameChange}
            />
            <View className="form-item-bg">
              <AtInput
                className="form-item-bg"
                name="height"
                title="身高"
                type="number"
                placeholder="请输入身高(cm)"
                value={height.toString()}
                onChange={this.handleHeightChange}
              />
              <Text className="input-suffix">cm</Text>
            </View>
            <View className="form-item-bg">
              <Text className="form-label">性别</Text>
              <AtRadio
                className="form-item-bg"
                options={[
                  { label: "男", value: 1 },
                  { label: "女", value: 2 },
                  { label: "未知", value: 3 },
                ]}
                value={sexCode}
                onClick={this.handleSexCodeChange}
              />
            </View>
            <View className="form-item-bg">
              <Text className="form-label">年龄段</Text>
              <AtRadio
                className="form-item-bg"
                options={[
                  { label: "成人", value: 1 },
                  { label: "儿童", value: 2 },
                ]}
                value={age}
                onClick={this.handleAgeChange}
              />
            </View>
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
