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
  nickname: string;
  gender: string;
  height: string;
  role: string;
}

interface PlayerInfoProps extends PageStateProps {}

@inject("store")
@observer
class PlayerInfo extends Component<PlayerInfoProps, PlayerInfoState> {
  state: PlayerInfoState = {
    nickname: "",
    gender: "male",
    height: "180",
    role: "",
  };

  componentDidMount() {
    // 从store获取已有信息
    const { userProfile } = this.props.store.userStore;
    if (userProfile) {
      this.setState({
        nickname: userProfile.nickname || "",
        gender: userProfile.gender || "male",
        height: userProfile.height?.toString() || "180",
        role: userProfile.role || "",
      });
    }
  }
  onGetUserInfoEventDetail = (e) => {
    console.log("微信用户信息", e);
  };

  handleNicknameChange = (value: string): void => {
    this.setState({
      nickname: value,
    });
  };

  handleGenderChange = (value) => {
    this.setState({ gender: value });
  };

  handleHeightChange = (value: string): void => {
    this.setState({
      height: value,
    });
  };

  handleRoleChange = (role: string) => {
    this.setState({ role });
  };

  getWechatUserInfo = () => {
    Taro.getUserProfile({
      desc: "用于完善用户资料",
      success: (res) => {
        console.log("微信用户信息", res);
        this.setState({
          nickname: res.userInfo.nickName,
        });
      },
      fail: (err) => {
        console.log("微信用户信息失败", err);
      },
    });
  };

  // 生成昵称
  handleAutoGenerateNickname = () => {
    const nickname = generateNickname();

    // 更新状态
    this.setState({
      nickname,
    });

    // 显示提示
    Taro.atMessage({
      type: "success",
      message: "昵称生成成功！",
    });
  };

  handleUploadInfo = () => {
    const { nickname, gender, height, role } = this.state;

    // 验证数据
    // if (!nickname) {
    //   Taro.atMessage({
    //     type: "error",
    //     message: "请输入昵称",
    //   });
    //   return;
    // }

    // if (!role) {
    //   Taro.atMessage({
    //     type: "error",
    //     message: "请选择角色",
    //   });
    //   return;
    // }

    console.log(nickname, gender, height, role);

    Taro.atMessage({
      type: "success",
      message: "信息保存成功",
    });

    // 返回首页
    // setTimeout(() => {
    //   Taro.navigateBack();
    // }, 1500);
  };
  handleResetInfo = () => {
    this.setState({
      nickname: "",
      gender: "male",
      height: "180",
      role: "",
    });
  };

  renderRoles = () => {
    return (
      <View className="roles-section">
        <View className="section-title">选择角色</View>
        <View className="roles-container">
          {ROLES.map((role) => (
            <View
              key={role.value}
              className={`role-item ${
                this.state.role === role.value ? "role-selected" : ""
              }`}
              onClick={() => this.handleRoleChange(role.value)}
            >
              <View className="role-avatar-container">
                <Image
                  className="role-avatar"
                  src={role.avatar}
                  mode="aspectFit"
                />
              </View>
              <Text className="role-name">{role.label}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  render() {
    const { nickname, gender, height, role } = this.state;

    return (
      <View className="player-info-page">
        <AtMessage />

        <View className="page-header">
          <Text className="page-title">玩家信息</Text>
        </View>

        <View className="player-info-container">
          <AtForm className="form-item-bg">
            <View className="nickname-button-container">
              <AtButton
                type="primary"
                size="small"
                // openType="getUserInfo"
                onClick={this.getWechatUserInfo}
              >
                获取微信昵称
              </AtButton>
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
              name="nickname"
              title="昵称"
              type="text"
              placeholder="请输入或者生成昵称"
              value={nickname}
              onChange={this.handleNicknameChange}
            />
            <AtInput
              className="form-item-bg"
              name="height"
              title="身高"
              type="number"
              placeholder="请输入身高(cm)"
              value={this.state.height}
              onChange={this.handleHeightChange}
            />
            <AtRadio
              className="form-item-bg"
              options={[
                { label: "男", value: "male" },
                { label: "女", value: "female" },
              ]}
              value={this.state.gender}
              onClick={this.handleGenderChange}
            />
          </AtForm>
          {this.renderRoles()}
        </View>
        {/* 保存按钮 */}
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
