
<script setup lang="ts">
import Post from './Post.vue';

defineProps<{ vip: string }>()
/*
const count = ref(0)
let posts = await fetch(`${info.API_address}/squeals`)

console.log(await posts.json())
*/
</script>

<template>
<!--Squeals di {{ vip }}:-->
  <div class="">
    <Post/>
    <Post/>
    <Post/>
    <Post/>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
