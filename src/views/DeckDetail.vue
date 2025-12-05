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
import { onMounted, computed } from 'vue'
import { useDeckStore } from '@/stores/deck'
import { useFlashcardStore } from '@/stores/flashcard'
import { useRoute, useRouter } from 'vue-router'
import DeckHeader from '@/components/Deck/DeckHeader.vue'
import FlashcardList from '@/components/Flashcard/FlashcardList.vue'
import FlashcardForm from '@/components/Flashcard/FlashcardForm.vue'
import UiContainer from '@/components/ui/Container.vue'

const route = useRoute()
const router = useRouter()
const deckId = route.params.id as string

const deckStore = useDeckStore()
const flashcardStore = useFlashcardStore()

const deck = computed(() => deckStore.currentDeck)
const flashcards = computed(() => flashcardStore.flashcards)
const loading = computed(() => deckStore.loading || flashcardStore.loading)

async function load() {
  await deckStore.fetchDeckById(deckId)
  await flashcardStore.fetchFlashcards(deckId)
}

async function add(formData: { front: string; back: string; notes: string }) {
  await flashcardStore.createFlashcard(deckId, formData)
}

async function remove(id: string) {
  await flashcardStore.deleteFlashcard(deckId, id)
}

function goBack() {
  router.push({ name: 'DeckList' })
}

function startPractice() {
  router.push({ name: 'DeckPractice', params: { id: deckId } })
}

onMounted(load)
</script>
