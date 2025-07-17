<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Your Decks</h1>
    <button @click="showNew = true" class="bg-blue-600 text-white px-4 py-2 rounded mb-4">
      New Deck
    </button>

    <div v-if="loading" class="text-gray-500">Loading decks...</div>
    <ul v-else>
      <li
        v-for="deck in decks"
        :key="deck.id"
        class="p-4 border rounded mb-2 hover:bg-gray-50 cursor-pointer"
        @click="goToDetail(deck.id || '')"
      >
        <h2 class="font-semibold">{{ deck.name }}</h2>
        <p class="text-sm text-gray-600">{{ deck.description }}</p>
      </li>
    </ul>

    <div v-if="showNew" class="mt-6">
      <h2 class="text-xl mb-2">Create New Deck</h2>
      <input v-model="newDeck.name" placeholder="Name" class="border p-2 rounded w-full mb-2" />
      <textarea
        v-model="newDeck.description"
        placeholder="Description"
        class="border p-2 rounded w-full mb-2"
      />
      <button @click="handleCreateDeck" class="bg-green-600 text-white px-4 py-2 rounded">
        Create
      </button>
      <button @click="showNew = false" class="ml-2">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchDecks, createDeck, type Deck } from '@/services/deckService'
import { useRouter } from 'vue-router'

const decks = ref<Deck[]>([])
const loading = ref(false)
const showNew = ref(false)
const newDeck = ref<Deck>({ id: '', name: '', description: '' })
const router = useRouter()

async function load() {
  loading.value = true
  decks.value = await fetchDecks()
  loading.value = false
}

function goToDetail(id: string) {
  router.push({ name: 'DeckDetail', params: { id } })
}

async function handleCreateDeck() {
  if (!newDeck.value.name) return

  await createDeck(newDeck.value)

  newDeck.value = { id: '', name: '', description: '' }
  showNew.value = false

  load()
}

onMounted(load)
</script>
