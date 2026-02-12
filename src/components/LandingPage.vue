<template>
  <div class="landing-page">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 bg-red-600"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 bg-yellow-400"
      ></div>
    </div>

    <!-- 内容区域 -->
    <div class="relative flex flex-col items-center min-h-screen px-6 py-12 md:py-16 lg:py-20">
      <!-- 顶部空间 - 1/3 处 -->
      <div class="flex-[0.35]"></div>

      <!-- 标题区域 -->
      <div class="text-center animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-bold mb-20 md:mb-28 lg:mb-32">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">
            Your 2026 Gala MBTI
          </span>
        </h1>
        <p class="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 lg:mb-10">
          Find Your Spring Festival Gala Personality
        </p>
        <p class="text-sm md:text-base text-gray-500 max-w-md">
          Just 4 easy questions.<br />
          Get your personality card & best wishes for the New Year.
        </p>
      </div>

      <!-- 中间间隔 - 到1/2处 -->
      <div class="flex-[0.5]"></div>

      <!-- 按钮和装饰组 -->
      <div class="flex flex-col items-center gap-6 md:gap-8 lg:gap-10 mb-8 md:mb-10 lg:mb-12">
        <!-- CTA 按钮 - 呼吸动效 -->
        <button
          @click="startQuiz"
          class="relative px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-bold text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cta-btn"
        >
          Start Quiz
          <span class="ml-2">→</span>
        </button>

        <!-- 装饰元素 -->
        <div class="flex gap-8 text-4xl animate-bounce">
          <span>🎉</span>
          <span>🧧</span>
          <span>🎆</span>
        </div>
      </div>

      <!-- 底部说明 -->
      <p class="text-xs md:text-sm text-gray-400 text-center max-w-sm">
        Fun • Shareable • No Data Collected
      </p>
    </div>
  </div>
</template>

<style scoped>
      @keyframes breathing {
        0%,
        100% {
          box-shadow: 0 10px 40px rgba(220, 20, 60, 0.4),
            0 0 20px rgba(220, 20, 60, 0.6);
          transform: scale(1);
        }
        50% {
          box-shadow: 0 20px 60px rgba(220, 20, 60, 0.6),
            0 0 30px rgba(220, 20, 60, 0.8);
          transform: scale(1.02);
        }
      }

      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in {
        animation: fade-in 0.8s ease-out;
      }

      .cta-btn {
        background: linear-gradient(135deg, #dc143c 0%, #ff6b6b 100%);
        animation: breathing 3s ease-in-out infinite;
      }

      @media (max-width: 768px) {
        .landing-page {
          min-height: 100vh;
        }
      }
    </style>

<script setup>
const emit = defineEmits(["start"]);

const startQuiz = () => {
  emit("start");
};
</script>
