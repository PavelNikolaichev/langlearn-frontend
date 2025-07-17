<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Grammar Sets</h1>
    <button @click="showNew = true" class="bg-blue-600 text-white px-4 py-2 rounded mb-4">
      New Set
    </button>

    <div v-if="loading" class="text-gray-500">Loading...</div>
    <ul v-else>
      <li
        v-for="set in sets"
        :key="set.id"
        class="p-4 border rounded mb-2 hover:bg-gray-50 flex justify-between items-center"
      >
        <span @click="goToGrammars(set.id)" class="cursor-pointer">
          {{ set.name }}
        </span>
        <button @click="del(set.id)" class="text-red-600 hover:underline">Delete</button>
      </li>
    </ul>

    <div v-if="showNew" class="mt-6">
      <h2 class="text-xl mb-2">Create New Grammar Set</h2>
      <input v-model="newSet.name" placeholder="Name" class="border p-2 rounded w-full mb-2" />
      <textarea
        v-model="newSet.description"
        placeholder="Description"
        class="border p-2 rounded w-full mb-2"
      />
      <button @click="create" class="bg-green-600 text-white px-4 py-2 rounded">Create</button>
      <button @click="showNew = false" class="ml-2">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchGrammarSets, createGrammarSet, deleteGrammarSet } from '@/services/grammarService'
import { useRouter } from 'vue-router'

interface GrammarSet {
  id: string
  name: string
  description?: string
}

const sets = ref<GrammarSet[]>([])
const loading = ref(false)
const showNew = ref(false)
const newSet = ref<Partial<GrammarSet>>({ name: '', description: '' })
const router = useRouter()

async function load() {
  loading.value = true
  sets.value = await fetchGrammarSets()
  loading.value = false
}

async function create() {
  if (!newSet.value.name) return
  await createGrammarSet(newSet.value)
  newSet.value = { name: '', description: '' }
  showNew.value = false
  load()
}

async function del(id: string) {
  await deleteGrammarSet(id)
  load()
}

function goToGrammars(setId: string) {
  router.push({ name: 'GrammarList', params: { setId } })
}

onMounted(load)
</script>
