import type { Flashcard } from '../flashcardService'
import type { Grammar } from '../grammarService'
import type { GrammarExercise } from '@/stores/grammar'

export interface ExerciseGeneratorInterface {
  name: string

  generateGrammarExercises(
    grammars: Array<Grammar>,
    vocabulary?: Array<Flashcard>,
    count?: number,
  ): Promise<GrammarExercise[]>
}
