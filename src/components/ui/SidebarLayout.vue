<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <div
      :class="[
        'fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <!-- Logo section -->
      <div
        class="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center">
          <h1 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400">LangLearn</h1>
        </div>
        <button
          class="lg:hidden text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          @click="toggleSidebar"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="px-4 pt-4">
        <p class="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Dashboard</p>
        <router-link
          to="/dashboard"
          class="flex items-center px-2 py-2 mt-2 text-sm font-medium rounded-md transition-colors"
          :class="
            $route.path === '/dashboard'
              ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          "
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          Home
        </router-link>

        <p class="px-2 mt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Study</p>
        <router-link
          to="/decklist"
          class="flex items-center px-2 py-2 mt-2 text-sm font-medium rounded-md transition-colors"
          :class="
            $route.path === '/decklist'
              ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          "
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
          Flashcard Decks
        </router-link>

        <router-link
          to="/grammarsets"
          class="flex items-center px-2 py-2 mt-2 text-sm font-medium rounded-md transition-colors"
          :class="
            $route.path === '/grammarsets'
              ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          "
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            ></path>
          </svg>
          Grammar Sets
        </router-link>

        <!-- User profile section at bottom of sidebar -->
        <div
          class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center">
            <div
              class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold"
            >
              {{ userInitial }}
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ username }}</p>
            </div>
            <button
              @click="logout"
              class="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>

    <!-- Mobile header with toggle button -->
    <div
      class="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="flex items-center h-16 px-4">
        <button
          class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          @click="toggleSidebar"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <h1 class="ml-4 text-lg font-semibold text-indigo-600 dark:text-indigo-400">LangLearn</h1>
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
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const isSidebarOpen = ref(false)

const username = computed(() => auth.user?.email || 'User')
const userInitial = computed(() => (auth.user?.email?.[0] || 'U').toUpperCase())

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function logout() {
  auth.logout()
  router.push('/login')
}
</script>
