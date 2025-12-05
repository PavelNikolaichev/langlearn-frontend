<template>
  <div class="mb-8">
    <div class="mb-3">
      <button
        @click="$emit('back')"
        class="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
      >
        <div class="mr-2 p-1 rounded-full group-hover:bg-gray-200 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
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
        </div>
        Back to Decks
      </button>
    </div>

    <UiCard class="border-gray-100 overflow-hidden shadow-sm">
      <div
        class="px-6 py-6 bg-slate-50/50 border-b border-gray-100 flex flex-col md:flex-row justify-between md:items-start gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">{{ deck.name }}</h1>
          <div class="flex items-center mt-2 text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1.5 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span class="font-medium text-gray-700 mr-1">{{ cardCount }}</span> cards in this deck
          </div>
        </div>

        <div v-if="cardCount > 0" class="flex-shrink-0">
          <UiButton
            @click="$emit('practice')"
            size="lg"
            class="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200"
          >
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Start Practice
          </UiButton>
        </div>
      </div>

      <div class="px-6 py-5 bg-white">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Description
        </h3>
        <p v-if="deck.description" class="text-gray-600 leading-relaxed max-w-2xl">
          {{ deck.description }}
        </p>
        <p v-else class="text-gray-400 italic text-sm">No description provided for this deck.</p>
      </div>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import UiCard from '@/components/ui/Card.vue'
import UiButton from '@/components/ui/Button.vue'
import type { Deck } from '@/api'

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
