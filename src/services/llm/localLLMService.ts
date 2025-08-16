import { pipeline, env, type ProgressInfo, TextGenerationPipeline } from '@huggingface/transformers'
import type { LLMInterface } from './LLMInterface'

// Configure to run in browser with WebAssembly
env.allowLocalModels = false
env.useBrowserCache = true

let textGenerator: TextGenerationPipeline | null = null
let isLoading = false

// TODO: add custom model loading and hf token options input to load gemma
const MODEL_NAME = 'onnx-community/Qwen3-4B-ONNX'

export class LocalLLMService implements LLMInterface {
  private static instance: LocalLLMService

  public static getInstance(): LocalLLMService {
    if (!LocalLLMService.instance) {
      LocalLLMService.instance = new LocalLLMService()
    }

    return LocalLLMService.instance
  }

  public async initializeModel(): Promise<void> {
    if (textGenerator || isLoading) {
      return
    }

    isLoading = true
    try {
      console.log('Loading language model...')
      let lastProgress = -1
      // @ts-expect-error - pipeline is too vague in return type due to being a factory
      textGenerator = await pipeline('text-generation', MODEL_NAME, {
        device: 'auto',
        dtype: 'q4f16',
        progress_callback: (progress: ProgressInfo) => {
          // TODO: fair comparison of types with ProgressStatusInfo
          if ('progress' in progress) {
            const current = Number(progress?.progress || 0)
            if (Math.floor(current) !== Math.floor(lastProgress)) {
              console.log(`Model loading progress: ${Math.floor(current)}%`)
              lastProgress = current
            }
          }
        },
      })
      console.log('Model loaded successfully')
    } catch (error) {
      console.warn('Failed to load the model:', error)
    } finally {
      isLoading = false
    }
  }

  async isModelReady(): Promise<boolean> {
    return !!textGenerator
  }

  async isModelLoading(): Promise<boolean> {
    return isLoading
  }

  async getResponse(prompt: string): Promise<string> {
    if (!textGenerator) {
      await this.initializeModel()
    }

    try {
      if (textGenerator) {
        const response = (await textGenerator(prompt, {
          max_new_tokens: 1024,
          temperature: 0.7,
          do_sample: true,
          return_full_text: false,
        })) as Array<{ generated_text: string }>

        console.log('LLM response:', response)
        return response[0].generated_text.trim()
      } else {
        throw new Error('Text generator was not initialized')
      }
    } catch (error) {
      console.error('Error generating response:', error)
      throw new Error('Failed to generate response from LLM')
    }
  }
}
