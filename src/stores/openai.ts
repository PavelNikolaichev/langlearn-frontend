import { defineStore } from 'pinia'

export const useOpenAIStore = defineStore('openai', {
  state: () => ({
    apiKey: '', // User must supply their OpenRouter API key at runtime
    baseURL: localStorage.getItem('openAIBaseURL') || 'https://openrouter.ai/api/v1',
    model: localStorage.getItem('openAIModel') || 'x-ai/grok-4-fast:free', // or nvidia/nemotron-nano-9b-v2:free
  }),
  actions: {
    setApiKey(key: string) {
      this.apiKey = key
    },
    setBaseURL(url: string) {
      this.baseURL = url
      localStorage.setItem('openAIBaseURL', url)
    },
    setModel(model: string) {
      this.model = model
      localStorage.setItem('openAIModel', model)
    },
  },
  getters: {
    getApiKey: (state) => state.apiKey,
    getBaseURL: (state) => state.baseURL,
    getModel: (state) => state.model,
  },
})
