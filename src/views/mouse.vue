<template>
    <div>
        <p>{{ x }}</p>
        <p>{{ y }}</p>
    </div>
</template>

<script setup lang="ts">
import useMousePosition from "../hooks/useMousePosition";
const { x, y } = useMousePosition();
</script>

<style scoped>

</style>