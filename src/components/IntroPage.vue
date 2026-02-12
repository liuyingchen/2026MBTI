<template>
  <div class="intro-page">
    <!-- 背景装饰 - 喜庆的红金搭配 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-15 bg-red-600"
      ></div>
      <div
        class="absolute top-1/4 right-0 w-80 h-80 rounded-full blur-3xl opacity-12 bg-yellow-400"
      ></div>
      <div
        class="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 bg-red-500"
      ></div>
    </div>

    <!-- 返回按钮 -->
    <button
      @click="goBack"
      class="absolute top-6 left-6 z-50 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
      aria-label="Go back"
    >
      <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- 内容区域 -->
    <div class="relative flex flex-col items-center min-h-screen px-6 py-12 md:py-16 lg:py-20">
      <!-- 顶部空间 - 1/3 处 -->
      <div class="flex-[0.35]"></div>

      <!-- 标题区域 -->
      <div class="text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-20 md:mb-28 lg:mb-32">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">
            Just 4 easy questions
          </span>
        </h2>
        <p class="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 lg:mb-10 max-w-lg">
          Get your personality card & best wishes for the New Year
        </p>

        <!-- 图标说明 -->
        <div class="grid grid-cols-4 gap-4 max-w-lg mx-auto">
          <div class="flex flex-col items-center">
            <span class="text-3xl mb-2">📋</span>
            <span class="text-xs text-gray-500">Questions</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-3xl mb-2">⚡</span>
            <span class="text-xs text-gray-500">Quick</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-3xl mb-2">🎁</span>
            <span class="text-xs text-gray-500">Result</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-3xl mb-2">📲</span>
            <span class="text-xs text-gray-500">Share</span>
          </div>
        </div>
      </div>

      <!-- 中间间隔 - 到 1/2 处 -->
      <div class="flex-[0.5]"></div>

      <!-- 按钮和底部提示组 -->
      <div class="flex flex-col items-center gap-6 md:gap-8 lg:gap-10 mb-8 md:mb-10 lg:mb-12">
        <!-- 开始按钮 -->
        <button
          @click="continueToQuiz"
          class="relative px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-bold text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95 intro-btn"
        >
          Let's Go
          <span class="ml-2">✨</span>
        </button>

        <!-- 底部进度提示 -->
        <p class="text-xs md:text-sm text-gray-400 text-center">
          Only takes about 30 seconds
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
      .intro-btn {
        background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
        box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
      }

      @media (max-width: 768px) {
        .intro-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      }
    </style>

<script setup>
const emit = defineEmits(["continue", "back"]);

const continueToQuiz = () => {
  emit("continue");
};

const goBack = () => {
  emit("back");
};
</script>
