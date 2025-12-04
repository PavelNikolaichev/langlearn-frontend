import * as z from 'zod'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface GrammarExercise {
  id: string
  type: 'fill-blank' | 'multiple-choice' | 'error-correction'
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  grammar: string
  vocabulary?: string[]
}

export const grammarSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['fill-blank', 'multiple-choice', 'error-correction']),
  question: z.string().max(500),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string(),
  explanation: z.string().max(500),
  grammar: z.string().max(300),
  vocabulary: z.array(z.string()).min(1).optional(),
})

export const useGrammarPracticeStore = defineStore('grammarPractice', () => {
  // State
  const exercises = ref<GrammarExercise[]>([])
  const grammarNames = ref('')
  const deckName = ref('')
  const currentExerciseIndex = ref(0)
  const correctAnswers = ref(0)
  const sessionCompleted = ref(false)

  // Actions
  function setExercises(newExercises: GrammarExercise[]) {
    exercises.value = newExercises
  }

  function setGrammarNames(names: string) {
    grammarNames.value = names
  }

  function setDeckName(name: string) {
    deckName.value = name
  }

  function resetSession() {
    currentExerciseIndex.value = 0
    correctAnswers.value = 0
    sessionCompleted.value = false
  }

  function nextExercise() {
    if (currentExerciseIndex.value < exercises.value.length - 1) {
      currentExerciseIndex.value++
    } else {
      sessionCompleted.value = true
    }
  }

  function incrementCorrectAnswers() {
    correctAnswers.value++
  }

  function restartSession() {
    resetSession()
    // Shuffle exercises for variety
    for (let i = exercises.value.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[exercises.value[i], exercises.value[j]] = [exercises.value[j], exercises.value[i]]
    }
  }

  return {
    // State
    exercises,
    grammarNames,
    deckName,
    currentExerciseIndex,
    correctAnswers,
    sessionCompleted,
    // Actions
    setExercises,
    setGrammarNames,
    setDeckName,
    resetSession,
    nextExercise,
    incrementCorrectAnswers,
    restartSession,
  }
})
