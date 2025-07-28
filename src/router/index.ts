import { createRouter, createWebHistory } from 'vue-router'
import DeckList from '@/views/DeckList.vue'
import Login from '@/views/Login.vue'
import DeckDetail from '@/views/DeckDetail.vue'
import DeckPractice from '@/views/DeckPractice.vue'
import GrammarSetList from '@/views/GrammarSetList.vue'
import GrammarList from '@/views/GrammarList.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/decklist',
    name: 'DeckList',
    component: DeckList,
    meta: { requiresAuth: true },
  },
  {
    path: '/decks/:id',
    name: 'DeckDetail',
    component: DeckDetail,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/decks/:id/practice',
    name: 'DeckPractice',
    component: DeckPractice,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/grammarsets',
    name: 'GrammarSetList',
    component: GrammarSetList,
    meta: { requiresAuth: true },
  },
  {
    path: '/grammarsets/:setId/grammars',
    name: 'GrammarList',
    component: GrammarList,
    meta: { requiresAuth: true },
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const auth = useAuthStore()
  auth.init()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
