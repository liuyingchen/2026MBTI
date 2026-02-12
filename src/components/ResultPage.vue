<template>
  <div class="result-page">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20"
        :style="{ backgroundImage: getCardGradient() }"
      ></div>
    </div>

    <!-- 内容区域 -->
    <div class="relative flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <!-- 结果卡片容器 -->
      <div
        ref="cardElement"
        class="w-full max-w-md rounded-2xl p-8 md:p-10 text-center mb-8 result-card text-white"
        :class="getCardClass()"
      >
        <!-- Emoji -->
        <div class="text-7xl mb-4">{{ personality.emoji }}</div>

        <!-- 英文名称 -->
        <h2 class="text-3xl md:text-4xl font-bold mb-2">
          {{ personality.name }}
        </h2>

        <!-- 中文名称 -->
        <p class="text-lg md:text-xl font-semibold mb-6 opacity-90">
          {{ personality.nameZh }}
        </p>

        <!-- 描述 -->
        <p class="text-sm md:text-base leading-relaxed mb-6 opacity-95">
          {{ personality.description }}
        </p>

        <!-- Best Wishes -->
        <div class="border-t border-white border-opacity-30 pt-6 mt-6">
          <p class="text-xs md:text-sm italic opacity-90">
            "{{ personality.bestWishes }}"
          </p>
        </div>

        <!-- 隐藏的分享文本 -->
        <div class="hidden">
          <p>{{ personality.name }} - {{ personality.nameZh }}</p>
        </div>
      </div>

      <!-- 分享按钮组 -->
      <div class="flex flex-col gap-3 w-full max-w-md">
        <!-- 保存卡片按钮 -->
        <button
          @click="saveCardImage"
          :disabled="isGenerating"
          class="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed save-btn"
        >
          <span v-if="isGenerating">⏳ Generating...</span>
          <span v-else>💾 Save Card</span>
        </button>

        <!-- 国际分享按钮 -->
        <div class="grid grid-cols-3 gap-3">
          <button
            @click="shareOnTwitter"
            class="py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 twitter-btn"
            title="Share on Twitter"
          >
            𝕏
          </button>
          <button
            @click="shareOnFacebook"
            class="py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 facebook-btn"
            title="Share on Facebook"
          >
            📘
          </button>
          <button
            @click="shareOnWhatsApp"
            class="py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 whatsapp-btn"
            title="Share on WhatsApp"
          >
            💬
          </button>
        </div>

        <!-- 重新测试按钮 -->
        <button
          @click="restartQuiz"
          class="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 retake-btn"
        >
          🔄 Retake Quiz
        </button>
      </div>

      <!-- 分享 Modal -->
      <ShareModal
        v-if="showShareModal"
        :image-data-url="generatedImageUrl"
        :is-mobile="isMobile"
        @close="showShareModal = false"
      />
    </div>
  </div>
</template>

<style scoped>
  .result-card {
    animation: slide-up 0.8s ease-out;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .card-gradient-1 {
    background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
  }

  .card-gradient-2 {
    background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
  }

  .card-gradient-3 {
    background: linear-gradient(135deg, #00c9a7 0%, #00a885 100%);
  }

  .card-gradient-4 {
    background: linear-gradient(135deg, #9d4edd 0%, #c77dff 100%);
  }

  .save-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  }

  .twitter-btn {
    background: #1da1f2;
    box-shadow: 0 8px 24px rgba(29, 161, 242, 0.3);
  }

  .facebook-btn {
    background: #1877f2;
    box-shadow: 0 8px 24px rgba(24, 119, 242, 0.3);
  }

  .whatsapp-btn {
    background: #25d366;
    box-shadow: 0 8px 24px rgba(37, 211, 102, 0.3);
  }

  .retake-btn {
    background: #f0f0f0;
    color: #333;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @keyframes slide-up {
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
    .result-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  }
</style>

<script setup>
import { ref, computed } from "vue";
import ShareModal from "./ShareModal.vue";
import { generateCardImage, downloadImage } from "../utils/canvas.js";
import {
  generateTwitterShareLink,
  generateFacebookShareLink,
  generateWhatsAppShareLink,
  openShareWindow,
  detectDevice
} from "../utils/logic.js";

const emit = defineEmits(["restart"]);

const props = defineProps({
  personality: {
    type: Object,
    required: true
  }
});

const cardElement = ref(null);
const showShareModal = ref(false);
const isGenerating = ref(false);
const generatedImageUrl = ref(null);

const isMobile = computed(() => detectDevice() === "mobile");

const getCardClass = () => {
  const color = props.personality.color || "#667eea";
  if (color === "#FF6B6B") return "card-gradient-1";
  if (color === "#FFD700") return "card-gradient-2";
  if (color === "#00C9A7") return "card-gradient-3";
  return "card-gradient-4";
};

const getCardGradient = () => {
  const bgGradient = props.personality.bgGradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  return `linear-gradient(135deg, ${bgGradient})`;
};

const saveCardImage = async () => {
  if (!cardElement.value || isGenerating.value) return;

  isGenerating.value = true;

  try {
    const dataUrl = await generateCardImage(cardElement.value);
    generatedImageUrl.value = dataUrl;

    if (isMobile.value) {
      showShareModal.value = true;
    } else {
      downloadImage(dataUrl);
    }
  } catch (error) {
    console.error("Error generating image:", error);
    alert("Failed to generate image. Please try again.");
  } finally {
    isGenerating.value = false;
  }
};

const shareOnTwitter = () => {
  const url = window.location.href;
  const text = `I'm the "${props.personality.name}" personality in Your 2026 Gala MBTI! ${props.personality.emoji}`;
  const shareUrl = generateTwitterShareLink(text, url);
  openShareWindow(shareUrl, "Twitter Share");
};

const shareOnFacebook = () => {
  const url = window.location.href;
  const shareUrl = generateFacebookShareLink(url);
  openShareWindow(shareUrl, "Facebook Share");
};

const shareOnWhatsApp = () => {
  const url = window.location.href;
  const text = `I'm the "${props.personality.name}" personality in Your 2026 Gala MBTI! 🎉 ${url}`;
  const shareUrl = generateWhatsAppShareLink(text);
  openShareWindow(shareUrl, "WhatsApp Share");
};

const restartQuiz = () => {
  emit("restart");
};
</script>
