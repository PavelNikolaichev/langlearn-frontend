import type { GrammarExercise } from '@/stores/grammar'
import type { Flashcard } from '@/api'
import type { Grammar } from '@/api'
import { LocalLLMService } from '../llm/localLLMService'
import type { ExerciseGeneratorInterface } from './exerciseGeneratorInterface'

export class LocalLLMExerciseGenerator implements ExerciseGeneratorInterface {
  public name = 'LocalLLMExerciseGenerator'

  private static instance: LocalLLMExerciseGenerator
  private textGenerator: LocalLLMService

  public static getInstance(): LocalLLMExerciseGenerator {
    if (!LocalLLMExerciseGenerator.instance) {
      LocalLLMExerciseGenerator.instance = new LocalLLMExerciseGenerator()
    }

    return LocalLLMExerciseGenerator.instance
  }

  private constructor() {
    this.textGenerator = LocalLLMService.getInstance()
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

      try {
        const exercise = await this.generateSingleExercise(grammar, vocabWords, exerciseType)
        exercises.push({
          ...exercise,
          id: `exercise-${Date.now()}-${i}`,
          grammar: grammar.name,
        })
      } catch (error) {
        console.warn('Failed to generate exercise:', error)
      }
    }

    return exercises
  }

  private async generateSingleExercise(
    grammar: Grammar,
    vocabulary: string[],
    type: GrammarExercise['type'],
  ): Promise<Omit<GrammarExercise, 'id' | 'grammar'>> {
    const vocabHint =
      vocabulary.length > 0
        ? `Use some of these vocabulary words if appropriate: ${vocabulary.slice(0, 5).join(', ')}.`
        : 'Use common, practical vocabulary.'

    const prompt = this.createPrompt(grammar, type, vocabHint)

    if (!this.textGenerator) {
      throw new Error('Text generator not initialized')
    }

    const response = await this.textGenerator.getResponse(prompt)

    return this.parseExerciseResponse(response, type, vocabulary)
  }

  private createPrompt(grammar: Grammar, type: GrammarExercise['type'], vocabHint: string): string {
    const typeInstructions: Record<GrammarExercise['type'], string> = {
      'fill-blank':
        'Create a fill-in-the-blank exercise with one missing word. Show the sentence with a blank (_____) and provide the correct answer.',
      'multiple-choice':
        'Create a multiple choice question with 4 options (A, B, C, D). One should be correct.',
      'error-correction':
        'Create a sentence with a grammatical error that students need to identify and correct.',
    }

    return `Create a ${type} grammar exercise for "${grammar.name}".
${grammar.description ? `Grammar rule: ${grammar.description}` : ''}
${typeInstructions[type]}
${vocabHint}

Format your response exactly as:
QUESTION: [the question/sentence]
${type === 'multiple-choice' ? 'OPTIONS: A) option1 B) option2 C) option3 D) option4' : ''}
ANSWER: [correct answer]
EXPLANATION: [brief explanation of the grammar rule]

Example for fill-blank:
QUESTION: She _____ to school every day.
ANSWER: goes
EXPLANATION: Present simple tense with third person singular takes -s ending.`
  }

  private parseExerciseResponse(
    response: string,
    type: GrammarExercise['type'],
    vocabulary: string[],
  ): Omit<GrammarExercise, 'id' | 'grammar'> {
    try {
      // Why we don't use tool calling - it's too much for a local model in browser to handle, manual parsing one is more reliable.
      const questionMatch = response.match(/QUESTION:\s*(.+?)(?=\n|OPTIONS:|ANSWER:|$)/s)
      const answerMatch = response.match(/ANSWER:\s*(.+?)(?=\n|EXPLANATION:|$)/s)
      const explanationMatch = response.match(/EXPLANATION:\s*(.+?)$/s)
      const optionsMatch = response.match(/OPTIONS:\s*(.+?)(?=\n|ANSWER:|$)/s)

      const question = questionMatch?.[1]?.trim() || 'Grammar exercise question'
      const correctAnswer = answerMatch?.[1]?.trim() || 'answer'
      const explanation = explanationMatch?.[1]?.trim() || 'Grammar explanation'

      let options: string[] | undefined
      if (type === 'multiple-choice' && optionsMatch) {
        options = optionsMatch[1]
          .split(/[ABCD]\)/)
          .slice(1)
          .map((opt) => opt.trim())
          .filter((opt) => opt.length > 0)
      }

      return {
        type,
        question,
        options,
        correctAnswer,
        explanation,
        vocabulary: this.extractUsedVocabulary(question + ' ' + correctAnswer, vocabulary),
      }
    } catch (error) {
      console.warn('Failed to parse LLM response:', error)
      throw error
    }
  }

  private getRandomExerciseType(): GrammarExercise['type'] {
    const types: GrammarExercise['type'][] = ['fill-blank', 'multiple-choice', 'error-correction']
    return types[Math.floor(Math.random() * types.length)]
  }

  private extractUsedVocabulary(text: string, vocabulary: string[]): string[] {
    return vocabulary.filter((word) => text.toLowerCase().includes(word.toLowerCase()))
  }

  isModelLoaded(): boolean {
    return this.textGenerator !== null
  }
}
