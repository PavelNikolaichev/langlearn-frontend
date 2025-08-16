export interface LLMInterface {
  generateResponse(prompt: string): Promise<string>
}
