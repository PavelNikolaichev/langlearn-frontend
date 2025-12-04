<template>
  <UiContainer>
    <GrammarSetHeader
      v-if="set"
      :grammar-set="set"
      :grammar-count="grammars.length"
      @back="goBack"
      @practice="startPractice"
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
import { ref, onMounted, computed } from 'vue'
import { useGrammarSetStore } from '@/stores/grammarSet'
import type { Grammar, GrammarSet } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import GrammarSetHeader from '@/components/Grammar/GrammarSetHeader.vue'
import GrammarList from '@/components/Grammar/GrammarList.vue'
import GrammarForm from '@/components/Grammar/GrammarForm.vue'
import UiContainer from '@/components/ui/Container.vue'

const route = useRoute()
const router = useRouter()
const setId = route.params.setId as string

const grammarSetStore = useGrammarSetStore()

const set = computed(() => grammarSetStore.currentGrammarSet)
const grammars = computed(() => {
  if (grammarSetStore.currentGrammarSet && grammarSetStore.currentGrammarSet.id === setId) {
    return grammarSetStore.currentGrammarSet.grammars || []
  }
  return []
})
const loading = computed(() => grammarSetStore.loading)

async function load() {
  await grammarSetStore.fetchGrammarSetById(setId)
  await grammarSetStore.fetchGrammarsForSet(setId)
}

async function add(formData: { name: string; description: string }) {
  await grammarSetStore.createGrammar(setId, formData)
}

async function remove(id: string) {
  await grammarSetStore.deleteGrammar(setId, id)
}

function goBack() {
  router.push({ name: 'GrammarSetList' })
}

function startPractice() {
  router.push({ name: 'GrammarPracticeSetup' })
}

onMounted(load)
</script>
