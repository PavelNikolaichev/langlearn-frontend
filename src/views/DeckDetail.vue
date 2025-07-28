<template>
  <UiContainer>
    <DeckHeader
      v-if="deck"
      :deck="deck"
      :card-count="flashcards.length"
      @back="goBack"
      @practice="startPractice"
    />

    <div class="grid grid-cols-1 gap-8 md:grid-cols-5">
      <div class="md:col-span-3">
        <FlashcardList :flashcards="flashcards" :loading="loading" @delete="remove" />
      </div>

      <div class="md:col-span-2">
        <FlashcardForm @submit="add" />
      </div>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  fetchFlashcards,
  createFlashcard,
  deleteFlashcard,
  type Flashcard,
} from '@/services/flashcardService'
import { fetchDeckById, type Deck } from '@/services/deckService'
import { useRoute, useRouter } from 'vue-router'
import DeckHeader from '@/components/Deck/DeckHeader.vue'
import FlashcardList from '@/components/Flashcard/FlashcardList.vue'
import FlashcardForm from '@/components/Flashcard/FlashcardForm.vue'
import UiContainer from '@/components/ui/Container.vue'

const route = useRoute()
const router = useRouter()
const deckId = route.params.id as string

const deck = ref<Deck | null>(null)
const flashcards = ref<Flashcard[]>([])
const loading = ref(false)

async function load() {
  loading.value = true
  deck.value = await fetchDeckById(deckId)
  flashcards.value = await fetchFlashcards(deckId)
  loading.value = false
}

async function add(formData: { front: string; back: string; notes: string }) {
  await createFlashcard(deckId, formData)
  load()
}

async function remove(id: string) {
  await deleteFlashcard(deckId, id)
  load()
}

function goBack() {
  router.push({ name: 'DeckList' })
}

function startPractice() {
  router.push({ name: 'DeckPractice', params: { id: deckId } })
}

onMounted(load)
</script>
