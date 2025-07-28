<template>
  <component
    :is="tag"
    :class="
      cn(
        buttonVariants({
          variant,
          size,
        }),
      )
    "
    :disabled="props.disabled || isLoading"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="isLoading" class="mr-2 h-4 w-4 animate-spin">
      <Loader2Icon class="h-4 w-4" />
    </span>
    <slot />
  </component>
</template>

<script setup lang="ts">
defineOptions({ name: 'UiButton' })
import { computed } from 'vue'
import { Loader2Icon } from 'lucide-vue-next'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  isLoading?: boolean
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
  isLoading: false,
  as: 'button',
})

const emit = defineEmits(['click'])

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const tag = computed(() => props.as)

function handleClick(event: MouseEvent) {
  if (props.disabled || props.isLoading) return
  emit('click', event)
}
</script>
