<template>
  <UiCard class="border-gray-100 shadow-sm overflow-hidden mb-6">
    <div class="px-5 py-3 bg-slate-50 border-b border-gray-100 flex items-center gap-2">
      <span class="font-semibold text-gray-700">Add New Grammar Rule</span>
    </div>

    <div class="p-5 bg-white">
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1">
            Grammar Name / Structure
          </label>
          <UiInput
            v-model="form.name"
            placeholder="e.g. Past Tense (Verb + ed)"
            class="bg-gray-50 border-gray-200 focus:bg-white focus:border-emerald-300 transition-all font-medium"
            required
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1">
            Description & Examples
          </label>
          <UiTextarea
            v-model="form.description"
            placeholder="Explain how to use this grammar..."
            class="resize-none bg-gray-50 border-gray-200 focus:bg-white focus:border-emerald-300 transition-all"
            :rows="4"
            required
          />
        </div>

        <div class="pt-2 flex justify-end">
          <UiButton
            type="submit"
            variant="default"
            class="w-full md:w-auto bg-gray-900 hover:bg-gray-800"
          >
            Add Grammar
          </UiButton>
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

interface GrammarForm {
  name: string
  description: string
}

const emit = defineEmits(['submit'])

const form = ref<GrammarForm>({
  name: '',
  description: '',
})

function handleSubmit() {
  if (!form.value.name || !form.value.description) return

  emit('submit', { ...form.value })

  // Reset form
  form.value = {
    name: '',
    description: '',
  }
}
</script>
