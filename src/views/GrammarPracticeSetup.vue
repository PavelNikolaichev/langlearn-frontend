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
          Back to Grammar Sets
        </UiButton>
      </div>

      <h1 class="text-2xl font-bold text-gray-900">Grammar Practice Setup</h1>
      <p class="text-gray-600 mt-2">
        Select grammar rules and optionally a vocabulary deck to practice with AI-generated
        exercises.
      </p>
    </div>

    <!-- Model Status -->
    <UiCard class="mb-6">
      <template #content>
        <div class="flex items-center space-x-3">
          <div class="flex items-center">
            <div
              :class="[
                'w-3 h-3 rounded-full mr-2',
                modelStatus === 'loaded'
                  ? 'bg-green-500'
                  : modelStatus === 'loading'
                    ? 'bg-yellow-500'
                    : 'bg-gray-400',
              ]"
            ></div>
            <span class="text-sm font-medium">
              {{ modelStatusText }}
            </span>
          </div>
          <UiButton
            v-if="modelStatus === 'not-loaded'"
            @click="initializeModel"
            size="sm"
            :disabled="modelStatus !== 'not-loaded'"
          >
            Load AI Model
          </UiButton>
        </div>
      </template>
    </UiCard>

    <!-- Grammar Selection -->
    <UiCard class="mb-6">
      <template #title>
        <h2 class="text-lg font-semibold">Select Grammar Rules</h2>
      </template>
      <template #content>
        <div v-if="loading" class="py-4">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
        </div>

        <div v-else-if="grammarSets.length === 0" class="text-center py-6">
          <p class="text-gray-500">No grammar sets available. Create some grammar rules first.</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="set in grammarSets" :key="set.id" class="border rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium">{{ set.name }}</h3>
              <UiButton size="sm" variant="secondary" @click="toggleAllGrammarsInSet(set)">
                {{ areAllGrammarsSelected(set) ? 'Deselect All' : 'Select All' }}
              </UiButton>
            </div>

            <p v-if="set.description" class="text-sm text-gray-600 mb-3">{{ set.description }}</p>

            <div
              v-if="set.grammars && set.grammars.length > 0"
              class="grid grid-cols-1 md:grid-cols-2 gap-2"
            >
              <label
                v-for="grammar in set.grammars"
                :key="grammar.id"
                class="flex items-center p-2 rounded border hover:bg-gray-50 cursor-pointer"
              >
                <input type="checkbox" :value="grammar" v-model="selectedGrammars" class="mr-2" />
                <div>
                  <div class="font-medium text-sm">{{ grammar.name }}</div>
                  <div v-if="grammar.description" class="text-xs text-gray-500">
                    {{ grammar.description }}
                  </div>
                </div>
              </label>
            </div>

            <div v-else class="text-sm text-gray-500 italic">No grammar rules in this set</div>
          </div>
        </div>

        <div v-if="selectedGrammars.length > 0" class="mt-4 p-3 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-800">
            Selected {{ selectedGrammars.length }} grammar rule{{
              selectedGrammars.length !== 1 ? 's' : ''
            }}
          </p>
        </div>
      </template>
    </UiCard>

    <!-- Vocabulary Deck Selection (Optional) -->
    <UiCard class="mb-6">
      <template #title>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Vocabulary Deck (Optional)</h2>
          <UiButton v-if="selectedDeck" size="sm" variant="secondary" @click="clearSelectedDeck">
            Clear Selection
          </UiButton>
        </div>
      </template>
      <template #content>
        <p class="text-sm text-gray-600 mb-4">
          Choose a vocabulary deck to incorporate specific words into the exercises. If none
          selected, the AI will use general vocabulary.
        </p>

        <div v-if="loadingDecks" class="py-4">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
        </div>

        <div v-else-if="decks.length === 0" class="text-center py-6">
          <p class="text-gray-500">No vocabulary decks available.</p>
        </div>

        <div v-else-if="!selectedDeck" class="space-y-2 max-h-40 overflow-y-auto">
          <div
            v-for="deck in decks"
            :key="deck.id"
            @click="selectDeck(deck)"
            class="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <div class="font-medium">{{ deck.name }}</div>
            <div class="text-sm text-gray-500">
              {{ deck.flashcards.length }} cards
              {{ deck.description ? ` • ${deck.description}` : '' }}
            </div>
          </div>
        </div>

        <div v-else class="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div class="font-medium text-green-800">{{ selectedDeck.name }}</div>
          <div class="text-sm text-green-600">
            {{ selectedDeck.flashcards.length }} vocabulary words will be used
          </div>
        </div>
      </template>
    </UiCard>

    <!-- Practice Settings -->
    <UiCard class="mb-6">
      <template #title>
        <h2 class="text-lg font-semibold">Practice Settings</h2>
      </template>
      <template #content>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Number of exercises
            </label>
            <select v-model="exerciseCount" class="w-full p-2 border rounded-lg">
              <option value="5">5 exercises</option>
              <option value="10">10 exercises</option>
              <option value="15">15 exercises</option>
              <option value="20">20 exercises</option>
            </select>
          </div>
        </div>
      </template>
    </UiCard>

    <!-- Start Practice Button -->
    <div class="flex justify-center">
      <UiButton @click="startPractice" :disabled="!canStartPractice" class="px-8 py-3 text-lg">
        {{ isGenerating ? 'Generating Exercises...' : 'Start Grammar Practice' }}
        <svg
          v-if="isGenerating"
          class="animate-spin -mr-1 ml-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </UiButton>
    </div>

    <div v-if="!canStartPractice" class="text-center mt-4">
      <p class="text-sm text-gray-500">
        {{
          modelStatus !== 'loaded'
            ? 'Please load the AI model first.'
            : 'Please select at least one grammar rule.'
        }}
      </p>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { fetchGrammarSets, type Grammar, type GrammarSet } from '@/services/grammarService'
import { fetchDecks, type Deck } from '@/services/deckService'
import { llmService } from '@/services/llmService'
import UiContainer from '@/components/ui/Container.vue'
import UiButton from '@/components/ui/Button.vue'
import UiCard from '@/components/ui/Card.vue'

const router = useRouter()

// State
const grammarSets = ref<GrammarSet[]>([])
const decks = ref<Deck[]>([])
const selectedGrammars = ref<Grammar[]>([])
const selectedDeck = ref<Deck | null>(null)
const exerciseCount = ref(10)
const loading = ref(false)
const loadingDecks = ref(false)
const isGenerating = ref(false)
const modelStatus = ref<'not-loaded' | 'loading' | 'loaded'>('not-loaded')

const canStartPractice = computed(() => {
  return selectedGrammars.value.length > 0 && modelStatus.value === 'loaded' && !isGenerating.value
})

const modelStatusText = computed(() => {
  switch (modelStatus.value) {
    case 'loaded':
      return 'AI Model Ready'
    case 'loading':
      return 'Loading AI Model...'
    default:
      return 'AI Model Not Loaded'
  }
})

async function loadData() {
  loading.value = true
  loadingDecks.value = true

  try {
    const [grammarData, deckData] = await Promise.all([fetchGrammarSets(), fetchDecks()])

    grammarSets.value = grammarData
    decks.value = deckData
  } catch (error) {
    console.error('Failed to load data:', error)
  } finally {
    loading.value = false
    loadingDecks.value = false
  }
}

async function initializeModel() {
  modelStatus.value = 'loading'
  try {
    await llmService.initializeModel()
    modelStatus.value = 'loaded'
  } catch (error) {
    console.error('Failed to initialize model:', error)
    modelStatus.value = 'not-loaded'
    alert('Failed to load AI model. Please try again.')
  }
}

function checkModelStatus() {
  if (llmService.isModelLoaded()) {
    modelStatus.value = 'loaded'
  } else if (llmService.isModelLoading()) {
    modelStatus.value = 'loading'
  } else {
    modelStatus.value = 'not-loaded'
  }
}

function toggleAllGrammarsInSet(set: GrammarSet) {
  if (!set.grammars) return

  const areAllSelected = areAllGrammarsSelected(set)

  if (areAllSelected) {
    // Remove all grammars from this set
    selectedGrammars.value = selectedGrammars.value.filter(
      (grammar) => !set.grammars!.some((g) => g.id === grammar.id),
    )
  } else {
    // Add all grammars from this set
    const grammarsToAdd = set.grammars.filter(
      (grammar) => !selectedGrammars.value.some((g) => g.id === grammar.id),
    )
    selectedGrammars.value.push(...grammarsToAdd)
  }
}

function areAllGrammarsSelected(set: GrammarSet): boolean {
  if (!set.grammars || set.grammars.length === 0) return false

  return set.grammars.every((grammar) => selectedGrammars.value.some((g) => g.id === grammar.id))
}

function selectDeck(deck: Deck) {
  selectedDeck.value = deck
}

function clearSelectedDeck() {
  selectedDeck.value = null
}

async function startPractice() {
  if (!canStartPractice.value) return

  isGenerating.value = true

  try {
    const exercises = await llmService.generateGrammarExercises(
      selectedGrammars.value,
      selectedDeck.value?.flashcards,
      exerciseCount.value,
    )

    // Navigate to practice view with generated exercises
    router.push({
      name: 'GrammarPractice',
      params: {
        exercises: JSON.stringify(exercises),
        grammarNames: selectedGrammars.value.map((g) => g.name).join(', '),
        deckName: selectedDeck.value?.name || '',
      },
    })
  } catch (error) {
    console.error('Failed to generate exercises:', error)
    alert('Failed to generate exercises. Please try again.')
  } finally {
    isGenerating.value = false
  }
}

function goBack() {
  router.push({ name: 'GrammarSetList' })
}

onMounted(() => {
  loadData()
  checkModelStatus()
})
</script>
