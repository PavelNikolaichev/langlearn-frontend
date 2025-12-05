<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h1 class="text-center text-3xl font-extrabold">LangLearn</h1>
        <h2 class="mt-6 text-center text-2xl font-bold">Create an account</h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">Sign up to start learning</p>
      </div>

      <Card>
        <CardContent class="pt-6">
          <form @submit.prevent="handleRegister" class="space-y-6">
            <div class="space-y-2">
              <label for="email" class="text-sm font-medium">Email</label>
              <Input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="Enter your email"
              />
            </div>

            <div class="space-y-2">
              <label for="password" class="text-sm font-medium">Password</label>
              <Input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="Enter your password"
              />
            </div>

            <div class="space-y-2">
              <label for="confirmPassword" class="text-sm font-medium">Confirm Password</label>
              <Input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                required
                placeholder="Confirm your password"
              />
            </div>

            <Button
              type="submit"
              :disabled="!email || !password || !confirmPassword"
              class="w-full"
            >
              Sign up
            </Button>

            <div v-if="error" class="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
              {{ error }}
            </div>

            <div v-if="success" class="bg-primary/10 text-primary p-3 rounded-md text-sm">
              {{ success }}
            </div>
          </form>
        </CardContent>
      </Card>

      <div class="text-center text-sm">
        <p class="text-muted-foreground">
          Already have an account?
          <router-link to="/login" class="text-primary hover:underline"> Sign in here </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiClient } from '@/services/api'
import { useAuthStore } from '@/features/auth/stores/auth'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')

async function handleRegister() {
  error.value = ''
  success.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords don't match"
    return
  }

  try {
    const response = await apiClient.authRegisterPost({
      registerRequestDto: { email: email.value, password: password.value },
    })
    // If the API returns a token, auto-login using auth store and redirect
    const token = response.data.token
    if (token) {
      // The auth.login helper also sets persistence; we can call it to set token/jwt state
      // But auth.login expects credentials; token could be used directly. For simplicity, log in via provided credentials
      await auth.login(email.value, password.value, true)
      router.push('/dashboard')
      return
    }

    success.value = 'Registration succeeded. Please login.'
    router.push('/login')
  } catch (err: any) {
    console.error(err)
    error.value = err?.response?.data?.message || 'Registration failed. Please try again.'
  }
}
</script>
