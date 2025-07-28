import api from './api'
import type { Flashcard } from './flashcardService'

export interface Deck {
  id?: string
  name: string
  flashcards: Flashcard[]
  description?: string
  createdAt?: string
  updatedAt?: string
}

export async function fetchDecks(): Promise<Deck[]> {
  const response = await api.get('/decks')
  return response.data
}

export async function fetchDeckById(id: string): Promise<Deck> {
  const response = await api.get(`/decks/${id}`)
  return response.data
}

export async function createDeck(data: Partial<Deck>): Promise<Deck> {
  const response = await api.post<Deck>('/decks', data)
  return response.data
}

export async function deleteDeck(id: string): Promise<void> {
  await api.delete(`/decks/${id}`)
}
