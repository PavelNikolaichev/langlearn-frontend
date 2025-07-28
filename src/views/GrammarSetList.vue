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
        class="overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
            <Button
              @click="goToGrammars(set.id)"
              size="sm"
              class="bg-emerald-600 hover:bg-emerald-700"
            >
              View Rules
            </Button>
            <Button
              @click="confirmDelete(set)"
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
    <div class="mt-4">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Set Name</label
        >
        <input
          id="name"
          v-model="newSet.name"
          placeholder="Enter set name"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Description</label
        >
        <textarea
          id="description"
          v-model="newSet.description"
          placeholder="Enter set description"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
        ></textarea>
      </div>
    </div>
  </div>
  <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
    <button
      @click="create"
      :disabled="!newSet.name"
      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Create Set
    </button>
    <button
      @click="showNew = false"
      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:w-auto sm:text-sm"
    >
      Cancel
    </button>
  </div>

  <!-- Delete Confirmation Modal -->
  <div
    v-if="showDeleteModal"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="cancelDelete"
      ></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full px-4 pt-5 pb-4 sm:p-6"
      >
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10"
          >
            <svg
              class="h-6 w-6 text-red-600 dark:text-red-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
              id="modal-title"
            >
              Delete Grammar Set
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete "{{ setToDelete?.name }}"? This action cannot be
                undone.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            @click="confirmDeleteAction"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Delete
          </button>
          <button
            @click="cancelDelete"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <Modal :open="showDeleteModal" @close="showDeleteModal = false">
        <Card class="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Confirm Deletion</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Are you sure you want to delete the grammar set "{{ setToDelete?.name }}"?</p>
            <p class="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
          </CardContent>
          <CardFooter class="flex justify-between">
            <Button variant="outline" @click="showDeleteModal = false"> Cancel </Button>
            <Button variant="destructive" @click="handleDelete"> Delete Set </Button>
          </CardFooter>
        </Card>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchGrammarSets, createGrammarSet, deleteGrammarSet } from '@/services/grammarService'
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

const sets = ref<GrammarSet[]>([])
const loading = ref(false)
const showNew = ref(false)
const showDeleteModal = ref(false)
const setToDelete = ref<GrammarSet | null>(null)
const newSet = ref<Partial<GrammarSet>>({ name: '', description: '' as string })
const router = useRouter()

async function load() {
  loading.value = true
  try {
    sets.value = await fetchGrammarSets()
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
  showDeleteModal.value = true
}

function cancelDelete() {
  setToDelete.value = null
  showDeleteModal.value = false
}

async function confirmDeleteAction() {
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

function goToGrammars(setId: string) {
  router.push({ name: 'GrammarList', params: { setId } })
}

onMounted(load)
</script>
