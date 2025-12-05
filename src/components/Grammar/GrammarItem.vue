<template>
  <UiCard class="group mb-3 hover:shadow-lg transition-all duration-300 border-gray-100">
    <div class="flex flex-col md:flex-row">
      <div class="flex-grow">
        <div
          class="px-5 py-3 bg-slate-50/80 border-b border-gray-100 rounded-t-lg md:rounded-tr-none"
        >
          <span class="text-lg font-bold text-slate-800 tracking-tight">
            {{ grammar.name }}
          </span>
        </div>

        <div class="p-5 bg-white rounded-b-lg">
          <p class="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
            {{ grammar.description || 'No description provided.' }}
          </p>
        </div>
      </div>

      <div
        class="flex md:flex-col justify-end md:justify-center border-t md:border-t-0 md:border-l border-gray-100 bg-white p-2"
      >
        <button
          @click="$emit('delete', grammar.id)"
          class="p-3 w-full md:w-auto flex justify-center items-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-lg"
          title="Delete Grammar Rule"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
          <span class="md:hidden ml-2 text-sm font-medium">Delete</span>
        </button>
      </div>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import UiCard from '@/components/ui/Card.vue'
import type { Grammar } from '@/api'

defineProps({
  grammar: {
    type: Object as () => Grammar,
    required: true,
  },
})

defineEmits(['delete'])
</script>
