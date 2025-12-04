<template>
  <div>
    <h1 class="text-2xl font-bold">Welcome to LangLearn</h1>
    <p class="mt-2 text-muted-foreground">Your language learning journey starts here.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <!-- Flashcards stats card -->
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-lg">Flashcards</CardTitle>
            <div class="p-2 bg-primary/10 rounded-full">
              <LayersIcon class="w-5 h-5 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-3xl font-semibold">{{ totalDecks }}</p>
              <p class="text-sm text-muted-foreground">Total Decks</p>
            </div>
            <div>
              <p class="text-3xl font-semibold">{{ totalCards }}</p>
              <p class="text-sm text-muted-foreground">Total Cards</p>
            </div>
          </div>

          <Button class="w-full mt-4" asChild>
            <router-link to="/decklist" class="w-full h-full">View All Decks</router-link>
          </Button>
        </CardContent>
      </Card>

      <!-- Grammar sets card -->
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-lg">Grammar Sets</CardTitle>
            <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <BookOpenIcon class="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-3xl font-semibold">{{ totalGrammarSets }}</p>
              <p class="text-sm text-muted-foreground">Total Sets</p>
            </div>
            <div>
              <p class="text-3xl font-semibold">{{ totalGrammarRules }}</p>
              <p class="text-sm text-muted-foreground">Total Rules</p>
            </div>
          </div>

          <Button class="w-full mt-4" variant="outline" asChild>
            <router-link to="/grammarsets" class="w-full h-full">View All Grammar Sets</router-link>
          </Button>
        </CardContent>
      </Card>

      <!-- Quick actions card -->
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-3">
            <Button variant="outline" class="w-full justify-between" @click="createNewDeck">
              <span>Create New Flashcard Deck</span>
              <PlusIcon class="w-5 h-5" />
            </Button>

            <Button variant="outline" class="w-full justify-between" @click="createNewGrammarSet">
              <span>Create New Grammar Set</span>
              <PlusIcon class="w-5 h-5" />
            </Button>

            <Button variant="outline" class="w-full justify-between" @click="practiceFlashcards">
              <span>Practice Flashcards</span>
              <PlayIcon class="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Recent activity section -->
    <div class="mt-8">
      <h2 class="text-lg font-medium mb-4">Recent Activity</h2>
      <Card>
        <div class="divide-y divide-border">
          <div class="p-4 flex items-center">
            <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
              <PlusIcon class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p class="text-sm font-medium">You created a new flashcard deck</p>
              <p class="text-xs text-muted-foreground">Today at 10:30 AM</p>
            </div>
          </div>

          <div class="p-4 flex items-center">
            <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-4">
              <CheckCircleIcon class="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p class="text-sm font-medium">You completed a study session</p>
              <p class="text-xs text-muted-foreground">Yesterday at 3:45 PM</p>
            </div>
          </div>

          <div class="p-4 flex items-center">
            <div class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4">
              <BookOpenIcon class="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p class="text-sm font-medium">You added new grammar rules</p>
              <p class="text-xs text-muted-foreground">2 days ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import { LayersIcon, BookOpenIcon, PlusIcon, PlayIcon, CheckCircleIcon } from 'lucide-vue-next'
import { useDeckStore } from '@/stores/deck'
import { useGrammarSetStore } from '@/stores/grammarSet'

defineOptions({
  name: 'AppDashboard',
})

const router = useRouter()

import { onMounted } from 'vue'

const totalDecks = ref(0)
const totalCards = ref(0)
const totalGrammarSets = ref(0)
const totalGrammarRules = ref(0)

const deckStore = useDeckStore()
const grammarSetStore = useGrammarSetStore()

onMounted(async () => {
  await deckStore.fetchDecks()
  totalDecks.value = deckStore.decks.length
  totalCards.value = deckStore.decks.reduce((acc, deck) => acc + (deck.flashcards?.length || 0), 0)

  await grammarSetStore.fetchGrammarSets()
  totalGrammarSets.value = grammarSetStore.grammarSets.length
  totalGrammarRules.value = grammarSetStore.grammarSets.reduce(
    (acc, set) => acc + (set.grammars?.length || 0),
    0,
  )
})

function createNewDeck() {
  router.push('/decklist')
  // Normally you would open a modal or navigate to a create page
}

function createNewGrammarSet() {
  router.push('/grammarsets')
  // Normally you would open a modal or navigate to a create page
}

function practiceFlashcards() {
  router.push('/decklist')
  // Normally you would navigate to a practice page or select a deck to practice
}
</script>
