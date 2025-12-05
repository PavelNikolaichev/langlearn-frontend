import type { LLMInterface } from './LLMInterface'
import { useLLMConfigStore, type LLMProvider } from '@/stores/llmConfig'

import OpenAI from 'openai'
import type {
  ChatCompletionUserMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionMessageParam,
  ResponseFormatJSONSchema,
} from 'openai/resources'

export class OpenAILLMService implements LLMInterface {
  private static instance: OpenAILLMService
  private llmStore = useLLMConfigStore()

  public static getInstance(): OpenAILLMService {
    if (!OpenAILLMService.instance) {
      OpenAILLMService.instance = new OpenAILLMService()
    }

    return OpenAILLMService.instance
  }

  private constructor() {}

  private getClient(provider: LLMProvider): OpenAI {
    const config = this.llmStore.configs[provider]

    // Some custom endpoints might not require an API key, but the SDK might enforce it.
    // We pass a dummy key if it's missing, assuming the endpoint handles auth or doesn't need it.
    const apiKey = config.apiKey && config.apiKey.trim() !== '' ? config.apiKey : 'dummy-key'

    return new OpenAI({
      apiKey: apiKey,
      baseURL: config.baseURL,
      dangerouslyAllowBrowser: true,
    })
  }

  async getResponse(
    prompt: string,
    system_prompt?: string,
    output_format?: ResponseFormatJSONSchema,
  ): Promise<string> {
    const provider = this.llmStore.activeProvider
    // If static, we shouldn't be here, but just in case
    if (provider === 'static') {
      throw new Error('Cannot use OpenAILLMService with static provider')
    }

    const config = this.llmStore.configs[provider]
    const client = this.getClient(provider)

    try {
      console.log(`Sending request to ${config.baseURL} with model ${config.model}`)

      const messages: ChatCompletionMessageParam[] = [
        ...(system_prompt
          ? [
              {
                role: 'system',
                content: system_prompt,
                type: 'message',
              } as ChatCompletionSystemMessageParam,
            ]
          : []),
        { role: 'user', content: prompt, type: 'message' } as ChatCompletionUserMessageParam,
      ]

      const response = await client.chat.completions.create({
        model: config.model,
        messages: messages,
        response_format: output_format,
      })

      if (response.choices && response.choices.length > 0 && response.choices[0].message.content) {
        return response.choices[0].message.content
      }

      throw new Error('No valid response received from LLM')
    } catch (error: any) {
      console.error(`Error fetching response from ${config.baseURL}:`, error)

      // Enhance error message for the user
      let errorMessage = 'Failed to get response from AI provider.'

      if (error?.status === 401) {
        errorMessage = 'Authentication failed. Please check your API Key.'
      } else if (error?.status === 404) {
        errorMessage = 'Model or endpoint not found. Please check your configuration.'
      } else if (error?.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again later.'
      } else if (error?.message) {
        errorMessage = `AI Error: ${error.message}`
      }

      throw new Error(errorMessage)
    }
  }
}
