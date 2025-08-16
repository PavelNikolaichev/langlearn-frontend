import type { Flashcard } from '../flashcardService'
import type { Grammar } from '../grammarService'
import type { GrammarExercise } from '@/stores/grammar'

export interface ExerciseGeneratorInterface {
  name: string // Name to use in the future for Strategy/Factory or smth -> Displayed for user in the settings.

  generateGrammarExercises(
    grammars: Array<Grammar>,
    vocabulary?: Array<Flashcard>,
    count?: number,
  ): Promise<GrammarExercise[]>
}
