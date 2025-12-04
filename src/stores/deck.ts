import { defineStore } from 'pinia'
import { apiClient } from '@/services/api'
import type { Deck } from '@/api'

export const useDeckStore = defineStore('deck', {
  state: () => ({
    decks: [] as Deck[],
    currentDeck: null as Deck | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchDecks() {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.decksGet()
        this.decks = (response.data as Deck[]) || []
      } catch (err) {
        this.error = 'Failed to fetch decks'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchDeckById(id: string) {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.decksIdGet({ id })
        this.currentDeck = response.data as Deck
        return this.currentDeck
      } catch (err) {
        this.error = 'Failed to fetch deck'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async createDeck(deck: Partial<Deck>) {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.decksPost({ deck: deck as Deck })
        const createdDeck = response.data as Deck
        this.decks.push(createdDeck)
        return createdDeck
      } catch (err) {
        this.error = 'Failed to create deck'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteDeck(id: string) {
      this.loading = true
      this.error = null
      try {
        await apiClient.decksIdDelete({ id })
        this.decks = this.decks.filter((d) => d.id !== id)
        if (this.currentDeck?.id === id) {
          this.currentDeck = null
        }
      } catch (err) {
        this.error = 'Failed to delete deck'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
