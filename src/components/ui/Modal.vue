<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg max-w-sm w-full">
      <div class="p-4 border-b">
        <h3 class="text-lg font-semibold">Modal Title</h3>
      </div>
      <div class="p-4">
        <slot />
      </div>
      <div class="p-4 border-t">
        <button class="btn btn-primary" @click="$emit('update:modelValue', false)">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'UiModal' })
import { defineProps, defineEmits } from 'vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>
