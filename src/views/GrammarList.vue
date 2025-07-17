<template>
  <div class="p-6">
    <button @click="goBack" class="text-blue-600 mb-4">← Back to Sets</button>
    <h1 class="text-2xl font-bold mb-2">Grammars in "{{ set?.name }}"</h1>

    <div v-if="loading" class="text-gray-500">Loading...</div>
    <ul v-else>
      <li v-for="g in grammars" :key="g.id" class="p-4 border rounded mb-2">
        <h2 class="font-semibold">{{ g.term }}</h2>
        <p class="text-sm text-gray-700">{{ g.definition }}</p>
        <p v-if="g.example" class="text-sm text-gray-500 italic">Example: {{ g.example }}</p>
      </li>
    </ul>

    <div class="mt-6">
      <h3 class="text-lg mb-2">Add Grammar</h3>
      <input v-model="newGrammar.term" placeholder="Term" class="border p-2 rounded w-full mb-2" />
      <textarea
        v-model="newGrammar.definition"
        placeholder="Definition"
        class="border p-2 rounded w-full mb-2"
      />
      <textarea
        v-model="newGrammar.example"
        placeholder="Example (optional)"
        class="border p-2 rounded w-full mb-2"
      />
      <button @click="add" class="bg-green-600 text-white px-4 py-2 rounded">Add</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchGrammars, createGrammar, fetchGrammarSets } from '@/services/grammarService'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const setId = route.params.setId as string

interface GrammarSet {
  id: string
  name: string
}

interface Grammar {
  id: string
  term: string
  definition: string
  example?: string
}

const set = ref<GrammarSet | null>(null)
const grammars = ref<Grammar[]>([])
const loading = ref(false)
const newGrammar = ref<Partial<Grammar>>({ term: '', definition: '', example: '' })

async function load() {
  loading.value = true
  // Optional: fetch set details if needed
  set.value = (await fetchGrammarSets()).find((s) => s.id === setId) || null
  grammars.value = await fetchGrammars(setId)
  loading.value = false
}

async function add() {
  if (!newGrammar.value.term || !newGrammar.value.definition) return
  await createGrammar(setId, newGrammar.value)
  newGrammar.value = { term: '', definition: '', example: '' }
  load()
}

function goBack() {
  router.push({ name: 'GrammarSetList' })
}

onMounted(load)
</script>
