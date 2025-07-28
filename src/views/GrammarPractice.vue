<template>
  <UiContainer>
    <!-- Header -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <UiButton variant="secondary" size="sm" @click="goBack" class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Setup
        </UiButton>

        <div class="text-sm text-gray-600">
          {{ currentExerciseIndex + 1 }} / {{ exercises.length }}
        </div>
      </div>

      <h1 class="text-2xl font-bold text-gray-900">Grammar Practice</h1>
      <p v-if="grammarNames" class="text-gray-600 mt-1">{{ grammarNames }}</p>
      <p v-if="deckName" class="text-sm text-gray-500">Using vocabulary from: {{ deckName }}</p>
    </div>

    <!-- Practice session completed -->
    <div v-if="sessionCompleted" class="text-center py-12">
      <div class="bg-green-50 rounded-lg p-8 max-w-md mx-auto">
        <svg
          class="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Excellent work!</h2>
        <p class="text-gray-600 mb-4">You've completed all grammar exercises.</p>
        <div class="text-sm text-gray-600 mb-6">
          <p>
            Score: {{ correctAnswers }} / {{ exercises.length }} ({{
              Math.round((correctAnswers / exercises.length) * 100)
            }}%)
          </p>
        </div>
        <div class="space-x-3">
          <UiButton @click="restartSession">Practice Again</UiButton>
          <UiButton variant="secondary" @click="goBack">New Practice Session</UiButton>
        </div>
      </div>
    </div>

    <!-- Exercise practice -->
    <div v-else-if="currentExercise" class="max-w-3xl mx-auto">
      <!-- Progress bar -->
      <div class="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          class="bg-blue-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${(currentExerciseIndex / exercises.length) * 100}%` }"
        ></div>
      </div>

      <!-- Exercise Card -->
      <UiCard class="mb-6">
        <template #content>
          <div class="py-6">
            <!-- Exercise type and grammar info -->
            <div class="mb-4 text-center">
              <span
                class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide"
              >
                {{ formatExerciseType(currentExercise.type) }}
              </span>
              <div class="text-sm text-gray-500 mt-1">{{ currentExercise.grammar }}</div>
            </div>

            <!-- Exercise question -->
            <div class="text-center mb-6">
              <div class="text-lg font-medium text-gray-900 mb-4">
                {{ currentExercise.question }}
              </div>

              <!-- Multiple choice options -->
              <div
                v-if="currentExercise.type === 'multiple-choice' && currentExercise.options"
                class="space-y-2"
              >
                <label
                  v-for="(option, index) in currentExercise.options"
                  :key="index"
                  class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  :class="{ 'bg-blue-50 border-blue-200': userAnswer === option }"
                >
                  <input type="radio" :value="option" v-model="userAnswer" class="mr-3" />
                  <span>{{ String.fromCharCode(65 + index) }}. {{ option }}</span>
                </label>
              </div>

              <!-- Text input for other types -->
              <div v-else class="max-w-md mx-auto">
                <input
                  v-model="userAnswer"
                  type="text"
                  placeholder="Enter your answer..."
                  class="w-full p-3 border rounded-lg text-center"
                  @keydown.enter="submitAnswer"
                />
              </div>
            </div>

            <!-- Submit button -->
            <div v-if="!showAnswer" class="text-center">
              <UiButton @click="submitAnswer" :disabled="!userAnswer.trim()">
                Submit Answer
              </UiButton>
            </div>

            <!-- Answer feedback -->
            <div v-if="showAnswer" class="space-y-4">
              <!-- Correct/Incorrect indicator -->
              <div class="text-center">
                <div
                  :class="[
                    'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium',
                    isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                  ]"
                >
                  <svg
                    :class="['w-4 h-4 mr-2', isCorrect ? 'text-green-600' : 'text-red-600']"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      v-if="isCorrect"
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                    <path
                      v-else
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ isCorrect ? 'Correct!' : 'Incorrect' }}
                </div>
              </div>

              <!-- Answer details -->
              <div class="bg-gray-50 rounded-lg p-4 space-y-3">
                <div v-if="!isCorrect">
                  <div class="text-sm text-gray-600">Your answer:</div>
                  <div class="font-medium text-gray-900">{{ userAnswer }}</div>
                </div>

                <div>
                  <div class="text-sm text-gray-600">Correct answer:</div>
                  <div class="font-medium text-green-700">{{ currentExercise.correctAnswer }}</div>
                </div>

                <div>
                  <div class="text-sm text-gray-600">Explanation:</div>
                  <div class="text-sm text-gray-700">{{ currentExercise.explanation }}</div>
                </div>

                <div v-if="currentExercise.vocabulary && currentExercise.vocabulary.length > 0">
                  <div class="text-sm text-gray-600">Vocabulary used:</div>
                  <div class="flex flex-wrap gap-1 mt-1">
                    <span
                      v-for="word in currentExercise.vocabulary"
                      :key="word"
                      class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {{ word }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Next button -->
              <div class="text-center">
                <UiButton @click="nextExercise">
                  {{
                    currentExerciseIndex < exercises.length - 1
                      ? 'Next Exercise'
                      : 'Finish Practice'
                  }}
                </UiButton>
              </div>
            </div>
          </div>
        </template>
      </UiCard>

      <!-- Keyboard shortcut hint -->
      <div class="text-center text-xs text-gray-500">Press Enter to submit your answer</div>
    </div>

    <!-- Loading state -->
    <div v-else class="text-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-2 text-gray-500">Loading exercises...</p>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { GrammarExercise } from '@/services/llmService'
import UiContainer from '@/components/ui/Container.vue'
import UiButton from '@/components/ui/Button.vue'
import UiCard from '@/components/ui/Card.vue'

const route = useRoute()
const router = useRouter()

// State
const exercises = ref<GrammarExercise[]>([])
const currentExerciseIndex = ref(0)
const userAnswer = ref('')
const showAnswer = ref(false)
const sessionCompleted = ref(false)
const correctAnswers = ref(0)
const grammarNames = ref('')
const deckName = ref('')

// Computed
const currentExercise = computed(() => {
  return exercises.value[currentExerciseIndex.value] || null
})

const isCorrect = computed(() => {
  if (!currentExercise.value || !showAnswer.value) return false

  const userAns = userAnswer.value.trim().toLowerCase()
  const correctAns = currentExercise.value.correctAnswer.trim().toLowerCase()

  return userAns === correctAns
})

// Methods
function loadExercises() {
  try {
    const exercisesParam = route.params.exercises as string
    if (exercisesParam) {
      exercises.value = JSON.parse(exercisesParam)
    }

    grammarNames.value = (route.params.grammarNames as string) || ''
    deckName.value = (route.params.deckName as string) || ''

    if (exercises.value.length === 0) {
      throw new Error('No exercises provided')
    }
  } catch (error) {
    console.error('Failed to load exercises:', error)
    router.push({ name: 'GrammarPracticeSetup' })
  }
}

function formatExerciseType(type: GrammarExercise['type']): string {
  const formats = {
    'fill-blank': 'Fill in the Blank',
    'multiple-choice': 'Multiple Choice',
    transformation: 'Transformation',
    'error-correction': 'Error Correction',
  }
  return formats[type] || type
}

function submitAnswer() {
  if (!userAnswer.value.trim()) return

  showAnswer.value = true

  if (isCorrect.value) {
    correctAnswers.value++
  }
}

function nextExercise() {
  userAnswer.value = ''
  showAnswer.value = false

  if (currentExerciseIndex.value < exercises.value.length - 1) {
    currentExerciseIndex.value++
  } else {
    sessionCompleted.value = true
  }
}

function restartSession() {
  currentExerciseIndex.value = 0
  userAnswer.value = ''
  showAnswer.value = false
  sessionCompleted.value = false
  correctAnswers.value = 0

  // Shuffle exercises for variety
  for (let i = exercises.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[exercises.value[i], exercises.value[j]] = [exercises.value[j], exercises.value[i]]
  }
}

function goBack() {
  router.push({ name: 'GrammarPracticeSetup' })
}

onMounted(() => {
  loadExercises()
})
</script>
