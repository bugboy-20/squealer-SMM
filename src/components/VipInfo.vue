<script setup lang="ts">
import {watch} from 'vue';
import info from '../info.json'
import { axios } from '../lib/axios';
import {userReadSchema, userRead_t} from '../schema/userValidators';
import { ref } from 'vue';

//TODO aprime una finestra per modificare immagine e dati dell'utente
// REFACTORING

const p = defineProps<{ vip : string}>()

console.log(`${info.API_address}/users/${p.vip}`)
let image = ref("")
let username = ref("")
let firstname = ref("")
let lastname = ref("")

let maxD = ref(0)
let actD = ref(0)

let maxW = ref(0)
let actW = ref(0)

let maxM = ref(0)
let actM = ref(0)

const reloadVip = async (vip : string) => {
  console.log(`changing to ${vip}`)
  let user = await axios.get<unknown>(`/users/${vip}`)
    .then(r => r.data)
    .then(u => { try {
      let userValidated : userRead_t = userReadSchema.parse(u)
      return userValidated
    } catch(e) {
      console.log(e)
    }})
  console.log(user)


  image.value = user?.propic ?? ""
  username.value = user?.username ?? ""
  firstname.value = user?.firstname ?? ""
  lastname.value = user?.lastname ?? ""

  maxD.value = user?.quota.maxD ?? 0
  actD.value = user?.quota.actualD ?? 0

  maxW.value = user?.quota.maxW ?? 0
  actW.value = user?.quota.actualW ?? 0

  maxM.value = user?.quota.maxM ?? 0
  actM.value = user?.quota.actualM ?? 0


}

watch(p, () => reloadVip(p.vip))

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
