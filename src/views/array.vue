import { array } from 'yargs';
<template>
    <div>

    </div>
</template>

<script setup lang="ts">
let list = [
    { pid: 0, id: 1, name: 'item1' },
    { pid: 0, id: 2, name: 'item2' },
    { pid: 1, id: 3, name: 'item3' },
    { pid: 2, id: 4, name: 'item4' },
];
interface ITEM {
    pid: number,
    id: number,
    name: string,
    children?: Array<ITEM>
}
function arrayToTree(array: Array<ITEM>): Array<ITEM> {
    let list: Array<ITEM> = [];
    let nodeMap: any = {};
    for(let item of array) {
        item.children  = [];
        nodeMap[item.id] = item;
    }
    for(let item of array) {
        if(item.pid != 0) {
            nodeMap[item.pid].children = item;
        } else {
            list.push(item);
        }
    }
    return list;
}
const tree = arrayToTree(list);
console.log(tree);
</script>

<style scoped>

</style>