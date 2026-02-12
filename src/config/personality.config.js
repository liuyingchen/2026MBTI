/**
 * 人格配置文件 - 可灵活修改
 * 根据用户的 4 个答案（A/B 组合）映射到 4 种人格
 */

export const PERSONALITY_MAP = {
  // 4 个 A - 吐槽弹幕机
  "AAAA": {
    name: "Commentary Maestro",
    nameZh: "吐槽弹幕机",
    emoji: "🎤",
    description: "活跃的吐槽大师，每一刻都是段子手。你的弹幕永远最犀利，评论永远最逗趣！",
    bestWishes:
      "May your comments always be spicy, and luck always catches you off guard! 🎯",
    color: "#FF6B6B",
    bgGradient: "from-red-500 to-pink-500"
  },

  // 4 个 B - 气氛组组长
  "BBBB": {
    name: "Vibes Captain",
    nameZh: "气氛组组长",
    emoji: "🏆",
    description:
      "天生的气氛组长，让聚会永远闪闪发光。你是朋友圈的焦点，快乐的源头！",
    bestWishes:
      "May you bring joy to every gathering, and happiness follows you always! ✨",
    color: "#FFD700",
    bgGradient: "from-yellow-400 to-orange-400"
  },

  // 多数 A，特别是第 3 题选 A - 红包雷达
  "AAAB": {
    name: "Fortune Radar",
    nameZh: "红包雷达",
    emoji: "💰",
    description:
      "天生敏锐的红包猎手，运气爆表。你的第六感堪称一绝，财运滚滚来！",
    bestWishes:
      "May your radar always find fortune, and luck doubles every day! 💎",
    color: "#00C9A7",
    bgGradient: "from-green-400 to-emerald-500"
  },

  // 混合型偏 B - 瓜子嗑学家
  "ABBB": {
    name: "Gourmet Scholar",
    nameZh: "瓜子嗑学家",
    emoji: "🧠",
    description:
      "优雅的品鉴家，生活的细节大师。你对一切事物都有独特见解，品味超群！",
    bestWishes:
      "May your refined taste bring you elegance, and wisdom guide your path! 🌟",
    color: "#9D4EDD",
    bgGradient: "from-purple-500 to-pink-500"
  },

  // 其他混合型配置（根据需要自行补充）
  "AABB": {
    name: "Balanced Soul",
    nameZh: "平衡大师",
    emoji: "⚖️",
    description:
      "既能吐槽又能享受，既机敏又优雅。你是生活的调和者，完美的平衡者！",
    bestWishes:
      "May balance bring you peace, and harmony guide your every step! 🌈",
    color: "#00B4D8",
    bgGradient: "from-blue-400 to-cyan-400"
  },

  "ABAB": {
    name: "Dynamic Thinker",
    nameZh: "灵活思考者",
    emoji: "🌀",
    description: "思维敏捷，行动自如。你在不同场景间切换自如，适应力超强！",
    bestWishes:
      "May your flexibility unlock infinite possibilities! 🎪",
    color: "#FF006E",
    bgGradient: "from-pink-500 to-rose-500"
  },

  "BABA": {
    name: "Wise Observer",
    nameZh: "智慧观察者",
    emoji: "🔮",
    description: "低调却有洞察力，享受却不失分寸。你是生活的哲学家！",
    bestWishes:
      "May wisdom illuminate your path, and insight lead you forward! 💫",
    color: "#3A86FF",
    bgGradient: "from-indigo-500 to-blue-500"
  },

  "BAAA": {
    name: "Wild Spirit",
    nameZh: "野性精灵",
    emoji: "🔥",
    description: "大多时候热情似火，偶尔优雅从容。你是热血与智慧的完美结合！",
    bestWishes:
      "May your spirit burn bright, and passion drive your dreams! 🚀",
    color: "#FF8C42",
    bgGradient: "from-orange-500 to-red-400"
  },

  "BBBA": {
    name: "Graceful Spark",
    nameZh: "优雅火花",
    emoji: "✨",
    description: "通常温和有品，偶尔也会犀利一回。你是温度与风度的化身！",
    bestWishes:
      "May grace and spark define your journey! 🌺",
    color: "#FB5607",
    bgGradient: "from-amber-400 to-orange-500"
  },

  "AABA": {
    name: "Quirky Charm",
    nameZh: "古灵精怪",
    emoji: "😜",
    description: "三分吐槽，三分敏锐，三分优雅，一分神秘。你充满魅力！",
    bestWishes:
      "May your charm enchant everyone around you! 🎭",
    color: "#6A4C93",
    bgGradient: "from-violet-500 to-purple-500"
  },

  "ABAA": {
    name: "Clever Soul",
    nameZh: "聪慧之心",
    emoji: "💡",
    description: "聪慧机敏，懂得享受。你的生活充满了巧妙的小惊喜！",
    bestWishes:
      "May cleverness pave your path to success! 🎯",
    color: "#F72585",
    bgGradient: "from-pink-600 to-red-500"
  },

  "ABBA": {
    name: "Zen Master",
    nameZh: "禅意大师",
    emoji: "🧘",
    description: "亦动亦静，亦张亦弛。你懂得生活的真谛！",
    bestWishes:
      "May tranquility and joy coexist in your world! ☮️",
    color: "#06A77D",
    bgGradient: "from-teal-400 to-green-500"
  }
};

/**
 * 根据答案数组计算人格类型
 * @param {string[]} answers - 答案数组，如 ["A", "A", "B", "A"]
 * @returns {object} 人格对象
 */
export function calculatePersonality(answers) {
  const answerKey = answers.join("");
  
  // 如果有精确匹配，返回对应的人格
  if (PERSONALITY_MAP[answerKey]) {
    return PERSONALITY_MAP[answerKey];
  }

  // 如果没有精确匹配，使用简单的统计策略
  const aCount = answers.filter((a) => a === "A").length;
  const bCount = answers.filter((a) => a === "B").length;

  // 默认根据主要倾向返回
  if (aCount > bCount) {
    return PERSONALITY_MAP["AAAA"]; // 倾向吐槽弹幕机
  } else if (bCount > aCount) {
    return PERSONALITY_MAP["BBBB"]; // 倾向气氛组组长
  } else {
    return PERSONALITY_MAP["AABB"]; // 平衡大师
  }
}

export default PERSONALITY_MAP;
