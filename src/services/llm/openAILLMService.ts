import type { LLMInterface } from './LLMInterface'
import { useOpenAIStore } from '@/stores/openai'

import OpenAI from 'openai'
import type {
  ChatCompletionUserMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionMessageParam,
  ResponseFormatJSONSchema,
} from 'openai/resources'

export class OpenAILLMService implements LLMInterface {
  private static instance: OpenAILLMService
  private openAIStore = useOpenAIStore()
  private openaiClient: OpenAI

  public static getInstance(): OpenAILLMService {
    if (!OpenAILLMService.instance) {
      OpenAILLMService.instance = new OpenAILLMService()
    }

    return OpenAILLMService.instance
  }

  private constructor() {
    this.openaiClient = new OpenAI({
      apiKey: this.openAIStore.getApiKey,
      baseURL: this.openAIStore.getBaseURL,
      dangerouslyAllowBrowser: true,
    })
    console.log(
      `OpenAI client initialized with baseURL: ${this.openAIStore.getBaseURL} and model: ${this.openAIStore.getModel}`,
    )
  }

  async getResponse(
    prompt: string,
    system_prompt?: string,
    output_format?: ResponseFormatJSONSchema,
  ): Promise<string> {
    try {
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

      const response = await this.openaiClient.chat.completions.create({
        model: this.openAIStore.getModel,
        messages: messages,
        response_format: output_format,
      })

      if (response.choices && response.choices.length > 0 && response.choices[0].message.content) {
        console.log(`Generated response: ${response.choices[0].message.content}`)
        return response.choices[0].message.content
      }

      throw new Error('No valid response received')
    } catch (error) {
      console.error(`Error fetching response from ${this.openAIStore.getBaseURL}:`, error)
      throw new Error('Failed to get response from OpenAI API')
    }
  }
}
