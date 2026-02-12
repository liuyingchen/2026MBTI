/**
 * 全局音频管理器
 * 确保整个应用只有一个音频实例，避免重复播放
 */

class AudioManager {
  constructor() {
    this.audio = new Audio();
    this.audio.loop = true; // 循环播放
    this.currentSrc = null;
    this.isPlaying = false;
  }

  /**
   * 播放音频
   * @param {string} src - 音频文件路径
   */
  play(src) {
    // 如果已经在播放这个音乐，就不重复播放
    if (this.isPlaying && this.currentSrc === src) {
      return;
    }

    // 如果有其他音乐在播放，先停止
    if (this.isPlaying) {
      this.audio.pause();
    }

    // 加载新的音乐并播放
    this.audio.src = src;
    this.currentSrc = src;
    this.audio.play().catch((error) => {
      console.error('音乐播放失败:', error);
    });
    this.isPlaying = true;
  }

  /**
   * 停止音频播放
   */
  stop() {
    if (this.isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      this.currentSrc = null;
    }
  }

  /**
   * 暂停音频
   */
  pause() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  /**
   * 继续播放音频
   */
  resume() {
    if (!this.isPlaying && this.audio.src) {
      this.audio.play().catch((error) => {
        console.error('音乐继续播放失败:', error);
      });
      this.isPlaying = true;
    }
  }

  /**
   * 获取播放状态
   */
  getIsPlaying() {
    return this.isPlaying;
  }

  /**
   * 设置音量 (0-1)
   */
  setVolume(volume) {
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }
}

// 创建全局单例
const audioManager = new AudioManager();

export default audioManager;
