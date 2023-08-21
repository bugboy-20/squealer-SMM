<script setup lang="ts">
import NewPost from './components/NewPost.vue';
import Posts from './components/Posts.vue';
import VipInfo from './components/VipInfo.vue';

let vip = "jantizio"
//TODO chiarire justify-stretch
</script>

<template>
  <div class="flex flex-row justify-stretch ">
    <div class="basis-1/4">
      <VipInfo/>
    </div>
    <div class="basis-1/2 ">
      <h1 class="text-center font-bold text-2xl p-4">{{vip}}</h1>
      <hr>
      <Posts vip="vip"/>
    </div>
    <div class="basis-1/4">
      <NewPost/>
    </div>
  </div>

</template>
