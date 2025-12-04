import { defineStore } from 'pinia'
import { apiClient } from '@/services/api'
import type { Flashcard } from '@/api'

export const useFlashcardStore = defineStore('flashcard', {
  state: () => ({
    // TODO: consider using flashcard DTO instead of casting
    flashcards: [] as Flashcard[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchFlashcards(deckId: string) {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.decksDeckIdFlashcardsGet({ deckId })

        this.flashcards = (response.data as Flashcard[]) || []
      } catch (err) {
        this.error = 'Failed to fetch flashcards'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async createFlashcard(deckId: string, flashcard: Partial<Flashcard>) {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.decksDeckIdFlashcardsPost({
          deckId,
          flashcard: flashcard as Flashcard,
        })

        const createdFlashcard = response.data as Flashcard
        this.flashcards.push(createdFlashcard)

        return createdFlashcard
      } catch (err) {
        this.error = 'Failed to create flashcard'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteFlashcard(deckId: string, flashcardId: string) {
      this.loading = true
      this.error = null
      try {
        await apiClient.decksDeckIdFlashcardsFlashcardIdDelete({ deckId, flashcardId })
        this.flashcards = this.flashcards.filter((f) => f.id !== flashcardId)
      } catch (err) {
        this.error = 'Failed to delete flashcard'
        console.error(err)
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
