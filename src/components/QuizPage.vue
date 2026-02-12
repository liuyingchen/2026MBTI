<template>
  <div class="quiz-page">
    <!-- 背景图片 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none bg-cover bg-center" style="background-image: url('/images/quiz-bg.jpg');"></div>

    <!-- 春节装饰 - 闪烁星星 -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="star in 12" :key="`star-${star}`" class="quiz-star" :style="{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${star * 0.3}s` }">
        ✨
      </div>
    </div>

    <!-- 春节装饰 - 飘落金币 -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="coin in 6" :key="`coin-${coin}`" class="falling-coin" :style="{ left: `${coin * 16.67}%`, animationDelay: `${coin * 0.4}s` }">
        💰
      </div>
    </div>

    <!-- 春节装饰 - 舞动的绸带 -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="ribbon in 4" :key="`ribbon-${ribbon}`" class="swaying-ribbon" :style="{ left: `${ribbon * 25}%`, animationDelay: `${ribbon * 0.5}s` }">
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
    <div class="relative w-full h-screen flex flex-col">
      <!-- 顶部空间 (32.5%) -->
      <div class="flex-[0.325]"></div>

      <!-- 卡片区域 (35%) -->
      <div class="flex-[0.35] w-full px-4 md:px-6 lg:px-8 flex items-center justify-center">
        <!-- 金色卡片容器 - 支持滑动动画 -->
        <div class="w-full h-full perspective">
          <transition name="slide" mode="out-in">
            <div
              :key="currentIndex"
              class="w-full h-full gold-card rounded-3xl px-6 md:px-8 lg:px-12 py-8 md:py-12 flex flex-col justify-center items-center"
            >
              <!-- 问题文本 -->
              <h2 class="text-2xl md:text-2xl lg:text-3xl font-bold text-center text-black question-animate" style="font-family: 'Playfair Display', 'Georgia', serif; margin-bottom: 30px;">
                {{ currentQuestion.question }}
              </h2>

              <!-- 选项按钮容器 -->
              <div class="w-full" style="display: flex; flex-direction: column; gap: 10px;">
                <button
                  v-for="(option, idx) in currentQuestion.options"
                  :key="idx"
                  @click="selectOption(option.value)"
                  class="option-button w-full py-4 px-6 rounded-full font-semibold text-xl text-black transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm animate-fade-in-up"
                  :class="`${idx === 0 ? 'option-a' : 'option-b'}`"
                  :style="{ animationDelay: `${0.2 + idx * 0.15}s` }"
                >
                  {{ option.text }}
                </button>
              </div>

              <!-- 最小触控区域提示（手机端） -->
              <p class="text-xs text-yellow-700 mt-8 md:mt-12 text-center md:hidden">
                Tap to select
              </p>
            </div>
          </transition>
        </div>
      </div>

      <!-- 底部空间 (32.5%) -->
      <div class="flex-[0.325]"></div>
    </div>
  </div>
</template>

  <style scoped>
      /* 金色卡片样式 */
      .gold-card {
        background: transparent;
        position: relative;
        backdrop-filter: none;
        border-radius: 3rem;
        box-shadow: none;
      }

      .gold-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: transparent;
        border-radius: 3rem;
        pointer-events: none;
      }

      .gold-card::after {
        content: '';
        position: absolute;
        top: -40px;
        left: -40px;
        right: -40px;
        bottom: -40px;
        background: transparent;
        border-radius: 3.5rem;
        pointer-events: none;
        z-index: -1;
        filter: blur(20px);
      }

      .perspective {
        perspective: 1000px;
      }

      .slide-enter-active,
      .slide-leave-active {
        transition: all 0.5s ease;
      }

      .slide-enter-from {
        opacity: 0;
        transform: translateX(100px) rotateY(20deg);
      }

      .slide-leave-to {
        opacity: 0;
        transform: translateX(-100px) rotateY(-20deg);
      }

      .option-button {
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        font-family: 'Playfair Display', 'Georgia', serif;
      }

      .option-a {
        background: linear-gradient(135deg, rgba(255, 240, 153, 0.75) 0%, rgba(255, 253, 208, 0.75) 100%);
        box-shadow: none;
      }

      .option-b {
        background: linear-gradient(135deg, rgba(255, 240, 153, 0.75) 0%, rgba(255, 253, 208, 0.75) 100%);
        box-shadow: none;
      }

      /* 淡入向上动画 */
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in-up {
        animation: fade-in-up 0.6s ease-out forwards;
      }

      /* 题目文字进入动画 - 缩放 + 旋转 + 脉冲 */
      @keyframes question-scale-rotate {
        0% {
          opacity: 0;
          transform: scale(0.5) rotateX(45deg);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale(1) rotateX(0deg);
        }
      }

      @keyframes question-pulse {
        0%, 100% {
          text-shadow: 0 0 5px rgba(255, 215, 0, 0);
        }
        50% {
          text-shadow: 0 0 15px rgba(255, 215, 0, 0.4), 0 0 25px rgba(255, 215, 0, 0.2);
        }
      }

      .question-animate {
        animation: question-scale-rotate 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards,
                  question-pulse 2s ease-in-out infinite 0.8s;
      }

      /* 闪烁星星动画 */
      @keyframes twinkle-quiz {
        0%, 100% {
          opacity: 0;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.2);
        }
      }

      .quiz-star {
        position: absolute;
        font-size: 1.2rem;
        animation: twinkle-quiz 2s ease-in-out infinite;
        pointer-events: none;
      }

      /* 飘落金币动画 */
      @keyframes falling-coins {
        0% {
          opacity: 1;
          transform: translateY(-100vh) rotateZ(0deg);
        }
        100% {
          opacity: 0.2;
          transform: translateY(100vh) rotateZ(360deg);
        }
      }

      .falling-coin {
        position: absolute;
        font-size: 1.8rem;
        animation: falling-coins 4s linear infinite;
        filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.4));
        pointer-events: none;
      }

      /* 舞动绸带动画 */
      @keyframes sway-ribbon {
        0%, 100% {
          opacity: 0.3;
          transform: translateY(-100vh) translateX(0px) rotateZ(0deg);
        }
        50% {
          opacity: 0.6;
          transform: translateY(50vh) translateX(30px) rotateZ(15deg);
        }
      }

      .swaying-ribbon {
        position: absolute;
        font-size: 2rem;
        animation: sway-ribbon 5s ease-in-out infinite;
        filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
        pointer-events: none;
      }

      @media (max-width: 768px) {
        .quiz-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .slide-enter-from,
        .slide-leave-to {
          transform: translateX(100px);
        }
      }
    </style>

<script setup>
import { ref, computed } from "vue";
import QUIZ_QUESTIONS from "../config/quiz.config.js";

const emit = defineEmits(["complete", "back"]);

const currentIndex = ref(0);
const answers = ref([]);

const totalQuestions = QUIZ_QUESTIONS.length;

const currentQuestion = computed(() => QUIZ_QUESTIONS[currentIndex.value]);

const selectOption = (value) => {
  answers.value.push(value);

  if (answers.value.length === totalQuestions) {
    emit("complete", answers.value);
  } else {
    currentIndex.value++;
  }
};

const previousQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    answers.value.pop();
  }
};

const goBack = () => {
  emit("back");
};
</script>
