<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <div
      :class="[
        'fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out bg-background border-r border-border',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <!-- Logo section -->
      <div class="flex items-center justify-between h-16 px-6 border-b border-border">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold text-primary">LangLearn</h1>
        </div>
        <button
          class="lg:hidden text-muted-foreground hover:text-foreground"
          @click="toggleSidebar"
        >
          <XIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="px-4 pt-4">
        <p class="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Dashboard
        </p>
        <router-link
          to="/dashboard"
          class="flex items-center px-2 py-2 mt-2 text-sm font-medium rounded-md transition-colors"
          :class="
            $route.path === '/dashboard'
              ? 'bg-accent text-accent-foreground'
              : 'text-foreground/70 hover:bg-accent/80 hover:text-accent-foreground'
          "
        >
          <HomeIcon class="w-5 h-5 mr-3" />
          Home
        </router-link>

        <p class="px-2 mt-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Study
        </p>
        <router-link
          to="/decklist"
          class="flex items-center px-2 py-2 mt-2 text-sm font-medium rounded-md transition-colors"
          :class="
            $route.path === '/decklist'
              ? 'bg-accent text-accent-foreground'
              : 'text-foreground/70 hover:bg-accent/80 hover:text-accent-foreground'
          "
        >
          <LayersIcon class="w-5 h-5 mr-3" />
          Flashcard Decks
        </router-link>

        <router-link
          to="/grammarsets"
          class="flex items-center px-2 py-2 mt-2 text-sm font-medium rounded-md transition-colors"
          :class="
            $route.path === '/grammarsets'
              ? 'bg-accent text-accent-foreground'
              : 'text-foreground/70 hover:bg-accent/80 hover:text-accent-foreground'
          "
        >
          <BookOpenIcon class="w-5 h-5 mr-3" />
          Grammar Sets
        </router-link>

        <!-- User profile section at bottom of sidebar -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div class="flex items-center">
            <div
              class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold"
            >
              {{ userInitial }}
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-foreground/90">{{ username }}</p>
            </div>
            <button
              @click="logout"
              class="text-muted-foreground hover:text-destructive"
              title="Logout"
            >
              <LogOutIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>
    </div>

    <!-- Mobile header with toggle button -->
    <div class="lg:hidden fixed top-0 left-0 right-0 z-20 bg-background border-b border-border">
      <div class="flex items-center h-16 px-4">
        <button class="text-muted-foreground hover:text-foreground" @click="toggleSidebar">
          <MenuIcon class="w-6 h-6" />
        </button>
        <h1 class="ml-4 text-lg font-semibold text-primary">LangLearn</h1>
      </div>
    </div>

    <!-- Main content -->
    <div :class="['flex-1 overflow-auto', isSidebarOpen ? 'lg:ml-64' : 'ml-0 lg:ml-64']">
      <!-- Overlay to close sidebar on mobile -->
      <div
        v-show="isSidebarOpen"
        class="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
        @click="toggleSidebar"
      ></div>

      <div class="lg:px-8 px-4 py-8 mt-16 lg:mt-0">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/features/auth/stores/auth'
import { useRouter } from 'vue-router'
import { HomeIcon, LayersIcon, BookOpenIcon, LogOutIcon, MenuIcon, XIcon } from 'lucide-vue-next'

defineOptions({
  name: 'ShadcnSidebar',
})

const auth = useAuthStore()
const router = useRouter()
const isSidebarOpen = ref(false)
const username = computed(() => auth.getUserEmailStripped || 'User')
const userInitial = computed(() => (auth.getUserEmail ? auth.getUserEmail[0] : 'U').toUpperCase())

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function logout() {
  auth.logout()
  router.push('/login')
}
</script>
