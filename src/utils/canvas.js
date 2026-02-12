/**
 * Canvas 图片生成工具函数
 */

import html2canvas from "html2canvas";

/**
 * 生成结果卡片图片
 * @param {HTMLElement} element - 要转换的 DOM 元素
 * @param {object} options - 配置选项
 * @returns {Promise<string>} base64 图片数据或 blob URL
 */
export async function generateCardImage(element, options = {}) {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: "#fff",
      scale: 2, // 高清晰度
      useCORS: true,
      allowTaint: true,
      ...options
    });

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Failed to generate image:", error);
    throw error;
  }
}

/**
 * 下载图片到本地（PC 端）
 * @param {string} dataUrl - 图片 base64 数据或 blob URL
 * @param {string} filename - 文件名
 */
export function downloadImage(dataUrl, filename = "2026-gala-mbti.png") {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 获取当前页面的完整 URL
 * @returns {string} 当前 URL
 */
export function getCurrentPageUrl() {
  if (typeof window !== "undefined") {
    return window.location.href;
  }
  return "";
}

/**
 * 生成分享海报的描述文本
 * @param {object} personality - 人格对象
 * @returns {string} 分享文本
 */
export function generateShareText(personality) {
  return `🎉 I'm the "${personality.name}" personality in Your 2026 Gala MBTI quiz! ${personality.emoji} 

"${personality.description}"

Join me to find your Spring Festival personality: ${getCurrentPageUrl()}`;
}

export default {
  generateCardImage,
  downloadImage,
  getCurrentPageUrl,
  generateShareText
};
