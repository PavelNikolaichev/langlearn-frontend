<template>
  <UiCard>
    <template #title> Add New Grammar </template>
    <template #content>
      <form @submit.prevent="handleSubmit" class="space-y-3">
        <div>
          <UiInput v-model="form.name" placeholder="Grammar name" required />
        </div>
        <div>
          <UiTextarea
            v-model="form.description"
            placeholder="Grammar description"
            :rows="3"
            required
          />
        </div>
        <div class="flex justify-end">
          <UiButton type="submit" variant="default"> Add Grammar </UiButton>
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
