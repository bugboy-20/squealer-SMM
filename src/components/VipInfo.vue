<script setup lang="ts">
import info from '../info.json'
import {userReadSchema, userRead_t} from '../schema/userValidators';


//TODO aprime una finestra per modificare immagine e dati dell'utente

const p = defineProps<{ vip : string}>()

console.log(`${info.API_address}/users/${p.vip}`)

let user : userRead_t = await fetch(`${info.API_address}/users/${p.vip}`)
  .then(r => r.json())
  .then(u => { try {
    let userValidated : userRead_t = userReadSchema.parse(u)
    return userValidated
  } catch(e) {
    console.log(e)
  }})

let image = user.propic
let username = user.username
let firstname = user.firstname
let lastname = user.lastname

let maxD = user.quota.maxD
let actD = user.quota.actualD

let maxW = user.quota.maxW
let actW = user.quota.actualW

let maxM = user.quota.maxM
let actM = user.quota.actualM

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
