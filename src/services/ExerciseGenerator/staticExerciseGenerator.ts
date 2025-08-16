import type { Flashcard } from '../flashcardService'
import type { Grammar } from '../grammarService'
import type { GrammarExercise } from '@/stores/grammar'
import type { ExerciseGeneratorInterface } from './exerciseGeneratorInterface'

export class StaticExerciseGenerator implements ExerciseGeneratorInterface {
  public name = 'StaticExerciseGenerator'

  async generateGrammarExercises(
    grammars: Array<Grammar>,
    vocabulary?: Array<Flashcard>,
    count: number = 5,
  ): Promise<GrammarExercise[]> {
    const exercises: GrammarExercise[] = []
    const vocabWords = vocabulary?.map((v) => v.front) || []

    for (let i = 0; i < count; i++) {
      const grammar = grammars[i % grammars.length]
      const exerciseType = this.getRandomExerciseType()
      exercises.push(this.generateExercise(grammar, vocabWords, exerciseType, i))
    }

    return exercises
  }

  private getRandomExerciseType(): GrammarExercise['type'] {
    const types: GrammarExercise['type'][] = ['fill-blank', 'multiple-choice', 'error-correction']
    return types[Math.floor(Math.random() * types.length)]
  }

  private generateExercise(
    grammar: Grammar,
    vocabulary: string[],
    type: GrammarExercise['type'],
    index: number,
  ): GrammarExercise {
    const fallbackExercises = {
      'fill-blank': {
        question: `Complete the sentence using ${grammar.name}: The student _____ hard every day.`,
        correctAnswer: 'studies',
        explanation: `This demonstrates ${grammar.name} usage in present tense.`,
      },
      'multiple-choice': {
        question: `Which sentence correctly uses ${grammar.name}?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        explanation: `Option A correctly demonstrates ${grammar.name}.`,
      },
      'error-correction': {
        question: `Find and correct the error in: "I are student."`,
        correctAnswer: 'I am a student.',
        explanation: `The error involves ${grammar.name} - subject-verb agreement.`,
      },
    }

    const fallback = fallbackExercises[type]
    return {
      id: `fallback-${index}`,
      type,
      grammar: grammar.name,
      vocabulary: vocabulary.slice(0, 2),
      ...fallback,
    }
  }
}
