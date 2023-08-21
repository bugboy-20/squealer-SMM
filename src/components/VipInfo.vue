<script setup lang="ts">
//TODO aprime una finestra per modificare immagine e dati dell'utente
let image = "https://picsum.photos/200"
let username = "UU"
let firstname = "Salvatore"
let lastname = "Lervini"

let maxD = 500
let actD = 234

let maxW = 600
let actW = 335

let maxM = 1000
let actM = 654

</script>

<template>
  <div class="flex flex-col justify-between p-4 gap-4">
    <div class="flex flex-col inset-0 aspect-square  justify-center">
      <img :src="image" alt="" class="rounded-md scale-100">
    </div>
    <div class="border rounded p-4 text-xl">
      {{ username }}
      <hr>
      {{ firstname }} {{ lastname }}
      <hr>
      day: {{ actD }}/{{maxD}}
      <hr>
      week: {{ actW }}/{{maxW}}
      <hr>
      month: {{ actM }}/{{maxM}}
    </div>
    
  </div>
</template>
