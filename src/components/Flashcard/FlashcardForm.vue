<template>
  <UiCard class="border-gray-100 shadow-sm overflow-hidden">
    <div class="px-5 py-3 bg-slate-50 border-b border-gray-100 flex items-center gap-2">
      <span class="font-semibold text-gray-700">Add New Flashcard</span>
    </div>

    <div class="p-5 bg-white">
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1"
              >Front (Term)</label
            >
            <UiInput
              v-model="form.front"
              placeholder="e.g. 你好"
              class="text-lg bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
              required
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1"
              >Back (Definition)</label
            >
            <UiInput
              v-model="form.back"
              placeholder="e.g. Hello"
              class="text-lg bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
              required
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1"
            >Notes (Optional)</label
          >
          <UiTextarea
            v-model="form.notes"
            placeholder="Usage examples, pinyin, or context..."
            class="resize-none bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
            :rows="3"
          />
        </div>

        <div class="pt-2 flex justify-end">
          <UiButton type="submit" class="w-full md:w-auto"> Add Flashcard </UiButton>
        </div>
      </form>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import UiCard from '@/components/ui/Card.vue'
import UiInput from '@/components/ui/Input.vue'
import UiButton from '@/components/ui/Button.vue'
import UiTextarea from '@/components/ui/Textarea.vue'

interface FlashcardForm {
  front: string
  back: string
  notes: string
}

const emit = defineEmits(['submit'])

const form = ref<FlashcardForm>({
  front: '',
  back: '',
  notes: '',
})

function handleSubmit() {
  if (!form.value.front || !form.value.back) return
  emit('submit', { ...form.value })

  form.value = {
    front: '',
    back: '',
    notes: '',
  }
}
</script>
