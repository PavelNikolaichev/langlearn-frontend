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
          <div class="text-sm text-gray-500">{{ grammarCount }} grammars</div>
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

defineEmits(['back'])
</script>
