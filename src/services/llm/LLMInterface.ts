import type { ResponseFormatJSONSchema } from 'openai/resources'

export interface LLMInterface {
  /**
   * Get a text (or structured) response from the underlying LLM.
   * @param prompt User/content prompt.
   * @param system_prompt Optional system / instruction prompt.
   * @param output_format Optional OpenAI style JSON schema / response_format (only respected by backends that support it).
   */
  getResponse(
    prompt: string,
    system_prompt?: string,
    output_format?: ResponseFormatJSONSchema,
  ): Promise<string>
}
