<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Grammar Sets</h1>
      <Button @click="showNew = true" variant="default" class="bg-emerald-600 hover:bg-emerald-700">
        <PlusIcon class="w-5 h-5 mr-2" />
        New Set
      </Button>
    </div>

    <div v-if="loading" class="flex justify-center items-center p-12">
      <LoadingDots />
    </div>

    <div v-else-if="sets.length === 0" class="text-center">
      <Card class="p-8 max-w-md mx-auto">
        <BookOpenIcon class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 class="text-lg font-medium mb-2">No Grammar Sets Yet</h3>
        <p class="text-muted-foreground mb-4">Create your first grammar set to start learning!</p>
        <Button @click="showNew = true" class="bg-emerald-600 hover:bg-emerald-700">
          <PlusIcon class="w-5 h-5 mr-2" />
          Create First Set
        </Button>
      </Card>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="set in sets"
        :key="set.id"
        class="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        @click="goToGrammars(set.id)"
      >
        <div class="h-2 bg-emerald-600"></div>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>{{ set.name }}</CardTitle>
            <div class="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
              <BookOpenIcon class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p class="line-clamp-2 mb-4 text-muted-foreground">
            {{ set.description || 'No description' }}
          </p>
          <div class="flex items-center justify-between">
            <div class="flex items-center text-sm text-muted-foreground">
              <BookOpenIcon class="w-5 h-5 mr-1" />
              <span>{{ set.grammarCount }} rules</span>
            </div>
            <Button
              @click.stop="confirmDelete(set)"
              variant="ghost"
              size="sm"
              class="text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/20"
              title="Delete set"
            >
              <TrashIcon class="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Create New Grammar Set Modal -->
    <Modal :open="showNew" @close="showNew = false">
      <Card class="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create New Grammar Set</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium mb-1"> Set Name </label>
              <Input id="name" v-model="newSet.name" placeholder="Enter set name" />
            </div>
            <div>
              <label for="description" class="block text-sm font-medium mb-1"> Description </label>
              <Textarea
                id="description"
                v-model="newSet.description"
                placeholder="Enter set description"
                rows="3"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="outline" @click="showNew = false"> Cancel </Button>
          <Button
            @click="create"
            :disabled="!newSet.name"
            class="bg-emerald-600 hover:bg-emerald-700"
          >
            Create Set
          </Button>
        </CardFooter>
      </Card>
    </Modal>
  </div>

  <!-- Delete Confirmation Modal -->
  <Modal :open="showDeleteModal" @close="cancelDelete">
    <Card class="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Delete Grammar Set</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Are you sure you want to delete "{{ setToDelete?.name }}"?</p>
        <p class="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
      </CardContent>
      <CardFooter class="flex justify-between">
        <Button variant="outline" @click="cancelDelete"> Cancel </Button>
        <Button variant="destructive" @click="handleDelete"> Delete Set </Button>
      </CardFooter>
    </Card>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  fetchGrammarSets,
  createGrammarSet,
  deleteGrammarSet,
  fetchGrammars,
} from '@/services/grammarService'
import { useRouter } from 'vue-router'
import Card from '@/components/ui/shadcn/Card.vue'
import CardHeader from '@/components/ui/shadcn/CardHeader.vue'
import CardTitle from '@/components/ui/shadcn/CardTitle.vue'
import CardContent from '@/components/ui/shadcn/CardContent.vue'
import CardFooter from '@/components/ui/shadcn/CardFooter.vue'
import Button from '@/components/ui/shadcn/Button.vue'
import Input from '@/components/ui/shadcn/Input.vue'
import Textarea from '@/components/ui/shadcn/Textarea.vue'
import Modal from '@/components/ui/shadcn/Modal.vue'
import LoadingDots from '@/components/ui/LoadingDots.vue'
import { PlusIcon, BookOpenIcon, TrashIcon } from 'lucide-vue-next'

interface GrammarSet {
  id: string
  name: string
  description?: string
}

// include grammarCount for each set
const sets = ref<(GrammarSet & { grammarCount: number })[]>([])
const loading = ref(false)
const showNew = ref(false)
const showDeleteModal = ref(false)
const setToDelete = ref<GrammarSet | null>(null)
const newSet = ref<Partial<GrammarSet>>({ name: '', description: '' as string })
const router = useRouter()

async function load() {
  loading.value = true
  try {
    // fetch base sets and count grammars in each
    const base = await fetchGrammarSets()
    const withCount = await Promise.all(
      base.map(async (set) => {
        let count = 0
        try {
          const items = set.grammars || (await fetchGrammars(set.id))
          count = items.length
        } catch {
          count = 0
        }
        return { ...set, grammarCount: count }
      }),
    )
    sets.value = withCount
  } catch (error) {
    console.error('Failed to fetch grammar sets:', error)
    sets.value = []
  } finally {
    loading.value = false
  }
}

async function create() {
  if (!newSet.value.name) return

  try {
    await createGrammarSet(newSet.value)
    newSet.value = { name: '', description: '' }
    showNew.value = false
    await load()
  } catch (error) {
    console.error('Failed to create grammar set:', error)
  }
}

function confirmDelete(set: GrammarSet) {
  setToDelete.value = set
  showDeleteModal.value = true
}

async function handleDelete() {
  if (!setToDelete.value?.id) return

  try {
    await deleteGrammarSet(setToDelete.value.id)
    showDeleteModal.value = false
    setToDelete.value = null
    await load()
  } catch (error) {
    console.error('Failed to delete grammar set:', error)
  }
}

function cancelDelete() {
  setToDelete.value = null
  showDeleteModal.value = false
}

function goToGrammars(setId: string) {
  router.push({ name: 'GrammarList', params: { setId } })
}

onMounted(load)
</script>
