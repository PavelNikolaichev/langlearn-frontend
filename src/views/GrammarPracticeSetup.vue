<template>
  <UiContainer class="max-w-6xl mx-auto pb-20">
    <div class="mb-8">
      <button
        @click="goBack"
        class="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4"
      >
        <div class="mr-2 p-1 rounded-full group-hover:bg-gray-200 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
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
        </div>
        Back to Grammar Sets
      </button>

      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Practice Setup</h1>
          <p class="text-gray-600 mt-2 text-lg">Customize your AI learning session.</p>
        </div>

        <div
          class="hidden md:flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100 shadow-sm"
        >
          <span class="font-bold mr-1">{{ selectedGrammars.length }}</span> rules selected
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 space-y-8">
        <section>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-800 flex items-center">
              <span
                class="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold mr-3 ring-4 ring-white shadow-sm"
                >1</span
              >
              Select Grammar Rules
            </h2>
            <span
              v-if="selectedGrammars.length > 0"
              class="md:hidden text-sm font-medium text-indigo-600"
            >
              {{ selectedGrammars.length }} selected
            </span>
          </div>

          <div v-if="loading" class="py-12 flex justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>

          <div
            v-else-if="grammarSets.length === 0"
            class="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300"
          >
            <p class="text-gray-500">No grammar sets found. Please create one first.</p>
          </div>

          <div v-else class="space-y-6">
            <div
              v-for="set in grammarSets"
              :key="set.id"
              class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div
                class="px-5 py-4 bg-gray-50/80 border-b border-gray-100 flex justify-between items-center backdrop-blur-sm"
              >
                <div>
                  <h3 class="font-semibold text-gray-800">{{ set.name }}</h3>
                  <p v-if="set.description" class="text-xs text-gray-500 mt-0.5">
                    {{ set.description }}
                  </p>
                </div>
                <button
                  @click="toggleAllGrammarsInSet(set)"
                  class="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded transition-colors"
                >
                  {{ areAllGrammarsSelected(set) ? 'Deselect All' : 'Select All' }}
                </button>
              </div>

              <div class="p-5">
                <div
                  v-if="set.grammars && set.grammars.length > 0"
                  class="grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  <label
                    v-for="grammar in set.grammars"
                    :key="grammar.id"
                    :class="[
                      'group relative flex items-start p-3 rounded-lg border cursor-pointer transition-all duration-200',
                      isSelected(grammar)
                        ? 'bg-indigo-50/50 border-indigo-200 ring-1 ring-indigo-200 shadow-sm'
                        : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm',
                    ]"
                  >
                    <div class="flex items-center h-5">
                      <input
                        type="checkbox"
                        :value="grammar"
                        v-model="selectedGrammars"
                        class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition-colors cursor-pointer"
                      />
                    </div>
                    <div class="ml-3">
                      <div
                        :class="[
                          'text-sm font-medium transition-colors',
                          isSelected(grammar) ? 'text-indigo-900' : 'text-gray-900',
                        ]"
                      >
                        {{ grammar.name }}
                      </div>
                      <div class="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                        {{ grammar.description || 'No description provided.' }}
                      </div>
                    </div>
                  </label>
                </div>
                <div v-else class="text-sm text-gray-400 italic text-center py-2">
                  No rules in this set
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-800 flex items-center mb-4">
            <span
              class="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold mr-3 ring-4 ring-white shadow-sm"
              >2</span
            >
            Add Vocabulary Context
            <span class="ml-2 text-sm font-normal text-gray-400">(Optional)</span>
          </h2>

          <UiCard class="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
            <template #content>
              <div class="p-1">
                <div
                  v-if="selectedDeck"
                  class="flex items-center justify-between bg-emerald-50/50 border border-emerald-100 rounded-lg p-4 mx-4 my-4"
                >
                  <div class="flex items-center">
                    <div
                      class="p-2 bg-white border border-emerald-100 text-emerald-600 rounded-lg mr-4 shadow-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900">{{ selectedDeck.name }}</h4>
                      <p class="text-sm text-emerald-700 font-medium">
                        Using {{ selectedDeck.flashcards.length }} vocabulary words
                      </p>
                    </div>
                  </div>
                  <button
                    @click="clearSelectedDeck"
                    class="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div v-else class="p-4">
                  <div v-if="loadingDecks" class="py-4 flex justify-center">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                  </div>
                  <div v-else-if="decks.length === 0" class="text-gray-500 italic text-center py-4">
                    No vocabulary decks available.
                  </div>
                  <div
                    v-else
                    class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar"
                  >
                    <div
                      v-for="deck in decks"
                      :key="deck.id"
                      @click="selectDeck(deck)"
                      class="group p-3 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/30 cursor-pointer transition-all bg-gray-50/30"
                    >
                      <div class="font-medium text-gray-800 group-hover:text-indigo-700">
                        {{ deck.name }}
                      </div>
                      <div class="text-xs text-gray-500 mt-1 flex items-center">
                        <svg
                          class="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          ></path>
                        </svg>
                        {{ deck.flashcards.length }} cards
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </UiCard>
        </section>
      </div>

      <div class="lg:col-span-4">
        <div class="sticky top-6 space-y-6">
          <UiCard class="border-gray-200 shadow-sm overflow-hidden">
            <div class="px-5 py-3 bg-gray-50 border-b border-gray-100">
              <h3 class="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                Session Settings
              </h3>
            </div>

            <div class="p-5 bg-white">
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Exercise Count
              </label>
              <div class="grid grid-cols-4 gap-3">
                <button
                  v-for="count in [5, 10, 15, 20]"
                  :key="count"
                  @click="exerciseCount = count"
                  :class="[
                    'py-2.5 rounded-lg text-sm font-bold transition-all border',
                    exerciseCount === count
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50',
                  ]"
                >
                  {{ count }}
                </button>
              </div>
            </div>
          </UiCard>

          <UiCard class="border-gray-200 shadow-sm overflow-hidden">
            <div
              class="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between"
            >
              <h3 class="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                AI Configuration
              </h3>
              <span
                :class="[
                  'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm',
                  modelStatusColor,
                ]"
              >
                {{ modelStatusText }}
              </span>
            </div>

            <div class="p-5 bg-white">
              <div class="space-y-5">
                <div class="space-y-1.5">
                  <label class="block text-xs text-gray-500 font-bold uppercase tracking-wide"
                    >Provider</label
                  >
                  <div class="relative">
                    <select
                      v-model="selectedBackend"
                      class="w-full h-10 pl-3 pr-8 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all appearance-none"
                    >
                      <option value="openrouter">OpenRouter (Cloud)</option>
                      <option value="openai">OpenAI (Cloud)</option>
                      <option value="static">Static (Offline)</option>
                      <option value="local">Local (Browser/WebLLM)</option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div v-if="isCloudBackend" class="space-y-5">
                  <div class="space-y-1.5">
                    <label class="block text-xs text-gray-500 font-bold uppercase tracking-wide"
                      >API Key</label
                    >
                    <input
                      type="password"
                      v-model="apiKey"
                      placeholder="sk-..."
                      class="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-xs text-gray-500 font-bold uppercase tracking-wide"
                      >Model ID</label
                    >
                    <input
                      type="text"
                      v-model="model"
                      placeholder="gpt-4o"
                      class="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>

                  <div class="pt-2">
                    <UiButton
                      size="sm"
                      variant="secondary"
                      @click="applyBackendConfig"
                      class="w-full h-9 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                    >
                      Save Configuration
                    </UiButton>
                  </div>
                </div>

                <div v-else-if="isStatic" class="space-y-4 pt-1">
                  <div
                    class="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg border border-blue-100 leading-relaxed"
                  >
                    This uses a local static generator with sample exercises — no API key or model
                    required.
                  </div>
                </div>

                <div v-else class="space-y-4 pt-1">
                  <div
                    class="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg border border-blue-100 leading-relaxed"
                  >
                    This loads an AI model directly in your browser. It requires WebGPU support.
                  </div>
                  <UiButton
                    v-if="modelStatus === 'not-loaded'"
                    size="sm"
                    variant="default"
                    class="w-full"
                    @click="initializeModel"
                  >
                    Load Local Model
                  </UiButton>
                  <div
                    v-if="modelStatus === 'loading'"
                    class="w-full bg-gray-100 rounded-full h-2 mt-2 overflow-hidden border border-gray-200"
                  >
                    <div
                      class="bg-indigo-600 h-2 rounded-full animate-progress-indeterminate"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </UiCard>

          <div class="pt-4">
            <UiButton
              @click="startPractice"
              :disabled="!canStartPractice"
              class="w-full py-6 text-lg shadow-xl shadow-indigo-200 transition-all transform active:scale-[0.98] disabled:shadow-none disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none rounded-xl"
              :class="
                canStartPractice
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-slate-300 text-slate-500'
              "
            >
              <div class="flex items-center justify-center font-bold tracking-wide">
                <span v-if="isGenerating">Generating...</span>
                <span v-else>Start Practice</span>

                <svg
                  v-if="isGenerating"
                  class="animate-spin ml-3 h-5 w-5 text-white"
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
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </UiButton>

            <div
              v-if="!canStartPractice"
              class="text-center mt-3 bg-red-50 text-red-600 px-3 py-2 rounded-lg border border-red-100 text-xs font-medium flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ startPracticeDisabledMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGrammarSetStore } from '@/stores/grammarSet'
import { useDeckStore } from '@/stores/deck'
import type { Grammar, GrammarSet, Deck, Flashcard } from '@/api'
import { LocalLLMService } from '@/services/llm/localLLMService'
import { useGrammarPracticeStore } from '@/stores/grammar'
import UiContainer from '@/components/ui/Container.vue'
import UiButton from '@/components/ui/Button.vue'
import UiCard from '@/components/ui/Card.vue'
import type { ExerciseGeneratorInterface } from '@/services/ExerciseGenerator/exerciseGeneratorInterface'
import {
  getExerciseGenerator,
  type LLMBackend,
} from '@/services/ExerciseGenerator/generatorFactory'
import { useOpenAIStore } from '@/stores/openai'

const router = useRouter()
const grammarPracticeStore = useGrammarPracticeStore()
const grammarSetStore = useGrammarSetStore()
const deckStore = useDeckStore()

const llmService = LocalLLMService.getInstance()
const openAIStore = useOpenAIStore()

// Backend selection state
const selectedBackend = ref<LLMBackend>('openrouter')
const isLocal = computed(() => selectedBackend.value === 'local')
const isStatic = computed(() => selectedBackend.value === 'static')
const isCloudBackend = computed(
  () => selectedBackend.value === 'openai' || selectedBackend.value === 'openrouter',
)
const exerciseGenerator = ref<ExerciseGeneratorInterface>(getExerciseGenerator('openrouter'))

// Config inputs
const apiKey = ref(openAIStore.getApiKey || '')
const baseURL = ref(openAIStore.getBaseURL || 'https://openrouter.ai/api/v1')
const model = ref(openAIStore.getModel || 'anthropic/claude-3.5-sonnet')

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

// Computed Properties for UI Logic
const canStartPractice = computed(() => {
  // Local requires the local model to be loaded
  if (isLocal.value) {
    return (
      selectedGrammars.value.length > 0 && modelStatus.value === 'loaded' && !isGenerating.value
    )
  }
  // Static requires only grammars selected
  if (isStatic.value) {
    return selectedGrammars.value.length > 0 && !isGenerating.value
  }
  // Cloud backends require API key and model
  if (isCloudBackend.value) {
    return (
      selectedGrammars.value.length > 0 &&
      apiKey.value.trim().length > 10 &&
      model.value.trim().length > 0 &&
      !isGenerating.value
    )
  }
  // Default fallback
  return selectedGrammars.value.length > 0 && !isGenerating.value
})

const modelStatusText = computed(() => {
  switch (modelStatus.value) {
    case 'loaded':
      return 'Ready'
    case 'loading':
      return 'Loading'
    default:
      return 'Not Configured'
  }
})

const modelStatusColor = computed(() => {
  switch (modelStatus.value) {
    case 'loaded':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'loading':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200'
    default:
      return 'bg-gray-100 text-gray-500 border-gray-200'
  }
})

const startPracticeDisabledMessage = computed(() => {
  if (isLocal.value && modelStatus.value !== 'loaded') return 'AI Model not ready'
  if (isCloudBackend.value && (apiKey.value.trim().length <= 10 || model.value.trim().length === 0))
    return 'Enter a valid API key and model to continue'
  return 'Select at least one grammar rule and set up AI configuration'
})

// Helper to check if a specific grammar is selected (for UI highlighting)
function isSelected(grammar: Grammar): boolean {
  return selectedGrammars.value.some((g) => g.id === grammar.id)
}

async function loadData() {
  loading.value = true
  loadingDecks.value = true

  try {
    await Promise.all([grammarSetStore.fetchGrammarSets(), deckStore.fetchDecks()])
    grammarSets.value = grammarSetStore.grammarSets
    decks.value = deckStore.decks
  } catch (error) {
    console.error('Failed to load data:', error)
  } finally {
    loading.value = false
    loadingDecks.value = false
  }
}

async function initializeModel() {
  if (!isLocal.value) return
  modelStatus.value = 'loading'
  await llmService.initializeModel?.()
  await checkModelStatus()
}

async function checkModelStatus() {
  if (isStatic.value) {
    // Static generator doesn't require loading
    modelStatus.value = 'loaded'
    return
  }

  if (!isLocal.value) {
    modelStatus.value = 'loaded'
    return
  }

  if (await llmService.isModelReady()) {
    modelStatus.value = 'loaded'
  } else if (await llmService.isModelLoading()) {
    modelStatus.value = 'loading'
  } else {
    modelStatus.value = 'not-loaded'
  }
}

function applyBackendConfig() {
  // For cloud backends update store config. Skip for local and static.
  if (isCloudBackend.value) {
    openAIStore.setApiKey(apiKey.value.trim())
    openAIStore.setBaseURL(baseURL.value.trim())
    openAIStore.setModel(model.value.trim())
  }
  exerciseGenerator.value = getExerciseGenerator(selectedBackend.value)
  checkModelStatus()
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
    const exercises = await exerciseGenerator.value.generateGrammarExercises(
      selectedGrammars.value,
      selectedDeck.value?.flashcards as Flashcard[],
      exerciseCount.value,
    )

    grammarPracticeStore.setExercises(exercises)
    grammarPracticeStore.setGrammarNames(selectedGrammars.value.map((g) => g.name).join(', '))
    grammarPracticeStore.setDeckName(selectedDeck.value?.name || '')
    grammarPracticeStore.resetSession()

    router.push({ name: 'GrammarPractice' })
  } catch (error) {
    console.error('Failed to generate exercises:', error)
    alert('Failed to generate exercises. Please check your API key and connection.')
  } finally {
    isGenerating.value = false
  }
}

function goBack() {
  router.push({ name: 'GrammarSetList' })
}

onMounted(() => {
  loadData()
  applyBackendConfig()
})

// Apply the backend configuration immediately when backend selection changes
watch(selectedBackend, () => {
  applyBackendConfig()
})
</script>

<style scoped>
/* Custom scrollbar for deck list */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
    width: 50%;
  }
  100% {
    transform: translateX(200%);
    width: 50%;
  }
}
.animate-progress-indeterminate {
  animation: progress-indeterminate 1.5s infinite linear;
}
</style>
