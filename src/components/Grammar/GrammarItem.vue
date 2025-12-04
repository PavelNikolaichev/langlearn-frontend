<template>
  <UiCard class="mb-2 hover:shadow-lg transition-shadow">
    <div class="flex justify-between items-center">
      <div>
        <p class="font-semibold">{{ grammar.name }}</p>
        <p class="text-sm text-gray-600">{{ grammar.description || 'No description' }}</p>
      </div>
      <div class="flex space-x-2">
        <UiButton variant="destructive" size="sm" @click="$emit('delete', grammar.id)">
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
import type { Grammar } from '@/api'

defineProps({
  grammar: {
    type: Object as () => Grammar,
    required: true,
  },
})

defineEmits(['delete'])
</script>
