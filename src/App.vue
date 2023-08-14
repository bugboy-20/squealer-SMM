<script setup lang="ts">
import Posts from './components/Posts.vue';

let vip = "jantizio"

</script>

<template>
  <div class="flex flex-row p-8 items-center justify-stretch">
    <div class="basis-1/3">
      <h1>user</h1>
    </div>
    <div class="basis-1/3">
      <h1 class="text-center font-bold text-2xl">{{vip}}</h1>
      <hr>
      <Posts vip="vip"/>
    </div>
    <div class="basis-1/3">
      <h1>info</h1>
    </div>
  </div>

</template>
