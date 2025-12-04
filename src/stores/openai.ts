import { defineStore } from 'pinia'

export const useOpenAIStore = defineStore('openai', {
  state: () => ({
    apiKey: localStorage.getItem('openAIAPIKey') || '', // User must supply their OpenRouter API key at runtime - potentially harmful to store in localStorage
    baseURL: localStorage.getItem('openAIBaseURL') || 'https://openrouter.ai/api/v1',
    model: localStorage.getItem('openAIModel') || 'x-ai/grok-4-fast:free', // or nvidia/nemotron-nano-9b-v2:free
  }),
  actions: {
    setApiKey(key: string) {
      this.apiKey = key
      localStorage.setItem('openAIAPIKey', key)
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
