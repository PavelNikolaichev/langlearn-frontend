<template>
  <UiContainer v-if="deck">
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
          Back to Deck
        </UiButton>

        <div class="text-sm text-gray-600">
          {{ currentCardIndex + 1 }} / {{ flashcards.length }}
        </div>
      </div>

      <h1 class="text-2xl font-bold text-gray-900">{{ deck.name }} - Practice</h1>
    </div>

    <!-- No cards message -->
    <div v-if="flashcards.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">No flashcards in this deck yet.</p>
      <UiButton @click="goBack" class="mt-4">Add some cards first</UiButton>
    </div>

    <!-- Practice session completed -->
    <div v-else-if="sessionCompleted" class="text-center py-12">
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
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Great job!</h2>
        <p class="text-gray-600 mb-6">You've completed all cards in this session.</p>
        <div class="space-x-3">
          <UiButton @click="restartSession">Practice Again</UiButton>
          <UiButton variant="secondary" @click="goBack">Back to Deck</UiButton>
        </div>
      </div>
    </div>

    <!-- Flashcard practice -->
    <div v-else-if="currentCard" class="max-w-2xl mx-auto">
      <!-- Progress bar -->
      <div class="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          class="bg-blue-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${(currentCardIndex / flashcards.length) * 100}%` }"
        ></div>
      </div>

      <!-- Flashcard -->
      <UiCard class="mb-6">
        <template #content>
          <div class="text-center py-8">
            <!-- Front side -->
            <div v-if="!showAnswer" class="space-y-4">
              <div class="text-sm text-gray-500 uppercase tracking-wide">Question</div>
              <div class="text-xl font-medium text-gray-900">{{ currentCard.front }}</div>
              <UiButton @click="revealAnswer" class="mt-6">Show Answer</UiButton>
              <div class="text-xs text-gray-500 mt-2">Press Space to reveal answer</div>
            </div>

            <!-- Back side -->
            <div v-else class="space-y-6">
              <div class="space-y-4">
                <div class="text-sm text-gray-500 uppercase tracking-wide">Question</div>
                <div class="text-lg text-gray-700">{{ currentCard.front }}</div>
              </div>

              <div class="border-t pt-4 space-y-4">
                <div class="text-sm text-gray-500 uppercase tracking-wide">Answer</div>
                <div class="text-xl font-medium text-gray-900">{{ currentCard.back }}</div>
              </div>

              <div v-if="currentCard.notes" class="border-t pt-4 space-y-2">
                <div class="text-sm text-gray-500 uppercase tracking-wide">Notes</div>
                <div class="text-sm text-gray-600">{{ currentCard.notes }}</div>
              </div>
            </div>
          </div>
        </template>
      </UiCard>

      <!-- Difficulty buttons (only shown after revealing answer) -->
      <div v-if="showAnswer" class="space-y-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <UiButton variant="danger" @click="answerCard('again')" class="py-3">
            <div class="text-center">
              <div class="font-medium">Again</div>
              <div class="text-xs opacity-75">&lt; 1 min</div>
              <div class="text-xs opacity-50">(1)</div>
            </div>
          </UiButton>

          <UiButton variant="secondary" @click="answerCard('hard')" class="py-3">
            <div class="text-center">
              <div class="font-medium">Hard</div>
              <div class="text-xs opacity-75">6 min</div>
              <div class="text-xs opacity-50">(2)</div>
            </div>
          </UiButton>

          <UiButton variant="secondary" @click="answerCard('good')" class="py-3">
            <div class="text-center">
              <div class="font-medium">Good</div>
              <div class="text-xs opacity-75">1 day</div>
              <div class="text-xs opacity-50">(3)</div>
            </div>
          </UiButton>

          <UiButton variant="primary" @click="answerCard('easy')" class="py-3">
            <div class="text-center">
              <div class="font-medium">Easy</div>
              <div class="text-xs opacity-75">4 days</div>
              <div class="text-xs opacity-50">(4)</div>
            </div>
          </UiButton>
        </div>

        <!-- Keyboard shortcuts hint -->
        <div class="text-center text-xs text-gray-500">
          Use keyboard shortcuts: 1-4 for difficulty, Space to reveal answer
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-2 text-gray-500">Loading flashcards...</p>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchFlashcards, type Flashcard } from '@/services/flashcardService'
import { fetchDeckById, type Deck } from '@/services/deckService'
import UiContainer from '@/components/ui/Container.vue'
import UiButton from '@/components/ui/Button.vue'
import UiCard from '@/components/ui/Card.vue'

const route = useRoute()
const router = useRouter()
const deckId = route.params.id as string

const deck = ref<Deck | null>(null)
const flashcards = ref<Flashcard[]>([])
const loading = ref(false)
const currentCardIndex = ref(0)
const showAnswer = ref(false)
const sessionCompleted = ref(false)

const currentCard = computed(() => {
  return flashcards.value[currentCardIndex.value] || null
})

async function loadDeck() {
  loading.value = true
  try {
    deck.value = await fetchDeckById(deckId)
    flashcards.value = await fetchFlashcards(deckId)

    shuffleArray(flashcards.value)
  } catch (error) {
    console.error('Failed to load deck:', error)
  } finally {
    loading.value = false
  }
}

function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function revealAnswer() {
  showAnswer.value = true
}

function answerCard(difficulty: 'again' | 'hard' | 'good' | 'easy') {
  // TODO: implement spaced repetition logic
  console.log(`Card answered with difficulty: ${difficulty}`)
  nextCard()
}

function nextCard() {
  showAnswer.value = false

  if (currentCardIndex.value < flashcards.value.length - 1) {
    currentCardIndex.value++
  } else {
    sessionCompleted.value = true
  }
}

function restartSession() {
  currentCardIndex.value = 0
  showAnswer.value = false
  sessionCompleted.value = false
  shuffleArray(flashcards.value)
}

function goBack() {
  router.push({ name: 'DeckDetail', params: { id: deckId } })
}

// Keyboard shortcuts
function handleKeyPress(event: KeyboardEvent) {
  if (loading.value || sessionCompleted.value) return

  if (!showAnswer.value && event.code === 'Space') {
    event.preventDefault()
    revealAnswer()
  } else if (showAnswer.value) {
    switch (event.code) {
      case 'Digit1':
        event.preventDefault()
        answerCard('again')
        break
      case 'Digit2':
        event.preventDefault()
        answerCard('hard')
        break
      case 'Digit3':
        event.preventDefault()
        answerCard('good')
        break
      case 'Digit4':
        event.preventDefault()
        answerCard('easy')
        break
    }
  }
}

onMounted(() => {
  loadDeck()
  document.addEventListener('keydown', handleKeyPress)
})

// Cleanup
import { onBeforeUnmount } from 'vue'
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyPress)
})
</script>
