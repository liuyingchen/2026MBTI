<template>
  <div class="share-modal-overlay" @click="closeModal">
    <div class="share-modal-content overflow-y-auto" @click.stop>
      <!-- 关闭按钮 -->
      <button
        @click="closeModal"
        class="absolute top-4 right-4 z-10 p-2 hover:bg-gray-200 rounded-full transition-colors"
      >
        ✕
      </button>

      <!-- 图片展示区域 -->
      <div class="mb-6">
        <img
          :src="imageDataUrl"
          alt="Generated Card"
          class="w-full max-w-sm rounded-xl shadow-lg"
        />
      </div>

      <!-- 提示文本 -->
      <div class="text-center mb-6">
        <p v-if="isMobile" class="text-lg font-semibold text-gray-800 mb-2">
          Long Press to Save
        </p>
        <p class="text-sm text-gray-600">
          {{ isMobile ? "长按图片保存到相册，分享到朋友圈" : "Click download button to save" }}
        </p>
      </div>

      <!-- PC 端下载按钮 -->
      <div v-if="!isMobile" class="flex gap-3">
        <button
          @click="downloadNow"
          class="flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
          style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        >
          📥 Download
        </button>
        <button
          @click="closeModal"
          class="flex-1 py-3 px-4 rounded-lg font-semibold text-gray-700 border-2 border-gray-300 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Close
        </button>
      </div>

      <!-- 手机端关闭提示 -->
      <div v-else class="text-center">
        <button
          @click="closeModal"
          class="py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
          style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { downloadImage } from "../utils/canvas.js";

defineProps({
  imageDataUrl: {
    type: String,
    required: true
  },
  isMobile: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const downloadNow = () => {
  downloadImage(imageDataUrl, "2026-gala-mbti.png");
  closeModal();
};
</script>

<style scoped>
.share-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);  /* 降低黑色遮罩透明度，从 0.5 改为 0.3，减少对图片的颜色影响 */
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 1000;
}

.share-modal-content {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modal-slide-up 0.3s ease-out;
}

@keyframes modal-slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .share-modal-content {
    padding: 20px;
  }
}
</style>
