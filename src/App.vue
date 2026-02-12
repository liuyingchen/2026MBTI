<template>
  <div id="app" class="app-container">
    <!-- Landing Page -->
    <Transition name="fade" mode="out-in">
      <LandingPage v-if="currentPage === 'landing'" @start="goToIntro" key="landing" />

      <!-- Intro Page -->
      <IntroPage v-else-if="currentPage === 'intro'" @continue="goToQuiz" @back="goBackToLanding" key="intro" />

      <!-- Quiz Page -->
      <QuizPage v-else-if="currentPage === 'quiz'" @complete="handleQuizComplete" @back="goBackToIntro" key="quiz" />

      <!-- Result Page -->
      <ResultPage
        v-else-if="currentPage === 'result'"
        :personality="currentPersonality"
        :answers="currentAnswers"
        @restart="restartQuiz"
        key="result"
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LandingPage from "./components/LandingPage.vue";
import IntroPage from "./components/IntroPage.vue";
import QuizPage from "./components/QuizPage.vue";
import ResultPage from "./components/ResultPage.vue";
import { getPersonalityResult } from "./utils/logic.js";

const currentPage = ref("landing");
const currentPersonality = ref(null);
const currentAnswers = ref([]);

const goToIntro = () => {
  currentPage.value = "intro";
};

const goBackToLanding = () => {
  currentPage.value = "landing";
};

const goBackToIntro = () => {
  currentPage.value = "intro";
};

const goToQuiz = () => {
  currentPage.value = "quiz";
};

const handleQuizComplete = (answers) => {
  currentAnswers.value = answers;
  currentPersonality.value = getPersonalityResult(answers);
  currentPage.value = "result";
};

const restartQuiz = () => {
  currentPage.value = "landing";
  currentPersonality.value = null;
  currentAnswers.value = [];
};
</script>

<style scoped>
#app {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

/* 页面转换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  #app {
    min-height: 100vh;
  }
}
</style>
