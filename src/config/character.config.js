/**
 * 角色配置文件 - 4 个角色 + 16 种答案组合映射
 * 将 16 种答案组合自动映射到 qiqi、jiji、chichi、chengcheng 四个角色
 */

export const CHARACTER_LIST = {
  qiqi: {
    name: "Qiqi",
    chineseName: "七七",
    image: "/images/qiqi.jpg",
    color: "#FF6B6B",
    bgGradient: "from-red-500 to-pink-500"
  },
  jiji: {
    name: "Jiji",
    chineseName: "几几",
    image: "/images/jiji.jpg",
    color: "#FFD700",
    bgGradient: "from-yellow-400 to-orange-400"
  },
  chichi: {
    name: "Chichi",
    chineseName: "赤赤",
    image: "/images/chichi.jpg",
    color: "#00C9A7",
    bgGradient: "from-green-400 to-emerald-500"
  },
  chengcheng: {
    name: "Chengcheng",
    chineseName: "橙橙",
    image: "/images/chengcheng.jpg",
    color: "#9D4EDD",
    bgGradient: "from-purple-500 to-pink-500"
  }
};

/**
 * 16 种答案组合到角色的映射
 * 自动生成映射：将每个答案组合的二进制转换分配给 4 个角色
 */
export const ANSWER_TO_CHARACTER_MAP = {
  "AAAA": "qiqi",     // 0b0000 = 0 → qiqi
  "AAAB": "qiqi",     // 0b0001 = 1 → qiqi
  "AABA": "qiqi",     // 0b0010 = 2 → qiqi
  "AABB": "qiqi",     // 0b0011 = 3 → qiqi
  "ABAA": "jiji",     // 0b0100 = 4 → jiji
  "ABAB": "jiji",     // 0b0101 = 5 → jiji
  "ABBA": "jiji",     // 0b0110 = 6 → jiji
  "ABBB": "jiji",     // 0b0111 = 7 → jiji
  "BAAA": "chichi",   // 0b1000 = 8 → chichi
  "BAAB": "chichi",   // 0b1001 = 9 → chichi
  "BABA": "chichi",   // 0b1010 = 10 → chichi
  "BABB": "chichi",   // 0b1011 = 11 → chichi
  "BBAA": "chengcheng", // 0b1100 = 12 → chengcheng
  "BBAB": "chengcheng", // 0b1101 = 13 → chengcheng
  "BBBA": "chengcheng", // 0b1110 = 14 → chengcheng
  "BBBB": "chengcheng"  // 0b1111 = 15 → chengcheng
};

/**
 * 根据答案获取对应的角色
 * @param {string[]} answers - 答案数组，如 ["A", "A", "B", "A"]
 * @returns {object} 角色对象，包含名称、图片、颜色等信息
 */
export function getCharacterByAnswers(answers) {
  const answerKey = answers.join("");
  const characterKey = ANSWER_TO_CHARACTER_MAP[answerKey] || "qiqi";
  return CHARACTER_LIST[characterKey];
}

/**
 * 获取角色图片 URL
 * @param {string[]} answers - 答案数组
 * @returns {string} 图片 URL
 */
export function getCharacterImage(answers) {
  const character = getCharacterByAnswers(answers);
  return character.image;
}

/**
 * 自动生成映射关系（如果需要自定义调整）
 * 默认均分方式：前 4 个组合→qiqi，中间 4 个→jiji，...
 */
export function generateAutomaticMapping() {
  const characters = ["qiqi", "jiji", "chichi", "chengcheng"];
  const answerCombinations = generateAllAnswerCombinations();
  const mapping = {};

  answerCombinations.forEach((combination, index) => {
    const characterIndex = Math.floor(index / 4); // 每 4 个分配给一个角色
    mapping[combination] = characters[characterIndex];
  });

  return mapping;
}

/**
 * 生成所有 16 种答案组合
 * @returns {string[]} 答案组合数组
 */
export function generateAllAnswerCombinations() {
  const combinations = [];
  for (let i = 0; i < 16; i++) {
    let combination = "";
    for (let j = 0; j < 4; j++) {
      combination += (i >> j) & 1 ? "B" : "A";
    }
    combinations.push(combination);
  }
  return combinations;
}

export default {
  CHARACTER_LIST,
  ANSWER_TO_CHARACTER_MAP,
  getCharacterByAnswers,
  getCharacterImage,
  generateAutomaticMapping,
  generateAllAnswerCombinations
};
