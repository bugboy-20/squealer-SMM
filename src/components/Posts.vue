
<script setup lang="ts">
import Post from './Post.vue';
import SquealViewes from './SquealViewes.vue';

defineProps<{ vip: string }>()
/*
const count = ref(0)
let posts = await fetch(`${info.API_address}/squeals`)

console.log(await posts.json())
*/
//TODO filtri
</script>

<template>
<!--Squeals di {{ vip }}:-->
  <div class="p-2">
    <select name="filtri" id="" class="py-1 px-2 rounded bg-slate-50 border border-slate-200">
      <option value="recent">per data ↑</option>
      <option value="antirecent">per data ↓</option>
      <option value="popular">Popolarità</option>
      <option value="controversy">Controverso</option>
      <option value="mediocre">Mediocre</option>
    </select>
    <div class="p-2 space-y-2">
      <Post/>
      <Post/>
      <Post/>
      <Post/>
    </div>
  </div>
  <SquealViewes/>

</template>
