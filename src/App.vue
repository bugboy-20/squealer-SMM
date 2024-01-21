<script setup lang="ts">
import {ref} from 'vue';
import NewPost from './components/NewPost.vue';
import Posts from './components/Posts.vue';
import VipInfo from './components/VipInfo.vue';
import { axios } from './lib/axios';


let vips = ref<string[]>([])
let vip = ref<string>("@angolo180")
//TODO chiarire justify-stretch

vips.value = ["@angolo180","@angolo30"] //await axios.get('users/me/assistedVIP')
</script>

<template>
  <div class="flex flex-row justify-stretch ">
    <div class="basis-1/4 h-screen overflow-hidden">
      <Suspense><VipInfo :vip="vip" /></Suspense>
    </div>
    <div class="basis-1/2 h-screen overflow-hidden ">
      <div class="flex flex-col place-content-center"><select name="vip_valiable" id="" v-model="vip" class="p-4 text-2xl font-bold text-center align-middle rounded bg-white border border-slate-200">
        <option v-for="v in vips" :key="v" :value="v">{{v}}</option>
      </select></div>
      <hr>
      <Suspense> <Posts :vip="vip"/> </Suspense>
    </div>
    <div class="basis-1/4 h-screen overflow-hidden">
      <NewPost :vip="vip"/>
    </div>
  </div>

</template>
