import { defineStore } from 'pinia'

export const useOpenAIStore = defineStore('openai', {
  state: () => ({
    apiKey: '',
    baseURL: '',
    model: 'gpt-3.5-turbo',
  }),
  actions: {
    setApiKey(key: string) {
      this.apiKey = key
    },
    setBaseURL(url: string) {
      this.baseURL = url
    },
    setModel(model: string) {
      this.model = model
    },
  },
  getters: {
    getApiKey: (state) => state.apiKey,
    getBaseURL: (state) => state.baseURL,
    getModel: (state) => state.model,
  },
})
