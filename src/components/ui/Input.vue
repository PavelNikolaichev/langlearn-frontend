<template>
  <input
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value || '')"
    class="border rounded-md p-2 w-full"
    :class="inputClasses"
  />
</template>

<script setup lang="ts">
defineOptions({ name: 'UiInput' })
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Enter text...',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])

const inputClasses = computed(() => [
  'border rounded-md p-2',
  {
    'opacity-50 cursor-not-allowed': props.disabled,
  },
])
</script>
