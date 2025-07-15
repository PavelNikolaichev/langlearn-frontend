<template>
  <div class="flex justify-center items-center h-screen bg-gray-50">
    <div class="w-full max-w-sm bg-white p-6 rounded shadow">
      <h1 class="text-xl font-bold mb-4">Login</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="username" type="text" placeholder="Username" class="input" />
        <input v-model="password" type="password" placeholder="Password" class="input mt-2" />
        <button type="submit" class="btn mt-4 w-full">Login</button>
        <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  error.value = ''
  try {
    await auth.login(username.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    error.value = 'Login failed. Check your credentials.'
  }
}
</script>

<style scoped>
.input {
  @apply border border-gray-300 p-2 rounded w-full;
}
.btn {
  @apply bg-blue-600 text-white py-2 rounded hover:bg-blue-700;
}
</style>
