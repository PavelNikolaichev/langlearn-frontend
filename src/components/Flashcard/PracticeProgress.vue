<template>
  <div class="bg-white border rounded-lg p-4 mb-4">
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-sm font-medium text-gray-700">Practice Session</h3>
      <span class="text-xs text-gray-500">{{ currentCard }} / {{ totalCards }}</span>
    </div>

    <div class="w-full bg-gray-200 rounded-full h-2">
      <div
        class="bg-blue-600 h-2 rounded-full transition-all duration-300"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>

    <div class="flex justify-between text-xs text-gray-500 mt-2">
      <span>{{ progress.toFixed(0) }}% complete</span>
      <span>{{ remaining }} remaining</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  currentCard: {
    type: Number,
    required: true,
  },
  totalCards: {
    type: Number,
    required: true,
  },
})

const progress = computed(() => {
  if (props.totalCards === 0) return 0
  return (props.currentCard / props.totalCards) * 100
})

const remaining = computed(() => {
  return Math.max(0, props.totalCards - props.currentCard)
})
</script>
