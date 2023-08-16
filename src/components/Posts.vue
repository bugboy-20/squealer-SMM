
<script setup lang="ts">
import Post from './Post.vue';
import SquealViewes from './SquealViewes.vue';

defineProps<{ vip: string }>()
/*
const count = ref(0)
let posts = await fetch(`${info.API_address}/squeals`)

console.log(await posts.json())
*/
</script>

<template>
<!--Squeals di {{ vip }}:-->
  <div class="p-2 space-y-2">
    <Post/>
    <Post/>
    <Post/>
    <Post/>
  </div>
  <SquealViewes/>

</template>
