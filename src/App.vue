<script setup lang="ts">
import {ref} from 'vue';
import NewPost from './components/NewPost.vue';
import Posts from './components/Posts.vue';
import VipInfo from './components/VipInfo.vue';
import VipSelector from './components/VipSelector.vue';

let vip = ref<string>("")

const changeVip = (v : string) => {
  vip.value = v;
}
</script>


<template>
  <div class="flex flex-row justify-stretch ">
    <div class="basis-1/4 h-screen overflow-hidden">
      <Suspense><VipInfo :vip="vip" /></Suspense>
    </div>
    <div class="basis-1/2 h-screen overflow-hidden ">
      <Suspense><VipSelector @vip-selected="changeVip"/></Suspense>
      <hr>
      <Suspense> <Posts :vip="vip"/> </Suspense>
    </div>
    <div class="basis-1/4 h-screen overflow-hidden">
      <NewPost :vip="vip"/>
    </div>
  </div>
</template>
