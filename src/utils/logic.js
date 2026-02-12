/**
 * 业务逻辑工具函数
 */

import { calculatePersonality } from "../config/personality.config.js";

/**
 * 根据用户答案计算人格类型
 * @param {string[]} answers - 答案数组
 * @returns {object} 人格对象
 */
export function getPersonalityResult(answers) {
  return calculatePersonality(answers);
}

/**
 * 检测设备类型
 * @returns {string} 'mobile' 或 'desktop'
 */
export function detectDevice() {
  if (typeof window === "undefined") return "desktop";
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

/**
 * 生成分享链接 (Twitter)
 * @param {string} text - 分享文本
 * @param {string} url - 分享 URL
 * @returns {string} Twitter 分享链接
 */
export function generateTwitterShareLink(text, url) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
}

/**
 * 生成分享链接 (Facebook)
 * @param {string} url - 分享 URL
 * @returns {string} Facebook 分享链接
 */
export function generateFacebookShareLink(url) {
  const encodedUrl = encodeURIComponent(url);
  return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
}

/**
 * 生成分享链接 (WhatsApp)
 * @param {string} text - 分享文本
 * @returns {string} WhatsApp 分享链接
 */
export function generateWhatsAppShareLink(text) {
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/?text=${encodedText}`;
}

/**
 * 打开分享窗口
 * @param {string} url - 分享链接
 * @param {string} title - 窗口标题
 */
export function openShareWindow(url, title = "Share") {
  window.open(
    url,
    title,
    "width=600,height=400,menubar=no,toolbar=no,resizable=yes"
  );
}

export default {
  getPersonalityResult,
  detectDevice,
  generateTwitterShareLink,
  generateFacebookShareLink,
  generateWhatsAppShareLink,
  openShareWindow
};
