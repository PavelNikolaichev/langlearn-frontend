import { pipeline, env, type ProgressInfo } from '@huggingface/transformers'

// Configure to run in browser with WebAssembly
env.allowLocalModels = false
env.useBrowserCache = true

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let textGenerator: any = null // Using any for simplicity with Transformers.js
let isLoading = false

// TODO: add custom model loading and hf token input to load gemma
// const MODEL_NAME = 'google/gemma-3n-E4B'
const MODEL_NAME = 'onnx-community/Qwen2.5-0.5B-Instruct'
// const MODEL_NAME = 'onnx-community/gemma-3n-E2B-it-ONNX'

export interface GrammarExercise {
  id: string
  type: 'fill-blank' | 'multiple-choice' | 'transformation' | 'error-correction'
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  grammar: string
  vocabulary?: string[]
}

export class LLMService {
  private static instance: LLMService

  public static getInstance(): LLMService {
    if (!LLMService.instance) {
      LLMService.instance = new LLMService()
    }
    return LLMService.instance
  }

  async initializeModel(): Promise<void> {
    if (textGenerator || isLoading) return

    isLoading = true
    try {
      console.log('Loading language model...')
      textGenerator = await pipeline('text-generation', MODEL_NAME, {
        device: 'webgpu',
        dtype: 'q4',
        progress_callback: (progress: ProgressInfo) => {
          console.log(`Model loading progress: ${progress.progress || 0}%`)
        },
      })
      console.log('Model loaded successfully')
    } catch (error) {
      console.warn('Failed to load WebGPU model, falling back to CPU:', error)
      try {
        textGenerator = await pipeline('text-generation', MODEL_NAME, {
          device: 'wasm',
          dtype: 'q4',
          progress_callback: (progress: ProgressInfo) => {
            console.log(`Model loading progress on CPU: ${progress.progress || 0}%`)
          },
        })
        console.log('Model loaded successfully on CPU')
      } catch (cpuError) {
        console.error('Failed to load model:', cpuError)
        throw new Error('Could not initialize language model')
      }
    } finally {
      isLoading = false
    }
  }
  async generateGrammarExercises(
    grammars: Array<{ name: string; description?: string }>,
    vocabulary?: Array<{ front: string; back: string }>,
    count: number = 5,
  ): Promise<GrammarExercise[]> {
    if (!textGenerator) {
      await this.initializeModel()
    }

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
        console.warn('Failed to generate exercise, using fallback:', error)
        exercises.push(this.createFallbackExercise(grammar, vocabWords, exerciseType, i))
      }
    }

    return exercises
  }

  private async generateSingleExercise(
    grammar: { name: string; description?: string },
    vocabulary: string[],
    type: GrammarExercise['type'],
  ): Promise<Omit<GrammarExercise, 'id' | 'grammar'>> {
    const vocabHint =
      vocabulary.length > 0
        ? `Use some of these vocabulary words if appropriate: ${vocabulary.slice(0, 5).join(', ')}.`
        : 'Use common, practical vocabulary.'

    const prompt = this.createPrompt(grammar, type, vocabHint)

    if (!textGenerator) {
      throw new Error('Text generator not initialized')
    }

    const response = (await textGenerator(prompt, {
      max_new_tokens: 200,
      temperature: 0.7,
      do_sample: true,
      return_full_text: false,
    })) as Array<{ generated_text: string }>

    console.log('LLM response:', response)

    return this.parseExerciseResponse(response[0].generated_text, type, vocabulary)
  }

  private createPrompt(
    grammar: { name: string; description?: string },
    type: GrammarExercise['type'],
    vocabHint: string,
  ): string {
    const typeInstructions: Record<GrammarExercise['type'], string> = {
      'fill-blank':
        'Create a fill-in-the-blank exercise with one missing word. Show the sentence with a blank (_____) and provide the correct answer.',
      'multiple-choice':
        'Create a multiple choice question with 4 options (A, B, C, D). One should be correct.',
      transformation:
        'Create a sentence transformation exercise where students change one sentence to another form.',
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
    const types: GrammarExercise['type'][] = [
      'fill-blank',
      'multiple-choice',
      'transformation',
      'error-correction',
    ]
    return types[Math.floor(Math.random() * types.length)]
  }

  private extractUsedVocabulary(text: string, vocabulary: string[]): string[] {
    return vocabulary.filter((word) => text.toLowerCase().includes(word.toLowerCase()))
  }

  private createFallbackExercise(
    grammar: { name: string; description?: string },
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
      transformation: {
        question: `Transform this sentence using ${grammar.name}: "I am happy."`,
        correctAnswer: 'I was happy.',
        explanation: `This shows how ${grammar.name} changes the sentence structure.`,
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

  isModelLoaded(): boolean {
    return textGenerator !== null
  }

  isModelLoading(): boolean {
    return isLoading
  }
}

export const llmService = LLMService.getInstance()
