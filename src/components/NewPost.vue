<script setup lang="ts">
import { Ref , ref } from 'vue';
import NewPostTxt from './NewPostTxt.vue';
import NewPostImg from './NewPostImg.vue';
import NewPostGeo from './NewPostGeo.vue';
import {string} from 'zod';

//TODO finire
let destinatari = ""
let squealType : Ref<'txt' | 'media' | 'geo'> = ref('txt')
let d = defineProps<{vip: string}>()
</script>

<template>
  <input class="hidden" type="radio" name="squealType" v-model="squealType" value="txt" id="txt">
  <input class="hidden" type="radio" name="squealType" v-model="squealType" value="media" id="media">
  <input class="hidden" type="radio" name="squealType" v-model="squealType" value="geo" id="geo">
  <div class="border-2 border-blue-200 rounded m-2">
    <NewPostTxt :vip="d.vip" v-show="squealType == 'txt'" />
    <NewPostImg :vip="d.vip" v-show="squealType == 'media'" />
    <NewPostGeo :vip="d.vip" v-show="squealType == 'geo'" />
    <div class="px-2 py-4">
      <label class="rounded p-2 bg-sky-500 text-white m-1 hover:bg-sky-600" :class="{ 'bg-sky-700': squealType == 'txt'}" for="txt">Scrivi</label>
      <label class="rounded p-2 bg-sky-500 text-white m-1 hover:bg-sky-600" :class="{ 'bg-sky-700': squealType == 'media' }" for="media">Immagine</label>
      <label class="rounded p-2 bg-sky-500 text-white m-1 hover:bg-sky-600" :class="{ 'bg-sky-700': squealType == 'geo' }" for="geo">Posizione</label>
    </div>

  </div>
</template>
