<template>
  <div>
    <el-button type="primary" size="default" @click="addSum(+1)">+1</el-button>

    <p>{{ book.name }}</p>
    <p>{{ book.sum }}</p>
    <p>ref: {{ year }}</p>
    <p>ref对象 {{ user.age }}</p>
    <p>computed {{ publishedBooksMessage }}</p>
    <HelloWorld msg="测试" title="萨达萨达啊实打实的撒阿松大" @change-msg="changeMsg"></HelloWorld>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue';
import { ref, reactive, computed, watch } from "vue";
interface Book {
  name?: string;
  sum: number;
}
let book: Book = reactive({ name: "测试", sum: 0 });
const year = ref(2023);
let user = ref({ name: "张三", age: 12 });
function addSum(num: number) {
  let age = user.value.age;
  age += num;
  book.sum += num;
  year.value += num;
  user.value = { name: "张三", age: age };
}
interface Auth {
  name: string;
  books: string[];
}
let auth: Auth = reactive({
  name: "张三",
  books: ["sada sa", "sasadfdf", "sadsa 22", "fer"],
});
let publishedBooksMessage = computed(() => {
  return auth.books.length > 0;
});
watch(year, (newVal) => {
  console.log('watch', newVal);
})

function changeMsg(params: string) {
  console.log('调用父组件的方法，并传了参数', params);
}
</script>

<style lang="scss" scoped></style>
