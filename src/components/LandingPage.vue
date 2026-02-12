<template>
  <div class="landing-page">
    <!-- 背景图片 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none bg-cover bg-center" style="background-image: url('/images/landing-bg.jpg');"></div>

    <!-- 春节装饰 - 闪烁星星 -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="star in 15" :key="`star-${star}`" class="floating-star" :style="{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${star * 0.3}s` }">
        ✨
      </div>
    </div>

    <!-- 漂浮的红包 -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
     <div v-for="envelope in 5" :key="`envelope-${envelope}`" class="falling-envelope" :style="{ left: `${envelope * 20}%`, animationDelay: `${envelope * 1}s` }">
        🧧
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="relative flex flex-col items-center min-h-screen px-6 py-12 md:py-16 lg:py-20">
      <!-- 顶部空间 -->
      <div class="flex-[0.20]"></div>

      <!-- 标题区域 -->
      <div class="text-center animate-fade-in">
        <p class="text-lg md:text-xl font-bold text-black tracking-wide">
          Find Your Spring Festival Gala Personality
        </p>
      </div>

      <!-- 中间间隔 -->
      <div class="flex-[0.20]"></div>

      <!-- 副标题区域 - 页面中间 -->
      <div class="text-center mb-16 md:mb-20 lg:mb-24">
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-20 md:mb-28 lg:mb-32 tracking-wide animate-title-pulse">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-600">
            Your 2026 Gala MBTI
          </span>
        </h1>
      </div>

      <!-- 中间间隔 - 到按钮处 -->
      <div class="flex-[0.20]"></div>

      <!-- 按钮组 -->
      <div class="flex flex-col items-center gap-6 md:gap-8 lg:gap-10 mb-8 md:mb-10 lg:mb-12">
        <!-- CTA 按钮 - 呼吸动效 -->
        <button
          @click="startQuiz"
          class="relative px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cta-btn animate-button-bounce"
        >
          <span class="animate-button-text">Start Quiz</span>
        </button>
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

      /* 标题脉冲动画 */
      @keyframes title-pulse {
        0% {
          opacity: 0;
          transform: scale(0.8);
        }
        50% {
          opacity: 1;
          transform: scale(1.02);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      .animate-title-pulse {
        animation: title-pulse 1.5s ease-out;
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
        animation: falling 3s linear infinite;
        filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
      }

      .falling-envelope {
        position: absolute;
        font-size: 2rem;
        animation: falling 3s linear infinite;
        filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
      }

      .cta-btn {
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
