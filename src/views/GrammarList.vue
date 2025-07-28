<template>
  <UiContainer>
    <GrammarSetHeader
      v-if="set"
      :grammar-set="set"
      :grammar-count="grammars.length"
      @back="goBack"
    />

    <div class="grid grid-cols-1 gap-8 md:grid-cols-5">
      <div class="md:col-span-3">
        <GrammarList :grammars="grammars" :loading="loading" @delete="remove" />
      </div>

      <div class="md:col-span-2">
        <GrammarForm @submit="add" />
      </div>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  fetchGrammars,
  createGrammar,
  deleteGrammar,
  fetchGrammarSets,
  type Grammar,
  type GrammarSet,
} from '@/services/grammarService'
import { useRoute, useRouter } from 'vue-router'
import GrammarSetHeader from '@/components/Grammar/GrammarSetHeader.vue'
import GrammarList from '@/components/Grammar/GrammarList.vue'
import GrammarForm from '@/components/Grammar/GrammarForm.vue'
import UiContainer from '@/components/ui/Container.vue'

const route = useRoute()
const router = useRouter()
const setId = route.params.setId as string

const set = ref<GrammarSet | null>(null)
const grammars = ref<Grammar[]>([])
const loading = ref(false)

async function load() {
  loading.value = true

  set.value = (await fetchGrammarSets()).find((s) => s.id === setId) || null
  grammars.value = set.value?.grammars || (await fetchGrammars(setId)) || []

  console.log('Loaded grammars:', grammars.value)
  loading.value = false
}

async function add(formData: { name: string; description: string }) {
  await createGrammar(setId, formData)
  load()
}

async function remove(id: string) {
  await deleteGrammar(setId, id)
  load()
}

function goBack() {
  router.push({ name: 'GrammarSetList' })
}

onMounted(load)
</script>
