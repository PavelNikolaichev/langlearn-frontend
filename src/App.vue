<script setup lang="ts">
import Sidebar from '@/components/ui/shadcn/Sidebar.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div class="min-h-screen">
    <template v-if="auth.isLoggedIn">
      <Sidebar>
        <router-view />
      </Sidebar>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>
