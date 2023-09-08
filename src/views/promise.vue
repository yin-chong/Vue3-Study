<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import MyPromise from "../utils/promise.js";
let myPromise = new MyPromise((resolve: any, reject: any) => {
    setTimeout(() => {
       resolve('Promise resolved')
    }, 1000)
})
// myPromise.then((res: string) => {
//     console.log(res)
// }).catch((err: any) => {
//     console.log(err)
// })
</script>

<style scoped>

</style>