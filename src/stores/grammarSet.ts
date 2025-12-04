import { defineStore } from 'pinia'
import { apiClient } from '@/services/api'
import type { GrammarSet, Grammar } from '@/api'

export const useGrammarSetStore = defineStore('grammarSet', {
  state: () => ({
    grammarSets: [] as GrammarSet[],
    currentGrammarSet: null as GrammarSet | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchGrammarSets() {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.grammarsetsGet()
        this.grammarSets = (response.data as GrammarSet[]) || []
      } catch (err) {
        this.error = 'Failed to fetch grammar sets'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchGrammarSetById(id: string) {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.grammarsetsIdGet({ id })
        this.currentGrammarSet = response.data as GrammarSet
        return this.currentGrammarSet
      } catch (err) {
        this.error = 'Failed to fetch grammar set'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async createGrammarSet(grammarSet: Partial<GrammarSet>) {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.grammarsetsPost({ grammarSet: grammarSet as GrammarSet })
        const createdSet = response.data as GrammarSet

        this.grammarSets.push(createdSet)

        return createdSet
      } catch (err) {
        this.error = 'Failed to create grammar set'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteGrammarSet(id: string) {
      this.loading = true
      this.error = null
      try {
        await apiClient.grammarsetsIdDelete({ id })
        this.grammarSets = this.grammarSets.filter((s) => s.id !== id)
        if (this.currentGrammarSet?.id === id) {
          this.currentGrammarSet = null
        }
      } catch (err) {
        this.error = 'Failed to delete grammar set'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async createGrammar(setId: string, grammar: Partial<Grammar>) {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.grammarsetsSetIdGrammarsPost({
          setId,
          grammar: grammar as Grammar,
        })
        const createdGrammar = response.data as Grammar

        // Update local state if we have the set loaded
        const set = this.grammarSets.find((s) => s.id === setId)
        if (set) {
          if (!set.grammars) set.grammars = []
          set.grammars.push(createdGrammar)
        }
        if (this.currentGrammarSet && this.currentGrammarSet.id === setId) {
          if (!this.currentGrammarSet.grammars) this.currentGrammarSet.grammars = []
          this.currentGrammarSet.grammars.push(createdGrammar)
        }
        return createdGrammar
      } catch (err) {
        this.error = 'Failed to create grammar'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteGrammar(setId: string, grammarId: string) {
      this.loading = true
      this.error = null
      try {
        await apiClient.grammarsetsSetIdGrammarsGrammarIdDelete({ setId, grammarId })
        // Update local state
        const set = this.grammarSets.find((s) => s.id === setId)
        if (set && set.grammars) {
          set.grammars = set.grammars.filter((g) => g.id !== grammarId)
        }
        if (
          this.currentGrammarSet &&
          this.currentGrammarSet.id === setId &&
          this.currentGrammarSet.grammars
        ) {
          this.currentGrammarSet.grammars = this.currentGrammarSet.grammars.filter(
            (g) => g.id !== grammarId,
          )
        }
      } catch (err) {
        this.error = 'Failed to delete grammar'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchGrammarsForSet(setId: string) {
      try {
        const response = await apiClient.grammarsetsSetIdGrammarsGet({ setId })
        const grammars = response.data as Grammar[]

        const set = this.grammarSets.find((s) => s.id === setId)
        if (set) {
          set.grammars = grammars
        }

        return grammars
      } catch (err) {
        console.error(`Failed to fetch grammars for set ${setId}`, err)
        return []
      }
    },
  },
})
