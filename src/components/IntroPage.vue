<template>
  <div class="intro-page">
    <!-- 背景图片 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none bg-cover bg-center" style="background-image: url('/images/intro-bg.jpg');"></div>

    <!-- 春节装饰 - 闪烁星星 -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="star in 15" :key="`star-${star}`" class="floating-star intro-star" :style="{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${star * 0.2}s` }">
        ✨
      </div>
    </div>

    <!-- 漂浮的灯笼 -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="lantern in 8" :key="`lantern-${lantern}`" class="falling-lantern intro-lantern" :style="{ left: `${lantern * 12.5}%`, animationDelay: `${lantern * 0.3}s` }">
        🏮
      </div>
    </div>

    <!-- 返回按钮 -->
    <button
      @click="goBack"
      class="absolute top-6 left-6 z-50 text-black hover:text-gray-600 transition-colors cursor-pointer"
      aria-label="Go back"
    >
      <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- 内容区域 -->
    <div class="relative flex flex-col items-center min-h-screen px-6 py-12 md:py-16 lg:py-20">
      <!-- 顶部空间 -->
      <div class="flex-[0.22]"></div>

      <!-- 标题区域 -->
      <div class="text-center animate-fade-in flex flex-col flex-[0.13] justify-between">
        <h2 class="text-4xl md:text-4xl font-bold tracking-wide" style="font-family: 'Playfair Display', 'Georgia', serif; font-weight: 700;">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-600">
            Just 4 easy questions
          </span>
        </h2>
        <p class="text-lg md:text-xl font-bold text-black tracking-wide max-w-lg">
          Get your personality card & best wishes for the New Year
        </p>
      </div>

      <!-- 中间间隔 -->
      <div class="flex-[0.55]"></div>

      <!-- 按钮组 -->
      <div class="flex flex-col items-center gap-6 md:gap-8 lg:gap-10 mb-8 md:mb-10 lg:mb-12">
        <!-- 开始按钮 -->
        <button
          @click="continueToQuiz"
          class="relative px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 intro-btn animate-button-bounce"
        >
          <span class="animate-button-text">Let's Go</span>
          <span class="ml-2">✨</span>
        </button>

        <!-- 底部进度提示 -->
        <p class="text-xs md:text-sm text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-400 text-center font-light">
          Only takes about 30 seconds
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

      .intro-btn {
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

      /* 闪烁星星动画 */
      @keyframes twinkle {
        0%, 100% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
      }

      .floating-star {
        position: absolute;
        font-size: 1.5rem;
        animation: twinkle 3s ease-in-out infinite;
        pointer-events: none;
      }

      .intro-star {
        animation: twinkle 2s ease-in-out infinite !important;
      }

      /* 漂浮灯笼动画 */
      @keyframes falling {
        0% {
          opacity: 1;
          transform: translateY(-100vh) rotateZ(0deg);
        }
        100% {
          opacity: 0.3;
          transform: translateY(100vh) rotateZ(360deg);
        }
      }

      .falling-lantern {
        position: absolute;
        font-size: 2rem;
        animation: falling 5s linear infinite;
        filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
      }

      .intro-lantern {
        animation: falling 3s linear infinite !important;
      }

      .falling-envelope {
        position: absolute;
        font-size: 2rem;
        animation: falling 5s linear infinite;
        filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
      }

      .intro-envelope {
        animation: falling 3s linear infinite !important;
      }

      /* 按钮弹跳动画 */
      @keyframes button-bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-8px);
        }
      }

      .animate-button-bounce {
        animation: button-bounce 1s ease-in-out infinite;
      }

      /* 按钮文字闪烁动画 */
      @keyframes button-text-glow {
        0%, 100% {
          text-shadow: 0 0 0px rgba(255, 215, 0, 0), 0 0 5px rgba(255, 215, 0, 0.3);
        }
        50% {
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5);
        }
      }

      .animate-button-text {
        display: inline-block;
        animation: button-text-glow 1.5s ease-in-out infinite;
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
