<script setup lang="ts">

/*
import { squealSchema_t, squealSchema } from '../schema/squealForm';

defineProps<{ squeal: squealSchema_t}>()
*/
//import SquealViewes from './SquealViewes.vue'
import info from '../info.json'
let receiver = ["koko","literal"].join(', ')
let body = "kjak cicci sadsa"
let upvotes = 5
let downvotes = 20
let views = 100
let data : Date = new Date(Date.now()-534)
let viewsMoladOpened = false

async function up() {
  const form = {
    op: "upvote"
  }
  const resp = await fetch(`${info.API_address}/squeals/64d399d4e54b1b42c99369ed`, {
    method: "PATCH",
    body: JSON.stringify(form)
  })
  

  console.log(JSON.stringify(resp))

}

async function views_reations() { //TODO. `e` serve solo a far complilare
  let e = viewsMoladOpened
  viewsMoladOpened = true
  return e
}

async function down() {}

//TODO visualizzare le risposte
</script>

<template>

  <div class="rounded border-2 border-blue-500 shadow">
    <p class="px-1 font-light">
      {{ receiver }}   
    </p>
    <hr>
    <p class="p-2">
      {{ body }} <!-- maybe a MessageBody component?-->
    </p>
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-row justify-items-center gap-2 p-2">
        <button class="button text-red-500" @click="up()"> {{ upvotes }} </button>
        <button class="button " @click="views_reations()"> {{ views }} </button>
        <button class="button text-blue-800" @click="down()"> {{ downvotes }} </button>
      </div>

      <button class="button">Replies</button>

      <p class="p-1 content-center"> {{data}}</p>
    </div>
    <div>
      <hr><!-- TODO Maybe a different component?-->
      <div class="flex flex-row gap-2">
        <div class="font-light">Kelly ({{ data.toDateString() }}) </div>
        <p>molto interessante! <br> multi <br> linea </p>
      </div>

      <hr><!-- TODO Maybe a different component?-->
      <div class="flex flex-row gap-2">
        <div class="font-light">Ivan ({{ data.toDateString() }})</div>
        <p>AAAAAAAAAAAAAAAA</p>
      </div>

    </div>
  </div>

  <!--Teleport to="body">
    <SquealViewes/>
  </Teleport-->
</template>

<style scoped>
.button {
  @apply bg-slate-100 rounded p-1 hover:bg-slate-200
}
</style>

