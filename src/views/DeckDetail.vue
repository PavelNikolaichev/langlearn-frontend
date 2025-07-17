<template>
  <div class="p-6">
    <button @click="goBack" class="text-blue-600 mb-4">← Back to Decks</button>
    <h1 class="text-2xl font-bold mb-2">{{ deck?.name }}</h1>
    <p class="mb-4 text-gray-700">{{ deck?.description }}</p>

    <h2 class="text-xl mb-2">Flashcards</h2>
    <div v-if="loading" class="text-gray-500">Loading...</div>
    <ul v-else>
      <li
        v-for="card in flashcards"
        :key="card.id"
        class="p-4 border rounded mb-2 flex justify-between items-center"
      >
        <div>
          <p class="font-semibold">{{ card.front }}</p>
          <p class="text-sm text-gray-600">{{ card.back }}</p>
        </div>
        <button @click="remove(card.id)" class="text-red-600 hover:underline">Delete</button>
      </li>
    </ul>

    <div class="mt-6">
      <h3 class="text-lg mb-2">Add Flashcard</h3>
      <input v-model="newCard.front" placeholder="Front" class="border p-2 rounded w-full mb-2" />
      <input v-model="newCard.back" placeholder="Back" class="border p-2 rounded w-full mb-2" />
      <textarea
        v-model="newCard.notes"
        placeholder="Notes (optional)"
        class="border p-2 rounded w-full mb-2"
      />
      <button @click="add" class="bg-green-600 text-white px-4 py-2 rounded">Add</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchFlashcards, createFlashcard, deleteFlashcard } from '@/services/flashcardService'
import { fetchDeckById } from '@/services/deckService'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const deckId = route.params.id as string

interface Deck {
  id: string
  name: string
  description?: string
}

interface Flashcard {
  id: string
  front: string
  back: string
  notes?: string
}

const deck = ref<Deck | null>(null)
const flashcards = ref<Flashcard[]>([])
const loading = ref(false)
const newCard = ref<Partial<Flashcard>>({ front: '', back: '', notes: '' })

async function load() {
  loading.value = true
  deck.value = await fetchDeckById(deckId)
  flashcards.value = await fetchFlashcards(deckId)
  loading.value = false
}

async function add() {
  if (!newCard.value.front || !newCard.value.back) return
  await createFlashcard(deckId, newCard.value)
  newCard.value = { front: '', back: '', notes: '' }
  load()
}

async function remove(id: string) {
  await deleteFlashcard(deckId, id)
  load()
}

function goBack() {
  router.push({ name: 'DeckList' })
}

onMounted(load)
</script>
