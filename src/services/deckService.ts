import api from './api'

export interface Deck {
  id?: string
  name: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export async function fetchDecks() {
  const response = await api.get('/decks')
  return response.data
}

export async function fetchDeckById(id: string) {
  const response = await api.get(`/decks/${id}`)
  return response.data
}

export async function createDeck(deck: Deck): Promise<Deck> {
  const response = await api.post('/decks', deck)
  return response.data
}
