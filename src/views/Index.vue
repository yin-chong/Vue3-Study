<template>
<div>
    <el-button type="primary" size="default" @click="increment">{{ state.count }}</el-button>
    <el-button type="success" @click="changeName">{{ fullName }}</el-button>
</div>
</template>

<script setup lang="ts">
// import { $ref } from "vue/macros";
import { reactive, ref, computed } from 'vue';

// let count = $ref(0)
// function increment() {
//     count++;
// }
interface State {
    count: number
}
let state:State = reactive({count: 0});
let firstName = ref<string>('张');
let secondName = ref<string>('三');
const fullName = computed<string>({
    get() {
        return `${firstName.value} ${secondName.value}`
    },
    set(newwVal) {
        [firstName.value, secondName.value] = newwVal.split(' ')
    }
})
function increment() {
    state.count ++;
}
function changeName() {
    fullName.value = '李 四'
}
</script>

<style lang="scss" scoped>

</style>