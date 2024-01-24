<script setup lang="ts">

/*
import { squealSchema_t, squealSchema } from '../schema/squealForm';

defineProps<{ squeal: squealSchema_t}>()
*/
//import SquealViewes from './SquealViewes.vue'
import {ref} from 'vue';
import {squealRead_t} from '../schema/squealValidators';
import { axios } from '../lib/axios';

import CommentStash from './CommentStash.vue';

let p = defineProps<{ squeal : squealRead_t}>()


let id = p.squeal.id
let receiver = p.squeal.receivers?.join(', ')
let bodyType = p.squeal.body?.type
let body = p.squeal.body?.content
let upvotes = p.squeal.positive_reaction
let downvotes = p.squeal.negative_reaction
let views = p.squeal.impressions
let data = `${p.squeal.datetime.getHours()}:${p.squeal.datetime.getMinutes()} ${p.squeal.datetime.getDay()}/${p.squeal.datetime.getMonth()}/${p.squeal.datetime.getFullYear()}`;
let showComments = ref(false)
let comments = p.squeal.comments

const emit = defineEmits<{showInteractions:[ r :{positives: string[],negatives: string[],impressions:string[]}]}>()

async function up() {
  const form = {
    op: "upvote"
  }
  const resp = await axios.patch<unknown>(`/squeals/${id}`, form).then(r => r.data)

  console.log(resp)

}

async function views_reations() { 
  const res = await axios.get(`/squeals/${id}/interactions`).then(r => {
    if(r.status == 200)
      return (r.data as {positives: string[],negatives: string[],impressions:string[]})
    return {positives:[],negatives:[],impressions:[]}
  }).then(l => {
    return {
      ...l,
      impressions: l.impressions.filter(e => !(  l.positives.includes(e) || l.negatives.includes(e))) // filtering users that appears in positives or negatives
    }
  })
  emit("showInteractions",res)
}

async function down() {}

</script>

<template>

  <div class="rounded border-2 border-blue-500 shadow">
    <div class="flex flex-row justify-between">
      <p class="px-1 font-light">{{ receiver }}</p>
      <p class="px-1 font-light text-right">{{id}}</p>
    </div>
    <hr>
    <p class="p-2">
      <template v-if="bodyType == 'text'"> {{ body }} </template> <!-- maybe a MessageBody component?-->
      <template v-else-if="bodyType == 'media'"> <img :src="body" alt=""> </template>
    </p>
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-row justify-items-center gap-2 p-2">
        <button class="button text-red-500" @click="up()"> {{ upvotes }} </button>
        <button class="button " @click="views_reations()"> {{ views }} </button>
        <button class="button text-blue-800" @click="down()"> {{ downvotes }} </button>
      </div>

      <button class="button" @click="showComments = !showComments" >Replies</button>

      <p class="p-1 content-center"> {{data}}</p>
    </div>
    <CommentStash v-if="showComments" :comments="comments"/>
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

