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
        Back to Sets
      </UiButton>
    </div>

    <UiCard>
      <template #title>
        <div class="flex justify-between items-center">
          <h1>{{ grammarSet.name }}</h1>
          <div class="flex items-center space-x-3">
            <div class="text-sm text-gray-500">{{ grammarCount }} grammars</div>
            <UiButton
              v-if="grammarCount > 0"
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              AI Practice
            </UiButton>
          </div>
        </div>
      </template>
      <template #content>
        <p v-if="grammarSet.description">{{ grammarSet.description }}</p>
        <p v-else class="text-gray-500 italic">No description provided</p>
      </template>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import UiCard from '@/components/ui/Card.vue'
import UiButton from '@/components/ui/Button.vue'
import type { GrammarSet } from '@/services/grammarService'

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
