import { createRouter, createWebHistory } from 'vue-router'
import routerConfig  from './routerConfig';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routerConfig]
})

export default router
