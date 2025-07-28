<template>
  <UiCard>
    <template #title> Add New Flashcard </template>
    <template #content>
      <form @submit.prevent="handleSubmit" class="space-y-3">
        <div>
          <UiInput v-model="form.front" placeholder="Front side of card" required />
        </div>
        <div>
          <UiInput v-model="form.back" placeholder="Back side of card" required />
        </div>
        <div>
          <UiTextarea v-model="form.notes" placeholder="Notes (optional)" :rows="3" />
        </div>
        <div class="flex justify-end">
          <UiButton type="submit" variant="primary"> Add Flashcard </UiButton>
        </div>
      </form>
    </template>
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

  // Reset form
  form.value = {
    front: '',
    back: '',
    notes: '',
  }
}
</script>
