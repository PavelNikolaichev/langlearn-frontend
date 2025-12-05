<template>
  <UiCard class="group mb-3 hover:shadow-lg transition-all border-gray-100">
    <div class="flex justify-between">
      <div class="w-full">
        <div
          class="px-5 py-3 bg-slate-50 border-b border-gray-100 flex justify-between items-center rounded-t-lg"
        >
          <span class="text-xl font-bold text-slate-800 tracking-wide">
            {{ flashcard.front }}
          </span>
        </div>

        <div class="p-5">
          <p class="text-base text-gray-700 font-medium mb-1">
            {{ flashcard.back }}
          </p>

          <p
            v-if="flashcard.notes"
            class="text-sm text-gray-500 italic mt-2 border-l-2 border-indigo-200 pl-3"
          >
            {{ flashcard.notes }}
          </p>
        </div>
      </div>

      <div class="flex flex-col justify-center border-l border-gray-100">
        <button
          @click="$emit('delete', flashcard.id)"
          class="h-full px-4 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-r-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </button>
      </div>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import UiCard from '@/components/ui/Card.vue'
import type { Flashcard } from '@/api'

defineProps<{
  flashcard: Flashcard
}>()

defineEmits(['delete'])
</script>
