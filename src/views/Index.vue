<template>
  <div class="grids">
    <div class="grid" v-for="menu in menus" :key="menu.id" @click="jumpPage(menu.url)">
      <component  :is="menu.icon" class="grid-icon"></component>
      <div class="menu-label">{{ menu.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import router from '../router/index';
const menus = reactive(
  [
    { id: 1, name: 'Vue3基础', url: 'base-study', icon: 'MilkTea' },
    { id: 2, name: '表格封装', url: 'table', icon: 'MilkTea' },
    { id: 3, name: '基础学习', url: 'base-study', icon: 'MilkTea' },
    { id: 4, name: '基础学习', url: 'base-study', icon: 'MilkTea' },
    { id: 5, name: '基础学习', url: 'base-study', icon: 'MilkTea' },
  ]
);
function jumpPage(url: string) {
  console.log(url)
  router.push({
    name: url
  })
}
</script>

<style lang="scss" scoped>
.grids {
  display: grid;
  grid-template-columns: repeat(auto-fill,100px);
}
.grid {
  box-sizing: border-box;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  &-icon {
    margin-bottom: 10px;
    width: 40px;
    height: 40px;
  }
  &-label {
    font-size: 15px;
  }
}
</style>
