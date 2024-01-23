
<script setup lang="ts">
import info from './../info.json'
import Post from './Post.vue';
import SquealViewes from './SquealViewes.vue';

import { squealRead_t, squealReadSchema } from './../schema/squealValidators.ts'
import {computed, reactive, ref, watch} from 'vue';
import { axios } from '../lib/axios';



let sortOptions = [
  { value: "recent", text: "per data ↓", sortmethod: (a : squealRead_t, b : squealRead_t) => b.datetime.getTime() - a.datetime.getTime() },
  { value: "antirecent", text: "per data ↑", sortmethod: (a : squealRead_t, b : squealRead_t) => a.datetime.getTime() - b.datetime.getTime() },
  { value: "popular", text: "Popolarità", sortmethod: (a : squealRead_t, b : squealRead_t) => b.positive_reaction - a.positive_reaction },
  { value: "controversy", text: "Controverso", sortmethod: (a : squealRead_t, b : squealRead_t) => b.negative_reaction - a.negative_reaction },
  { value: "mediocre", text: "Mediocre", sortmethod: (a : squealRead_t, b : squealRead_t) => (a.positive_reaction + a.negative_reaction) - (b.positive_reaction + b.negative_reaction) }, //TODO aggiungere / visuals
]


let sortmethodSelected = ref("recent")

let p = defineProps<{ vip: string }>()

let posts = reactive<squealRead_t[]>([])
let sortedPosts = ref<squealRead_t[]>([])

watch(p , async () => {
  posts = await axios.get<unknown[]>(`/squeals?author=${p.vip}`)
    .then(r => r.data)
    .then((pp) =>
      pp.map(p => {
        try {
          return squealReadSchema.parse(p)
        } catch (e) {
          console.log(e)
          return null;
        }
      }).filter((e): e is squealRead_t => e !== null).reverse()
    )//.then( posts => posts.sort(sortOptions.find(e => e.value == sortmethodSelected.value)?.sortmethod))
    .catch(e => {
      console.error(e)
      return []
    })
  sortedPosts.value = posts.sort(sortOptions.find(e => e.value == sortmethodSelected.value)?.sortmethod)
})

//posts = computed(() => posts.sort(sortOptions.find(e => e.value == sortmethodSelected.value)?.sortmethod)) // non dovrei usare value



console.log(`${info.API_address}/squeals?author=${p.vip}`)

console.log(sortedPosts)

/*TODO 
 * filtri
 * gestire overflow
 */


</script>

<template>
<!--Squeals di {{ vip }}:-->
  <div class="p-2 ">
    <select name="filtri" id="" v-model="sortmethodSelected" class="py-1 px-2 rounded bg-slate-50 border border-slate-200">
      <option v-for="option in sortOptions" :key="option.value" :value="option.value"> {{ option.text }} </option>
    </select>
    <div class="p-2 space-y-2 overflow-auto h-screen pb-40 ">
      <Post :squeal="post" v-for="post in sortedPosts" :key="post.id" />
    </div>
  </div>
  <SquealViewes/>

</template>
