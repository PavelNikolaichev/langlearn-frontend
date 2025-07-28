<template>
  <div class="flex justify-center py-4">
    <div class="animate-pulse flex space-x-2">
      <div class="w-3 h-3 rounded-full" :class="dotColor"></div>
      <div class="w-3 h-3 rounded-full animation-delay-200" :class="dotColor"></div>
      <div class="w-3 h-3 rounded-full animation-delay-400" :class="dotColor"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'UiLoadingDots' })
import { defineProps, computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: 'primary',
    validator: (val: string) => ['primary', 'secondary', 'gray'].includes(val),
  },
})

const dotColor = computed(() => {
  const colors = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-400',
    gray: 'bg-gray-300',
  }
  return colors[props.color as keyof typeof colors]
})
</script>

<style scoped>
.animation-delay-200 {
  animation-delay: 200ms;
}
.animation-delay-400 {
  animation-delay: 400ms;
}
</style>
