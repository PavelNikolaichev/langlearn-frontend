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
        Back to Sets
      </button>
    </div>

    <UiCard class="border-gray-100 overflow-hidden shadow-sm">
      <div
        class="px-6 py-6 bg-slate-50/50 border-b border-gray-100 flex flex-col md:flex-row justify-between md:items-start gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">{{ grammarSet.name }}</h1>

          <div class="flex items-center mt-2 text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1.5 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span class="font-medium text-gray-700 mr-1">{{ grammarCount }}</span> grammar points
          </div>
        </div>

        <div v-if="grammarCount > 0" class="flex-shrink-0 pt-1">
          <UiButton
            @click="$emit('practice')"
            size="lg"
            class="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200 border-emerald-700"
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
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            AI Practice
          </UiButton>
        </div>
      </div>

      <div class="px-6 py-5 bg-white">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Description
        </h3>
        <p v-if="grammarSet.description" class="text-gray-600 leading-relaxed max-w-2xl">
          {{ grammarSet.description }}
        </p>
        <p v-else class="text-gray-400 italic text-sm">No description provided for this set.</p>
      </div>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import UiCard from '@/components/ui/Card.vue'
import UiButton from '@/components/ui/Button.vue'
import type { GrammarSet } from '@/api'

defineProps({
  grammarSet: {
    type: Object as () => GrammarSet,
    required: true,
  },
  grammarCount: {
    type: Number,
    default: 0,
  },
})

defineEmits(['back', 'practice'])
</script>
