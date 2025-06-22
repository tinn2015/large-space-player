import { Component } from "react";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { observer, inject } from "mobx-react";
import Taro from "@tarojs/taro";
import { AtMessage } from "taro-ui";
import { getPlayerPhotos } from "../../utils/request";

import "./index.less";

type PageStateProps = {
  store: {
    userStore: {
      userInfo: any;
    };
  };
};

interface PlayerPhotosState {
  photos: Array<{
    id: string;
    url: string;
    timestamp: string;
    description?: string;
  }>;
  loading: boolean;
}

interface PlayerPhotosProps extends PageStateProps {}

@inject("store")
@observer
class PlayerPhotos extends Component<PlayerPhotosProps, PlayerPhotosState> {
  state: PlayerPhotosState = {
    photos: [],
    loading: true,
  };

  componentDidMount() {
    this.loadPlayerPhotos();
  }

  // 加载玩家图片
  loadPlayerPhotos = async () => {
    try {
      const router = Taro.getCurrentInstance();
      const params = router?.router?.params;
      const userId = params?.userId;

      if (!userId) {
        Taro.showToast({
          title: "缺少用户ID",
          icon: "none",
        });
        return;
      }

      const res = await getPlayerPhotos(userId);

      this.setState({
        photos: res.data,
        loading: false,
      });
    } catch (error) {
      console.error("加载玩家图片失败：", error);
      Taro.showToast({
        title: "加载图片失败",
        icon: "none",
      });
      this.setState({ loading: false });
    }
  };

  // 预览图片
  handlePreviewImage = (current: string) => {
    const { photos } = this.state;
    const urls = photos.map((photo) => photo.url);

    Taro.previewImage({
      current,
      urls,
    });
  };

  // 下载图片到相册
  handleDownloadImage = async (photo: any) => {
    try {
      Taro.showLoading({ title: "下载中..." });

      const res = await Taro.downloadFile({
        url: photo.url,
      });

      if (res.statusCode === 200) {
        await Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        });

        Taro.hideLoading();
        Taro.showToast({
          title: "保存成功",
          icon: "success",
        });
      }
    } catch (error) {
      Taro.hideLoading();
      console.error("下载图片失败：", error);
      Taro.showToast({
        title: "保存失败",
        icon: "none",
      });
    }
  };

  render() {
    const { userInfo } = this.props.store.userStore;
    const { photos, loading } = this.state;

    return (
      <View className="player-photos-page">
        <AtMessage />

        <View className="header-container">
          <View className="header-title">玩家相册</View>
          <View className="header-subtitle">
            {userInfo?.nickName || "未知玩家"} 的游戏精彩瞬间
          </View>
        </View>

        <View className="content-container">
          {loading ? (
            <View className="loading-container">
              <Text className="loading-text">加载中...</Text>
            </View>
          ) : (
            <ScrollView className="photos-scroll" scrollY>
              <View className="photos-grid">
                {photos.map((photo) => (
                  <View key={photo.id} className="photo-item">
                    <Image
                      className="photo-image"
                      src={photo.url}
                      mode="aspectFill"
                      onClick={() => this.handlePreviewImage(photo.url)}
                    />
                    <View className="photo-info">
                      <Text className="photo-description">
                        {photo.description}
                      </Text>
                      <Text className="photo-time">{photo.timestamp}</Text>
                    </View>
                    <View
                      className="download-btn"
                      onClick={() => this.handleDownloadImage(photo)}
                    >
                      下载
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}

export default PlayerPhotos;
