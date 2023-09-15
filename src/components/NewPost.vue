<script setup lang="ts">
import { Ref , ref } from 'vue';
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
    <textarea v-show="squealType == 'txt'" name="f" id="" cols="30" rows="10" class="" placeholder="Nuovo post..."></textarea>
    <div>
      <label class="rounded p-2 bg-sky-500 text-white m-1 hover:bg-sky-600" :class="{ 'bg-sky-700': squealType == 'txt'}" for="txt">Scrivi</label>
      <label class="rounded p-2 bg-sky-500 text-white m-1 hover:bg-sky-600" :class="{ 'bg-sky-700': squealType == 'media' }" for="media">Immagine</label>
      <label class="rounded p-2 bg-sky-500 text-white m-1 hover:bg-sky-600" :class="{ 'bg-sky-700': squealType == 'geo' }" for="geo">Posizione</label>
    </div>

  </div>
</template>
