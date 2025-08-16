export interface LLMInterface {
  getResponse(prompt: string): Promise<string>
}
