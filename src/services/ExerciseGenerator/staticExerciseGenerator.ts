import type { Flashcard } from '@/api'
import type { Grammar } from '@/api'
import type { GrammarExercise } from '@/stores/grammar'
import type { ExerciseGeneratorInterface } from './exerciseGeneratorInterface'

export class StaticExerciseGenerator implements ExerciseGeneratorInterface {
  private static instance: StaticExerciseGenerator
  public name = 'StaticExerciseGenerator'

  public static getInstance(): StaticExerciseGenerator {
    if (!StaticExerciseGenerator.instance) {
      StaticExerciseGenerator.instance = new StaticExerciseGenerator()
    }
    return StaticExerciseGenerator.instance
  }

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
    // More realistic static data templates
    const vocabWord = vocabulary.length > 0 ? vocabulary[index % vocabulary.length] : 'apple'

    const templates = {
      'fill-blank': {
        question: `Complete the sentence focusing on ${grammar.name}: "I _____ (${vocabWord}) yesterday."`,
        correctAnswer: `ate ${vocabWord}`,
        explanation: `In this context, we use the past tense form for ${grammar.name}.`,
        options: [],
      },
      'multiple-choice': {
        question: `Choose the correct form for ${grammar.name} using the word "${vocabWord}":`,
        options: [`I ${vocabWord}s`, `I ${vocabWord}ing`, `I ${vocabWord}ed`, `I ${vocabWord}`],
        correctAnswer: `I ${vocabWord}ed`,
        explanation: `The correct conjugation for ${grammar.name} here is the past tense.`,
      },
      'error-correction': {
        question: `Correct the error in this sentence regarding ${grammar.name}: "She ${vocabWord}ed to the store."`,
        correctAnswer: `She went to the store.`,
        explanation: `The verb "${vocabWord}" might be irregular, or the structure requires a different form for ${grammar.name}.`,
        options: [],
      },
    }

    const template = templates[type]

    return {
      id: `static-${index}-${Date.now()}`,
      type,
      grammar: grammar.name,
      vocabulary: [vocabWord],
      question: template.question,
      correctAnswer: template.correctAnswer,
      explanation: template.explanation,
      options: template.options,
    }
  }
}
