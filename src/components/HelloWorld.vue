<script setup lang="ts">
defineProps({
  msg: String,
  title: {
    type: [String, Number],
    default: "测试titletitle",
  },
});
const emit = defineEmits(['change-msg'])
function changeMsg() {
  emit('change-msg', '111')
}
</script>

<template>
  <div class="greetings">
    <h4 class="green">{{ msg }}</h4>
    <h5 class="green">title: {{ title }}</h5>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      What's next?
    </h3>
    <el-button type="primary" size="default" @click="changeMsg">修改msg</el-button>
    
  </div>
</template>

<style scoped>
h4 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h5 {
  font-size: 1.2rem;
}

.greetings h3,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h3,
  .greetings h3 {
    text-align: left;
  }
}
</style>
