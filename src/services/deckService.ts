import api from './api'

export async function fetchDecks() {
  const response = await api.get('/decks')
  return response.data
}

export async function createDeck(deck: any) {
  const response = await api.post('/decks', deck)
  return response.data
}
