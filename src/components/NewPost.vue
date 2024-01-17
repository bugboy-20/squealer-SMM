<script setup lang="ts">
import { Ref , ref } from 'vue';
import NewPostTxt from './NewPostTxt.vue';
import NewPostImg from './NewPostImg.vue';
import NewPostGeo from './NewPostGeo.vue';

//TODO finire
let destinatari = ""
let squealType : Ref<'txt' | 'media' | 'geo'> = ref('txt')
</script>

<template>
  <input class="hidden" type="radio" name="squealType" v-model="squealType" value="txt" id="txt">
  <input class="hidden" type="radio" name="squealType" v-model="squealType" value="media" id="media">
  <input class="hidden" type="radio" name="squealType" v-model="squealType" value="geo" id="geo">
  <div class="border-2 border-blue-200 rounded m-2">
    <input placeholder="destinatari..." v-model="destinatari" />
    <NewPostTxt v-show="squealType == 'txt'" />
    <NewPostImg v-show="squealType == 'media'" />
    <NewPostGeo v-show="squealType == 'geo'" />
    <div class="p-2">
      <label class="rounded p-2 bg-sky-500 text-white m-1 hover:bg-sky-600" :class="{ 'bg-sky-700': squealType == 'txt'}" for="txt">Scrivi</label>
      <label class="rounded p-2 bg-sky-500 text-white m-1 hover:bg-sky-600" :class="{ 'bg-sky-700': squealType == 'media' }" for="media">Immagine</label>
      <label class="rounded p-2 bg-sky-500 text-white m-1 hover:bg-sky-600" :class="{ 'bg-sky-700': squealType == 'geo' }" for="geo">Posizione</label>
    </div>

  </div>
</template>
