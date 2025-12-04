import { OpenAIExerciseGenerator } from './openAIExerciseGenerator'
import { LocalLLMExerciseGenerator } from './localLLMExerciseGenerator'
import type { ExerciseGeneratorInterface } from './exerciseGeneratorInterface'

export type LLMBackend = 'openrouter' | 'openai' | 'local'

export function getExerciseGenerator(backend: LLMBackend): ExerciseGeneratorInterface {
  switch (backend) {
    case 'local':
      return LocalLLMExerciseGenerator.getInstance()
    case 'openai':
    case 'openrouter':
    default:
      return OpenAIExerciseGenerator.getInstance()
  }
}
