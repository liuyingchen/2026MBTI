<template>
  <div class="result-page">
    <!-- 背景图片 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none bg-cover bg-center" style="background-image: url('/images/result-bg.jpg');"></div>

    <!-- 内容区域 -->
    <div class="relative flex flex-col items-center min-h-screen px-6 py-12 md:py-16 lg:py-20">
      <!-- 顶部空间 -->
      <div class="flex-[0.20]"></div>

      <!-- 卡片内容区域 -->
      <div class="flex flex-col items-center justify-center flex-[0.65] w-full">
        <!-- 结果卡片容器 - 只显示角色图片 -->
        <div
          ref="cardElement"
          class="w-full rounded-2xl result-card overflow-hidden"
          :style="{ maxWidth: '360px', aspectRatio: '3 / 4' }"
        >
          <!-- 角色图片 -->
          <img 
            :src="characterImage" 
            :alt="character.chineseName"
            class="w-full h-full object-cover"
          />

          <!-- 隐藏的分享文本 -->
          <div class="hidden">
            <p>{{ character.name }} - {{ character.chineseName }}</p>
          </div>
        </div>
      </div>

      <!-- 底部空间 - 包含分享按钮组 -->
      <div class="flex flex-col items-center justify-start flex-[0.15] w-full gap-3">
        <!-- 保存和分享按钮一行 -->
        <div class="flex gap-3 w-full max-w-md">
          <!-- 保存卡片按钮 -->
          <button
            @click="saveCardImage"
            :disabled="isGenerating"
            class="flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed save-btn"
          >
            <span v-if="isGenerating">⏳ Generating...</span>
            <span v-else>💾 Save</span>
          </button>

          <!-- 国际分享按钮 -->
          <button
            @click="shareOnTwitter"
            class="flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 share-btn"
            title="Share on Twitter"
          >
            𝕏
          </button>
          <button
            @click="shareOnFacebook"
            class="flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 share-btn"
            title="Share on Facebook"
          >
            📘
          </button>
          <button
            @click="shareOnWhatsApp"
            class="flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 share-btn"
            title="Share on WhatsApp"
          >
            💬
          </button>
        </div>

        <!-- 重新测试按钮 -->
        <button
          @click="restartQuiz"
          class="w-full py-3 px-6 rounded-xl font-light transition-all duration-300 hover:scale-105 active:scale-95 retake-btn max-w-md"
        >
          Retake Quiz
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
    background: linear-gradient(135deg, rgba(255, 240, 153, 0.75) 0%, rgba(255, 253, 208, 0.75) 100%);
    color: #8b0000;
    font-weight: 700;
    box-shadow: 0 6px 15px rgba(255, 215, 0, 0.25);
    animation: pulse-glow 2s ease-in-out infinite;
  }

  .share-btn {
    background: linear-gradient(135deg, rgba(255, 240, 153, 0.75) 0%, rgba(255, 253, 208, 0.75) 100%);
    color: #8b0000;
    font-weight: 700;
    box-shadow: 0 6px 15px rgba(255, 215, 0, 0.25);
    animation: pulse-glow 2s ease-in-out infinite;
  }

  @keyframes pulse-glow {
    0%,
    100% {
      box-shadow: 0 6px 15px rgba(255, 215, 0, 0.25),
        0 0 10px rgba(255, 215, 0, 0.3);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 10px 25px rgba(255, 215, 0, 0.35),
        0 0 15px rgba(255, 215, 0, 0.45);
      transform: scale(1.02);
    }
  }

  .retake-btn {
    background: transparent;
    color: #000;
    border: 2px solid #000;
    box-shadow: none;
  }
  
  .retake-btn:hover {
    color: #333;
    border-color: #333;
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
import { getCharacterByAnswers, getCharacterImage } from "../config/character.config.js";

const emit = defineEmits(["restart"]);

const props = defineProps({
  personality: {
    type: Object,
    required: true
  },
  answers: {
    type: Array,
    required: true,
    default: () => []
  }
});

const cardElement = ref(null);
const showShareModal = ref(false);
const isGenerating = ref(false);
const generatedImageUrl = ref(null);

// 根据答案获取对应的角色
const character = computed(() => {
  return getCharacterByAnswers(props.answers);
});

// 角色图片
const characterImage = computed(() => {
  return getCharacterImage(props.answers);
});

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

const getCardStyle = () => {
  // 根据人格类型返回直接的渐变样式，确保 html2canvas 能正确捕获
  const gradients = {
    "#FF6B6B": "linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)",
    "#FFD700": "linear-gradient(135deg, #ffd700 0%, #ffa500 100%)",
    "#00C9A7": "linear-gradient(135deg, #00c9a7 0%, #00a885 100%)",
    "#9D4EDD": "linear-gradient(135deg, #9d4edd 0%, #c77dff 100%)"
  };
  
  const color = props.personality.color || "#667eea";
  const gradient = gradients[color] || gradients["#9D4EDD"];
  
  return {
    background: gradient,
    maxWidth: "375px",
    aspectRatio: "375 / 450"
  };
};

const saveCardImage = async () => {
  // 直接使用角色图片，无需生成卡片
  generatedImageUrl.value = characterImage.value;

  if (isMobile.value) {
    showShareModal.value = true;
  } else {
    downloadImage(characterImage.value, "2026-gala-mbti.png");
  }
};

const shareOnTwitter = () => {
  const url = window.location.href;
  const text = `I'm ${character.value.name} (${character.value.chineseName}) in Your 2026 Gala MBTI! 🎉`;
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
  const text = `I'm ${character.value.name} (${character.value.chineseName}) in Your 2026 Gala MBTI! 🎉 ${url}`;
  const shareUrl = generateWhatsAppShareLink(text);
  openShareWindow(shareUrl, "WhatsApp Share");
};

const restartQuiz = () => {
  emit("restart");
};
</script>
