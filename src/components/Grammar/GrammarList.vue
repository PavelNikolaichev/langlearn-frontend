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
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
      Grammars
    </h2>

    <div v-if="loading" class="my-8">
      <UiLoadingDots color="primary" />
    </div>

    <div v-else-if="!grammars.length" class="text-center py-8 bg-gray-50 rounded-lg">
      <p class="text-gray-500">No grammars in this set yet.</p>
    </div>

    <div v-else class="space-y-3">
      <GrammarItem
        v-for="grammar in grammars"
        :key="grammar.id"
        :grammar="grammar"
        @delete="$emit('delete', grammar.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import GrammarItem from '@/components/Grammar/GrammarItem.vue'
import UiLoadingDots from '@/components/ui/LoadingDots.vue'
import type { Grammar } from '@/services/grammarService'

defineProps({
  grammars: {
    type: Array as () => Grammar[],
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['delete'])
</script>
