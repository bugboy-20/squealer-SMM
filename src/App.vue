<script setup lang="ts">
import NewPost from './components/NewPost.vue';
import Posts from './components/Posts.vue';
import VipInfo from './components/VipInfo.vue';

let vip = "@angolo180"
//TODO chiarire justify-stretch
</script>

<template>
  <div class="flex flex-row justify-stretch ">
    <div class="basis-1/4 h-screen overflow-hidden">
      <Suspense><VipInfo :vip="vip" /></Suspense>
    </div>
    <div class="basis-1/2 h-screen overflow-hidden ">
      <h1 class="text-center font-bold text-2xl p-4">{{vip}}</h1>
      <hr>
      <Suspense> <Posts :vip="vip"/> </Suspense>
    </div>
    <div class="basis-1/4 h-screen overflow-hidden">
      <NewPost :vip="vip"/>
    </div>
  </div>

</template>
