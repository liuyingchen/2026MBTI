<template>
  <div class="quiz-page">
    <!-- 背景装饰 - 喜庆的红金搭配 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-12 bg-red-600"
      ></div>
      <div
        class="absolute top-1/3 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 bg-yellow-400"
      ></div>
      <div
        class="absolute bottom-0 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-8 bg-red-500"
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
    <div class="relative flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <!-- 进度条 -->
      <div class="w-full max-w-md mb-8">
        <div class="flex justify-between items-center mb-3">
          <span class="text-sm font-semibold text-gray-600">
            Question {{ currentIndex + 1 }}/{{ totalQuestions }}
          </span>
          <span class="text-xs text-gray-400">
            {{ Math.round(progress) }}%
          </span>
        </div>
        <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-red-500 to-yellow-500 transition-all duration-500"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>

      <!-- 卡片容器 - 支持滑动动画 -->
      <div class="relative w-full max-w-md h-96 mb-8 perspective">
        <transition name="slide" mode="out-in">
          <div
            :key="currentIndex"
            class="absolute inset-0 bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center"
          >
            <!-- 问题文本 -->
            <h2 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
              {{ currentQuestion.question }}
            </h2>

            <!-- 选项按钮容器 -->
            <div class="w-full space-y-4">
              <button
                v-for="(option, idx) in currentQuestion.options"
                :key="idx"
                @click="selectOption(option.value)"
                class="option-button w-full py-4 px-6 rounded-xl font-semibold text-lg text-white transition-all duration-300 hover:scale-105 active:scale-95"
                :class="idx === 0 ? 'option-a' : 'option-b'"
              >
                {{ option.text }}
              </button>
            </div>

            <!-- 最小触控区域提示（手机端） -->
            <p class="text-xs text-gray-400 mt-8 text-center md:hidden">
              Tap to select
            </p>
          </div>
        </transition>
      </div>

      <!-- 返回按钮（可选） -->
      <div class="flex gap-4 text-sm">
        <button
          v-if="currentIndex > 0"
          @click="previousQuestion"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  </div>
</template>

  <style scoped>
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
      }

      .option-a {
        background: linear-gradient(135deg, rgba(220, 20, 60, 0.8) 0%, rgba(255, 107, 107, 0.8) 100%);
        box-shadow: 0 8px 24px rgba(220, 20, 60, 0.3);
      }

      .option-b {
        background: linear-gradient(135deg, rgba(255, 193, 7, 0.8) 0%, rgba(255, 152, 0, 0.8) 100%);
        box-shadow: 0 8px 24px rgba(255, 193, 7, 0.3);
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

const progress = computed(() => {
  return ((currentIndex.value + 1) / totalQuestions) * 100;
});

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
