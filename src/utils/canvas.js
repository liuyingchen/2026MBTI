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
    // 克隆元素以避免修改原始DOM
    const clone = element.cloneNode(true);
    
    // 强制应用必要的样式以确保正确渲染
    clone.style.position = 'fixed';
    clone.style.left = '-9999px';
    clone.style.top = '-9999px';
    clone.style.margin = '0';
    clone.style.padding = '32px';
    clone.style.width = '375px';
    clone.style.height = '450px';
    clone.style.boxSizing = 'border-box';
    clone.style.borderRadius = '16px';
    clone.style.display = 'flex';
    clone.style.flexDirection = 'column';
    clone.style.justifyContent = 'center';
    clone.style.alignItems = 'center';
    clone.style.textAlign = 'center';
    clone.style.color = 'white';
    
    // 临时添加到 DOM 中
    document.body.appendChild(clone);
    
    // 强制浏览器重新计算样式
    void clone.offsetHeight;
    
    try {
      const canvas = await html2canvas(clone, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: 375,
        height: 450,
        logging: false,
        imageTimeout: 0,  // 禁用图片超时
        ignoreElements: (el) => false, // 不忽略任何元素
        ...options
      });

      return canvas.toDataURL("image/png");
    } finally {
      // 移除临时克隆元素
      document.body.removeChild(clone);
    }
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
