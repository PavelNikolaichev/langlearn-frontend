import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type LLMProvider = 'openai' | 'openrouter' | 'local' | 'static'

interface ProviderConfig {
  apiKey?: string
  baseURL: string
  model: string
}

export const useLLMConfigStore = defineStore('llmConfig', () => {
  // State
  const activeProvider = ref<LLMProvider>(
    (localStorage.getItem('llmProvider') as LLMProvider) || 'openrouter',
  )

  const configs = ref<Record<LLMProvider, ProviderConfig>>({
    openai: {
      apiKey: sessionStorage.getItem('openai_apiKey') || '',
      baseURL: localStorage.getItem('openai_baseURL') || 'https://api.openai.com/v1',
      model: localStorage.getItem('openai_model') || 'gpt-4o',
    },
    openrouter: {
      apiKey: sessionStorage.getItem('openrouter_apiKey') || '',
      baseURL: localStorage.getItem('openrouter_baseURL') || 'https://openrouter.ai/api/v1',
      model: localStorage.getItem('openrouter_model') || 'anthropic/claude-3.5-sonnet',
    },
    local: {
      baseURL: localStorage.getItem('local_baseURL') || 'http://localhost:1234/v1',
      model: localStorage.getItem('local_model') || 'local-model',
    },
    static: {
      baseURL: '',
      model: '',
    },
  })

  // Getters
  const currentConfig = computed(() => configs.value[activeProvider.value])

  // Actions
  function setActiveProvider(provider: LLMProvider) {
    activeProvider.value = provider
    localStorage.setItem('llmProvider', provider)
  }

  function updateConfig(
    provider: LLMProvider,
    updates: Partial<ProviderConfig>,
    persistKey = false,
  ) {
    const config = configs.value[provider]
    if (updates.apiKey !== undefined) {
      config.apiKey = updates.apiKey
      if (persistKey) {
        // User explicitly requested persistence (e.g. "Remember me" checkbox - not implemented yet, but good for future)
        // For now, we stick to sessionStorage for security as requested
        sessionStorage.setItem(`${provider}_apiKey`, updates.apiKey)
      } else {
        sessionStorage.setItem(`${provider}_apiKey`, updates.apiKey)
      }
    }
    if (updates.baseURL !== undefined) {
      config.baseURL = updates.baseURL
      localStorage.setItem(`${provider}_baseURL`, updates.baseURL)
    }
    if (updates.model !== undefined) {
      config.model = updates.model
      localStorage.setItem(`${provider}_model`, updates.model)
    }
  }

  return {
    activeProvider,
    configs,
    currentConfig,
    setActiveProvider,
    updateConfig,
  }
})
