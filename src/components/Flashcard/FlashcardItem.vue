<template>
  <UiCard class="mb-2 hover:shadow-lg transition-shadow">
    <div class="flex justify-between items-center">
      <div>
        <p class="font-semibold">{{ flashcard.front }}</p>
        <p class="text-sm text-gray-600">{{ flashcard.back }}</p>
        <p v-if="flashcard.notes" class="text-xs text-gray-500 mt-1">{{ flashcard.notes }}</p>
      </div>
      <div class="flex space-x-2">
        <UiButton variant="danger" size="sm" @click="$emit('delete', flashcard.id)">
          Delete
        </UiButton>
      </div>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import UiCard from '@/components/ui/Card.vue'
import UiButton from '@/components/ui/Button.vue'

interface Flashcard {
  id: string
  front: string
  back: string
  notes?: string
}

defineProps({
  flashcard: {
    type: Object as () => Flashcard,
    required: true,
  },
})

defineEmits(['delete'])
</script>
