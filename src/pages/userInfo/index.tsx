import { Component } from "react";
import { View, Text, Picker } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import {
  AtForm,
  AtInput,
  AtRadio,
  AtButton,
  AtMessage,
  AtInputNumber,
} from "taro-ui";

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
      updateUserProfile: Function;
    };
  };
};

interface UserInfoProps extends PageStateProps {}

@inject("store")
@observer
class UserInfo extends Component<UserInfoProps> {
  state = {
    nickname: "",
    gender: "",
    height: "",
    weight: "",
    birthday: "",
    preferredPosition: "",
  };

  genderOptions = [
    { label: "男", value: "male" },
    { label: "女", value: "female" },
  ];

  positionOptions = [
    { label: "控球后卫", value: "PG" },
    { label: "得分后卫", value: "SG" },
    { label: "小前锋", value: "SF" },
    { label: "大前锋", value: "PF" },
    { label: "中锋", value: "C" },
  ];

  componentDidMount() {
    // 获取用户信息的存储数据
    const { userProfile } = this.props.store.userStore;

    // 设置状态
    this.setState({
      nickname: userProfile.nickname || "",
      gender: userProfile.gender || "",
      height: userProfile.height || "",
      weight: userProfile.weight || "",
      birthday: userProfile.birthday || "",
      preferredPosition: userProfile.preferredPosition || "",
    });
  }

  handleNicknameChange = (value) => {
    this.setState({
      nickname: value,
    });
    return value;
  };

  handleGenderChange = (value) => {
    this.setState({
      gender: value,
    });
  };

  handleHeightChange = (value) => {
    this.setState({
      height: value,
    });
    return value;
  };

  handleWeightChange = (value) => {
    this.setState({
      weight: value,
    });
    return value;
  };

  handleBirthdayChange = (e) => {
    this.setState({
      birthday: e.detail.value,
    });
  };

  handlePositionChange = (value) => {
    this.setState({
      preferredPosition: value,
    });
  };

  handleSubmit = () => {
    const { nickname, gender, height, weight, birthday, preferredPosition } =
      this.state;

    // 简单验证
    if (!nickname) {
      Taro.atMessage({
        type: "error",
        message: "请输入昵称",
      });
      return;
    }

    // 更新用户信息
    this.props.store.userStore.updateUserProfile({
      nickname,
      gender,
      height,
      weight,
      birthday,
      preferredPosition,
    });

    // 保存成功提示
    Taro.atMessage({
      type: "success",
      message: "信息保存成功",
    });

    // 跳转到我的页面
    setTimeout(() => {
      Taro.navigateTo({
        url: "/pages/my/index",
      });
    }, 1500);
  };

  render() {
    const { nickname, gender, height, weight, birthday, preferredPosition } =
      this.state;

    return (
      <View className="user-info-page">
        <AtMessage />
        <View className="page-header">
          <Text className="page-title">完善个人信息</Text>
          <Text className="page-subtitle">帮助我们为您提供更好的服务</Text>
        </View>

        <AtForm>
          <View className="form-item">
            <Text className="form-label">昵称</Text>
            <AtInput
              name="nickname"
              type="text"
              placeholder="请输入昵称"
              value={nickname}
              onChange={this.handleNicknameChange}
            />
          </View>

          <View className="form-item">
            <Text className="form-label">性别</Text>
            <AtRadio
              options={this.genderOptions}
              value={gender}
              onClick={this.handleGenderChange}
            />
          </View>

          <View className="form-item">
            <Text className="form-label">身高(cm)</Text>
            <AtInput
              name="height"
              type="number"
              placeholder="请输入身高"
              value={height}
              onChange={this.handleHeightChange}
            />
          </View>

          <View className="form-item">
            <Text className="form-label">体重(kg)</Text>
            <AtInput
              name="weight"
              type="number"
              placeholder="请输入体重"
              value={weight}
              onChange={this.handleWeightChange}
            />
          </View>

          <View className="form-item">
            <Text className="form-label">出生日期</Text>
            <Picker
              mode="date"
              onChange={this.handleBirthdayChange}
              value={birthday}
            >
              <View className="picker">{birthday || "请选择出生日期"}</View>
            </Picker>
          </View>

          <View className="form-item">
            <Text className="form-label">擅长位置</Text>
            <AtRadio
              options={this.positionOptions}
              value={preferredPosition}
              onClick={this.handlePositionChange}
            />
          </View>

          <AtButton
            type="primary"
            className="submit-btn"
            onClick={this.handleSubmit}
          >
            保存信息
          </AtButton>
        </AtForm>
      </View>
    );
  }
}

export default UserInfo;
