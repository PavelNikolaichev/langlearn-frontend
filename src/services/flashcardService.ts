import api from './api'

export interface Flashcard {
  id: string
  front: string
  back: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export async function fetchFlashcards(deckId: string): Promise<Flashcard[]> {
  const response = await api.get<Flashcard[]>(`/decks/${deckId}/flashcards`)
  return response.data
}

export async function createFlashcard(
  deckId: string,
  data: Partial<Flashcard>,
): Promise<Flashcard> {
  const response = await api.post<Flashcard>(`/decks/${deckId}/flashcards`, data)
  return response.data
}

export async function deleteFlashcard(deckId: string, flashcardId: string): Promise<void> {
  await api.delete(`/decks/${deckId}/flashcards/${flashcardId}`)
}
