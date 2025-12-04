<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h1 class="text-center text-3xl font-extrabold">LangLearn</h1>
        <h2 class="mt-6 text-center text-2xl font-bold">Welcome back</h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">
          Sign in to your account to continue learning
        </p>
      </div>

      <Card>
        <CardContent class="pt-6">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-2">
              <label for="username" class="text-sm font-medium">Username</label>
              <Input
                id="username"
                v-model="username"
                type="text"
                required
                placeholder="Enter your username"
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

            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <input
                  id="remember-me"
                  type="checkbox"
                  class="h-4 w-4 rounded border-input bg-background"
                />
                <label for="remember-me" class="text-sm"> Remember me </label>
              </div>

              <div class="text-sm">
                <a href="#" class="text-primary hover:underline"> Forgot your password? </a>
              </div>
            </div>

            <Button type="submit" :disabled="!username || !password" class="w-full">
              Sign in
            </Button>

            <div v-if="error" class="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
              {{ error }}
            </div>
          </form>
        </CardContent>
      </Card>

      <div class="text-center text-sm">
        <p class="text-muted-foreground">
          Don't have an account?
          <a href="#" class="text-primary hover:underline"> Sign up here </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/auth'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

defineOptions({
  name: 'LoginView',
})

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  if (!username.value || !password.value) return

  error.value = ''
  try {
    await auth.login(username.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    console.error(err)
    error.value = 'Login failed. Please check your credentials and try again.'
  }
}
</script>
