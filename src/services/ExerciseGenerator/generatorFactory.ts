import { OpenAIExerciseGenerator } from './openAIExerciseGenerator'
import { LocalLLMExerciseGenerator } from './localLLMExerciseGenerator'
import type { ExerciseGeneratorInterface } from './exerciseGeneratorInterface'
import { StaticExerciseGenerator } from './staticExerciseGenerator'

export type LLMBackend = 'openrouter' | 'openai' | 'local' | 'static'

export function getExerciseGenerator(backend: LLMBackend): ExerciseGeneratorInterface {
  switch (backend) {
    case 'static':
      return StaticExerciseGenerator.getInstance()
    case 'local':
      return LocalLLMExerciseGenerator.getInstance()
    case 'openai':
    case 'openrouter':
    default:
      return OpenAIExerciseGenerator.getInstance()
  }
}
