/**
 * 卡片样式配置文件 - 可灵活修改
 */

export const CARD_CONFIG = {
  // 卡片整体配置
  card: {
    maxWidth: "400px", // PC 端卡片最大宽度
    borderRadius: "12px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    padding: "32px 24px"
  },

  // 标题样式
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: "12px",
    textAlign: "center"
  },

  // 中文名称样式
  nameZh: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#666",
    marginBottom: "20px",
    textAlign: "center"
  },

  // Emoji 样式
  emoji: {
    fontSize: "64px",
    marginBottom: "16px",
    textAlign: "center"
  },

  // 描述文字样式
  description: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#333",
    marginBottom: "20px",
    textAlign: "center"
  },

  // Best Wishes 样式
  bestWishes: {
    fontSize: "13px",
    fontStyle: "italic",
    color: "#666",
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    textAlign: "center"
  },

  // 分享按钮样式
  button: {
    padding: "10px 16px",
    fontSize: "14px",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "none"
  },

  // 背景渐变（默认）
  bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
};

/**
 * 获取响应式的卡片宽度
 * 手机端：100vw - padding
 * PC 端：max-width: 400px
 */
export function getResponsiveCardWidth() {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768
      ? `calc(100vw - 32px)`
      : CARD_CONFIG.card.maxWidth;
  }
  return CARD_CONFIG.card.maxWidth;
}

export default CARD_CONFIG;
