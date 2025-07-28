<template>
  <div class="mb-6">
    <div class="flex justify-between items-center mb-2">
      <UiButton variant="secondary" size="sm" @click="$emit('back')" class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Decks
      </UiButton>
    </div>

    <UiCard>
      <template #title>
        <div class="flex justify-between items-center">
          <h1>{{ deck.name }}</h1>
          <div class="flex items-center space-x-3">
            <div class="text-sm text-gray-500">{{ cardCount }} cards</div>
            <UiButton
              v-if="cardCount > 0"
              @click="$emit('practice')"
              size="sm"
              class="bg-green-600 hover:bg-green-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Practice
            </UiButton>
          </div>
        </div>
      </template>
      <template #content>
        <p v-if="deck.description">{{ deck.description }}</p>
        <p v-else class="text-gray-500 italic">No description provided</p>
      </template>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import UiCard from '@/components/ui/Card.vue'
import UiButton from '@/components/ui/Button.vue'
import type { Deck } from '@/services/deckService'

defineProps({
  deck: {
    type: Object as () => Deck,
    required: true,
  },
  cardCount: {
    type: Number,
    default: 0,
  },
})

defineEmits(['back', 'practice'])
</script>
