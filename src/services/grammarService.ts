import api from './api'

export interface GrammarSet {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Grammar {
  id: string
  term: string
  definition: string
  example?: string
  createdAt: string
  updatedAt: string
}

export async function fetchGrammarSets(): Promise<GrammarSet[]> {
  const response = await api.get<GrammarSet[]>(`/grammarsets`)
  return response.data
}

export async function createGrammarSet(data: Partial<GrammarSet>): Promise<GrammarSet> {
  const response = await api.post<GrammarSet>(`/grammarsets`, data)
  return response.data
}

export async function deleteGrammarSet(id: string): Promise<void> {
  await api.delete(`/grammarsets/${id}`)
}

export async function fetchGrammars(setId: string): Promise<Grammar[]> {
  const response = await api.get<Grammar[]>(`/grammarsets/${setId}/grammars`)
  return response.data
}

export async function createGrammar(setId: string, data: Partial<Grammar>): Promise<Grammar> {
  const response = await api.post<Grammar>(`/grammarsets/${setId}/grammars`, data)
  return response.data
}
