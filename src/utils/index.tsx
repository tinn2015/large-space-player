// 昵称生成器词库
const nicknameWords = {
  prefix: [
    "萌萌",
    "呆呆",
    "沙雕",
    "快乐",
    "悲伤",
    "狂气",
    "中二",
    "笨笨",
    "吃货",
    "肥宅",
    "废柴",
    "摸鱼",
    "摆烂",
    "躺平",
    "卷王",
    "佛系",
    "咸鱼",
    "傲娇",
    "病娇",
    "元气",
    "笨蛋",
    "卖萌",
    "闷骚",
    "腹黑",
    "天然",
    "三无",
    "蠢萌",
    "呆萌",
    "可爱",
    "二次元",
  ],

  middle: [
    "的",
    "家的",
    "系",
    "型",
    "风",
    "派",
    "式",
    "味",
    "气质",
    "系统",
    "属性",
    "进化",
    "觉醒",
    "时代",
    "物语",
    "日记",
    "传说",
    "之王",
    "大师",
    "精英",
  ],

  suffix: [
    "喵",
    "酱",
    "菌",
    "君",
    "酥",
    "仙",
    "兽",
    "狂",
    "姬",
    "子",
    "猫",
    "汪",
    "兔",
    "咩",
    "咕",
    "啾",
    "叽",
    "哒",
    "呜",
    "喵",
    "桑",
    "sama",
    "酱油",
    "前辈",
    "大人",
    "王",
    "神",
    "魔",
    "帝",
    "尊",
  ],

  object: [
    "小饼干",
    "布丁",
    "果冻",
    "蛋糕",
    "泡芙",
    "马卡龙",
    "奶茶",
    "可乐",
    "薯条",
    "汉堡",
    "寿司",
    "拉面",
    "炒面",
    "饭团",
    "章鱼丸",
    "蛋包饭",
    "三明治",
    "甜甜圈",
    "棒棒糖",
    "冰淇淋",
    "抹茶",
    "芝士",
    "巧克力",
    "蜜糖",
    "糯米糍",
    "蛋挞",
    "奶昔",
    "慕斯",
    "松饼",
    "蛋仔",
  ],

  adjective: [
    "沙雕",
    "可爱",
    "傲娇",
    "病娇",
    "元气",
    "笨蛋",
    "卖萌",
    "中二",
    "闷骚",
    "腹黑",
    "天然",
    "三无",
    "蠢萌",
    "呆萌",
    "高冷",
    "温柔",
    "治愈",
    "笨笨",
    "乖巧",
    "萌系",
    "电波",
    "迷糊",
    "慵懒",
    "活力",
    "元气",
    "软萌",
    "傻傻",
    "呆萌",
    "机智",
    "阳光",
  ],

  anime: [
    "魔法",
    "机甲",
    "剑士",
    "忍者",
    "巫女",
    "偶像",
    "勇者",
    "贤者",
    "骑士",
    "魔女",
    "召唤师",
    "死神",
    "恶魔",
    "天使",
    "精灵",
    "龙族",
    "妖精",
    "武士",
    "法师",
    "战士",
  ],

  color: [
    "粉粉",
    "蓝蓝",
    "白白",
    "黑黑",
    "红红",
    "紫紫",
    "绿绿",
    "橙橙",
    "金金",
    "银银",
    "彩彩",
    "灰灰",
    "棕棕",
    "黄黄",
    "青青",
    "靛靛",
    "浅浅",
    "深深",
    "亮亮",
    "暗暗",
    "霓虹",
    "星星",
    "月月",
    "雾雾",
    "雪雪",
    "玉玉",
    "珊瑚",
    "薄荷",
    "奶茶",
    "蜜桃",
    "莓莓",
    "葡萄",
    "柠檬",
    "抹茶",
    "巧克",
    "焦糖",
    "草莓",
    "香草",
    "咖啡",
    "奶油",
  ],

  emotion: [
    "开心",
    "伤心",
    "愤怒",
    "惊讶",
    "害羞",
    "困困",
    "兴奋",
    "无聊",
    "纠结",
    "懵懵",
  ],
};

// 从数组中随机选择一个元素
const getRandomElement = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const generateNickname = () => {
  const randomType = Math.floor(Math.random() * 5);
  let nickname = "";

  switch (randomType) {
    case 0:
      // 形容词 + 食物 + 后缀，例如："可爱布丁酱"
      nickname =
        getRandomElement(nicknameWords.adjective) +
        getRandomElement(nicknameWords.object) +
        getRandomElement(nicknameWords.suffix);
      break;
    case 1:
      // 前缀 + 中缀 + 后缀，例如："萌萌系喵"
      nickname =
        getRandomElement(nicknameWords.prefix) +
        getRandomElement(nicknameWords.middle) +
        getRandomElement(nicknameWords.suffix);
      break;
    case 2:
      // 颜色 + 动漫角色 + 后缀，例如："粉粉魔法使"
      nickname =
        getRandomElement(nicknameWords.color) +
        getRandomElement(nicknameWords.anime) +
        getRandomElement(nicknameWords.suffix);
      break;
    case 3:
      // 情感 + 前缀 + 后缀，例如："开心废柴酱"
      nickname =
        getRandomElement(nicknameWords.emotion) +
        getRandomElement(nicknameWords.prefix) +
        getRandomElement(nicknameWords.suffix);
      break;
    case 4:
      // 形容词 + 动漫角色 + 中缀，例如："可爱魔法使大人"
      nickname =
        getRandomElement(nicknameWords.adjective) +
        getRandomElement(nicknameWords.anime) +
        getRandomElement(nicknameWords.suffix);
      break;
  }

  return nickname;
};

export default generateNickname;
