import Taro from "@tarojs/taro";

interface RequestOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  header?: any;
}

// let BASE_URL = "https://hub.innomix.cn";
let BASE_URL = "https://hub.omnix.ltd";
try {
  const accountInfo = Taro.getAccountInfoSync && Taro.getAccountInfoSync();
  const envVersion = accountInfo?.miniProgram?.envVersion;
  console.log("envVersion", envVersion);
  if (envVersion === "develop" || envVersion === "trial") {
    // BASE_URL = "https://hub-pre.innomix.cn";
    BASE_URL = "https://hub-pre.omnix.ltd";
  }
} catch (e) {
  // 非小程序环境或 getAccountInfoSync 不可用，默认用正式地址
}

export const request = async (options: RequestOptions) => {
  const { url, method = "GET", data, header = {} } = options;

  try {
    const token = Taro.getStorageSync("token");
    const defaultHeader = {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      // ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await Taro.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: {
        ...defaultHeader,
        ...header,
      },
    });

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return response.data;
    } else {
      throw new Error(response.data.message || "请求失败");
    }
  } catch (error) {
    console.error("请求错误:", error);
    throw error;
  }
};

// 登录接口
export const login = async (code: string) => {
  return request({
    url: "/admin/token/getToken",
    method: "POST",
    data: {
      jsCode: code,
      clientId: "wccc841275405911f099bf00163e04e71b",
      clientSecret:
        "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
      grantType: "wechat",
    },
  });
};

// 获取玩家信息接口

export const getPlayerInfo = async (userId?: string) => {
  return request({
    url: userId
      ? `/control/game/search/user/info?qrCode=${userId}`
      : "/admin/api/user/info",
    method: "GET",
  });
};

// 保存用户信息接口
export const savePlayerInfo = async (data: any) => {
  return request({
    url: "/control/game/user/info/save",
    method: "POST",
    data,
  });
};

// 获取玩家图片接口
// export const getPlayerPhotos = async (userId: string) => {
//   return request({
//     url: `/game/user/photos?userId=${userId}`,
//     method: "GET",
//   });
// };
