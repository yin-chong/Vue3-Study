import { createRouter, createWebHistory } from 'vue-router'
import routerConfig  from './routerConfig';

const router = createRouter({
  history: createWebHistory(),
  routes: [...routerConfig]
})

export default router
