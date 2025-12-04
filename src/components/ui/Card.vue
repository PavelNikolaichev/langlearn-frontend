<template>
  <div :class="cn(borderless ? '' : 'rounded-lg border bg-card text-card-foreground shadow-sm', props.class)">
    <div v-if="$slots.title">
      <slot name="title" />
    </div>
    <div v-if="$slots.content">
      <slot name="content" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

defineOptions({
  name: 'ShadcnCard',
})

interface Props {
  class?: string
  borderless?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  borderless: false,
})

const borderless = props.borderless
</script>
