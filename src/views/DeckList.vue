<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Flashcard Decks</h1>
      <Button @click="showNew = true">
        <PlusIcon class="w-5 h-5 mr-2" />
        New Deck
      </Button>
    </div>

    <div v-if="loading" class="flex justify-center items-center p-12">
      <LoadingDots />
    </div>

    <div v-else-if="decks.length === 0" class="text-center">
      <Card class="p-8 max-w-md mx-auto">
        <InboxIcon class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 class="text-lg font-medium mb-2">No Flashcard Decks Yet</h3>
        <p class="text-muted-foreground mb-4">
          Create your first flashcard deck to start learning!
        </p>
        <Button @click="showNew = true">
          <PlusIcon class="w-5 h-5 mr-2" />
          Create First Deck
        </Button>
      </Card>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="deck in decks"
        :key="deck.id"
        class="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        @click="goToDetail(deck.id || '')"
      >
        <div class="h-2 bg-primary"></div>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>{{ deck.name }}</CardTitle>
            <div class="p-2 bg-primary/10 rounded-full">
              <LayersIcon class="w-5 h-5 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p class="line-clamp-2 mb-4 text-muted-foreground">
            {{ deck.description || 'No description' }}
          </p>
          <div class="flex items-center justify-between">
            <div class="flex items-center text-sm text-muted-foreground">
              <MessageSquareIcon class="w-5 h-5 mr-1" />
              <span>{{ deck.cardCount || 0 }} cards</span>
            </div>
            <Button
              @click.stop="confirmDelete(deck)"
              variant="ghost"
              size="sm"
              class="text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/20"
              title="Delete deck"
            >
              <TrashIcon class="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Create New Deck Modal -->
    <Modal :open="showNew" @close="showNew = false">
      <Card class="w-full max-w-lg" :borderless="true">
        <CardHeader>
          <CardTitle>Create New Deck</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium mb-1"> Deck Name </label>
              <Input id="name" v-model="newDeck.name" placeholder="Enter deck name" />
            </div>
            <div>
              <label for="description" class="block text-sm font-medium mb-1"> Description </label>
              <Textarea
                id="description"
                v-model="newDeck.description"
                placeholder="Enter deck description"
                rows="3"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="outline" @click="showNew = false"> Cancel </Button>
          <Button @click="handleCreateDeck" :disabled="!newDeck.name"> Create Deck </Button>
        </CardFooter>
      </Card>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal :open="showDeleteModal" @close="cancelDelete">
      <Card class="w-full max-w-lg" :borderless="true">
        <CardHeader>
          <CardTitle>Delete Deck</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Are you sure you want to delete "{{ deckToDelete?.name }}"?</p>
          <p class="text-sm text-muted-foreground mt-2">
            This action cannot be undone and will delete all flashcards in this deck.
          </p>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="outline" @click="cancelDelete"> Cancel </Button>
          <Button variant="destructive" @click="handleDelete"> Delete Deck </Button>
        </CardFooter>
      </Card>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useDeckStore } from '@/stores/deck'
import type { Deck } from '@/api'
import { useRouter } from 'vue-router'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardFooter from '@/components/ui/CardFooter.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Textarea from '@/components/ui/Textarea.vue'
import Modal from '@/components/ui/Modal.vue'
import LoadingDots from '@/components/ui/LoadingDots.vue'
import { PlusIcon, LayersIcon, MessageSquareIcon, InboxIcon, TrashIcon } from 'lucide-vue-next'

interface EnhancedDeck extends Deck {
  cardCount?: number
}

const deckStore = useDeckStore()
const router = useRouter()

const showNew = ref(false)
const showDeleteModal = ref(false)
const deckToDelete = ref<EnhancedDeck | null>(null)
const newDeck = ref<Partial<Deck>>({ name: '', description: '', flashcards: [] })

const decks = computed<EnhancedDeck[]>(() => {
  return deckStore.decks.map((deck) => ({
    ...deck,
    cardCount: deck.flashcards?.length || 0,
  }))
})

const loading = computed(() => deckStore.loading)

async function load() {
  await deckStore.fetchDecks()
}

function goToDetail(id: string) {
  router.push({ name: 'DeckDetail', params: { id } })
}

async function handleCreateDeck() {
  if (!newDeck.value.name) return

  try {
    await deckStore.createDeck(newDeck.value)
    newDeck.value = { name: '', description: '', flashcards: [] }
    showNew.value = false
  } catch (error) {
    console.error('Failed to create deck:', error)
  }
}

function confirmDelete(deck: EnhancedDeck) {
  deckToDelete.value = deck
  showDeleteModal.value = true
}

async function handleDelete() {
  if (!deckToDelete.value?.id) return

  try {
    await deckStore.deleteDeck(deckToDelete.value.id)
    showDeleteModal.value = false
    deckToDelete.value = null
  } catch (error) {
    console.error('Failed to delete deck:', error)
  }
}

function cancelDelete() {
  deckToDelete.value = null
  showDeleteModal.value = false
}

onMounted(load)
</script>
