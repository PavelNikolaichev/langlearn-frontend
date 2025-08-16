import type { LLMInterface } from './LLMInterface'
import { useOpenAIStore } from '@/stores/openai'

import OpenAI from 'openai'
import type {
  ChatCompletionUserMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionMessageParam,
  ResponseFormatJSONSchema,
} from 'openai/resources'

const openAIStore = useOpenAIStore()

const openaiClient = new OpenAI({
  apiKey: openAIStore.getApiKey,
  baseURL: openAIStore.getBaseURL,
})

export class OpenAILLMService implements LLMInterface {
  private static instance: OpenAILLMService

  public static getInstance(): OpenAILLMService {
    if (!OpenAILLMService.instance) {
      OpenAILLMService.instance = new OpenAILLMService()
    }

    return OpenAILLMService.instance
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

      const response = await openaiClient.chat.completions.create({
        model: openAIStore.getModel,
        messages: messages,
        response_format: output_format,
      })

      if (response.choices && response.choices.length > 0 && response.choices[0].message.content) {
        console.log(`Generated response: ${response.choices[0].message.content}`)
        return response.choices[0].message.content
      }

      throw new Error('No valid response received')
    } catch (error) {
      console.error(`Error fetching response from ${openAIStore.getBaseURL}:`, error)
      throw new Error('Failed to get response from OpenAI API')
    }
  }
}
