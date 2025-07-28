<template>
  <div class="p-6">
    <Button variant="ghost" @click="goBack" class="text-blue-600 mb-4">
      <ArrowLeftIcon class="w-4 h-4 mr-2" />
      Back to Sets
    </Button>

    <h1 class="text-2xl font-bold mb-4">Grammars in "{{ set?.name }}"</h1>

    <div v-if="loading" class="flex justify-center my-8">
      <LoadingDots />
    </div>

    <div v-else class="space-y-4">
      <Card v-for="g in grammars" :key="g.id" class="mb-2">
        <CardHeader>
          <CardTitle class="text-lg">{{ g.name }}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{{ g.description }}</p>
        </CardContent>
      </Card>
    </div>

    <Card class="mt-8">
      <CardHeader>
        <CardTitle>Add Grammar</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium mb-1">Name</label>
            <Input
              id="name"
              :modelValue="newGrammar.name ?? ''"
              @update:modelValue="(val) => (newGrammar.name = val)"
              placeholder="Enter grammar name"
            />
          </div>

          <div>
            <label for="description" class="block text-sm font-medium mb-1">Description</label>
            <Textarea
              id="description"
              :modelValue="newGrammar.description ?? ''"
              @update:modelValue="(val) => (newGrammar.description = val)"
              placeholder="Enter description"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button @click="add" class="bg-emerald-600 hover:bg-emerald-700">
          <PlusIcon class="w-4 h-4 mr-2" />
          Add Grammar
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  fetchGrammars,
  createGrammar,
  fetchGrammarSets,
  type Grammar,
  type GrammarSet,
} from '@/services/grammarService'
import { useRoute, useRouter } from 'vue-router'
import Card from '@/components/ui/shadcn/Card.vue'
import CardHeader from '@/components/ui/shadcn/CardHeader.vue'
import CardTitle from '@/components/ui/shadcn/CardTitle.vue'
import CardContent from '@/components/ui/shadcn/CardContent.vue'
import CardFooter from '@/components/ui/shadcn/CardFooter.vue'
import Button from '@/components/ui/shadcn/Button.vue'
import Input from '@/components/ui/shadcn/Input.vue'
import Textarea from '@/components/ui/shadcn/Textarea.vue'
import LoadingDots from '@/components/ui/LoadingDots.vue'
import { ArrowLeftIcon, PlusIcon } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const setId = route.params.setId as string

const set = ref<GrammarSet | null>(null)
const grammars = ref<Grammar[]>([])
const loading = ref(false)
const newGrammar = ref<Partial<Grammar>>({ name: '', description: '' })

async function load() {
  loading.value = true

  set.value = (await fetchGrammarSets()).find((s) => s.id === setId) || null
  grammars.value = set.value?.grammars || (await fetchGrammars(setId)) || []

  console.log('Loaded grammars:', grammars.value)
  loading.value = false
}

async function add() {
  if (!newGrammar.value.name || !newGrammar.value.description) return

  await createGrammar(setId, newGrammar.value)

  newGrammar.value = { name: '', description: '' }

  load()
}

function goBack() {
  router.push({ name: 'GrammarSetList' })
}

onMounted(load)
</script>
