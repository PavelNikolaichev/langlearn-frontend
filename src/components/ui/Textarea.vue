<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :rows="rows"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value || '')"
    class="border rounded-md p-2 w-full resize-none"
    :class="textareaClasses"
  ></textarea>
</template>

<script setup lang="ts">
defineOptions({ name: 'UiTextarea' })
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
  rows: {
    type: Number,
    default: 3,
  },
})

defineEmits(['update:modelValue'])

const textareaClasses = computed(() => [
  'border rounded-md p-2',
  {
    'opacity-50 cursor-not-allowed': props.disabled,
  },
])
</script>
