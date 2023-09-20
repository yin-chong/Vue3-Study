<template>
<div class="main">
  <div class="grids">
    <div class="grid" v-for="menu in menus" :key="menu.id" @click="jumpPage(menu.url)">
      <component  :is="menu.icon" class="grid-icon"></component>
      <div class="menu-label">{{ menu.name }}</div>
    </div>
  </div>

  <el-select v-model="userType" class="m-2" placeholder="Select" size="large">
    <el-option label="普通用户" value="user"  />
    <el-option label="管理员" value="manage"  />
  </el-select>
</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import router from '../router/index';
const menus = reactive(
  [
    { id: 1, name: 'Vue3基础', url: 'base-study', icon: 'MilkTea' },
    { id: 2, name: '表格封装', url: 'table', icon: 'MilkTea' },
    { id: 3, name: 'Hooks', url: 'mouse', icon: 'MilkTea' },
    { id: 4, name: '笔试', url: 'demo', icon: 'MilkTea' },
    { id: 5, name: '基础学习', url: 'base-study', icon: 'MilkTea' },
  ]
);

let userType = ref('user');
function jumpPage(url: string) {
  router.push({
    name: url,
    query: {
      userType: userType.value
    }
  })
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
}
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
