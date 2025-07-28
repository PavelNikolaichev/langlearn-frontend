<template>
  <div>
    <h2 class="text-xl font-semibold mb-4 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
      Flashcards
    </h2>

    <div v-if="loading" class="my-8">
      <UiLoadingDots color="primary" />
    </div>

    <div v-else-if="!flashcards.length" class="text-center py-8 bg-gray-50 rounded-lg">
      <p class="text-gray-500">No flashcards in this deck yet.</p>
    </div>

    <div v-else class="space-y-3">
      <FlashcardItem
        v-for="card in flashcards"
        :key="card.id"
        :flashcard="card"
        @delete="$emit('delete', card.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import FlashcardItem from '@/components/Flashcard/FlashcardItem.vue'
import UiLoadingDots from '@/components/ui/LoadingDots.vue'

interface Flashcard {
  id: string
  front: string
  back: string
  notes?: string
}

defineProps({
  flashcards: {
    type: Array as () => Flashcard[],
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['delete'])
</script>
