<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Dashboard</h1>
    <!-- <p class="mt-2">You are logged in as {{ auth.user?.username || 'Unknown' }}.</p> -->
    <button @click="auth.logout()" class="btn mt-4">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

defineOptions({
  name: 'AppDashboard',
})
</script>

<style scoped>
.btn {
  @apply bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700;
}
</style>
