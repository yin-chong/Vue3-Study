<template>
<div class="main">
  <div class="grids">
    <div class="grid" v-for="menu in menus" :key="menu.id" @click="jumpPage(menu.url)">
      <component  :is="menu.icon" class="grid-icon"></component>
      <div class="menu-label">{{ menu.name }}</div>
    </div>
  </div>
  
  <el-row :gutter="20">
    <el-col :span="12" :offset="0">
      <el-input v-model="userType" placeholder="" size="normal" disabled>
        <template #prepend>当前用户:</template>
      </el-input>
    </el-col>
    <el-col :span="12" :offset="0">
      <el-button-group>
        <el-button type="success" size="default" @click="exportRecord">导出记录</el-button>
        <el-button type="primary" size="default" @click="logout">登出</el-button>
      </el-button-group>
    </el-col>
  </el-row>
  
  
</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import router from '../router/index';
import { useRoute } from "vue-router";
const menus = reactive(
  [
    // { id: 1, name: 'Vue3基础', url: 'base-study', icon: 'MilkTea' },
    // { id: 2, name: '表格封装', url: 'table', icon: 'MilkTea' },
    // { id: 3, name: 'Hooks', url: 'mouse', icon: 'MilkTea' },
    { id: 4, name: '笔试', url: 'demo', icon: 'MilkTea' },
    // { id: 5, name: '基础学习', url: 'base-study', icon: 'MilkTea' },
  ]
);

const route = useRoute();
let { userType } = route.query || {};
function jumpPage(url: string) {
  router.push({
    name: url,
    query: {
      userType: userType
    }
  })
}
// 导出记录
function exportRecord() {
  const storageValue = window.sessionStorage.getItem('record');
  const record = storageValue !== null ? JSON.parse(storageValue) : null;
  const { userType, start, end } = record;
  let csvData = [
    ['userType', 'startTime', 'endTime']
  ]
  csvData.push([userType, start, end]);
  // 生成要导出的CSV数据
  csvData.map(row => row.join(','));

  // 将CSV数据转换为文本字符串
  const csvString = csvData.join('\n');

  // 创建Blob对象
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  // 创建下载链接
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'data.csv';

  // 模拟点击下载链接
  downloadLink.click();

};
// 登出
function logout() {
  router.push('login')
};
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
