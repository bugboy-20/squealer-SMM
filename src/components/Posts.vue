
<script setup lang="ts">
import info from './../info.json'
import Post from './Post.vue';
import SquealViewes from './SquealViewes.vue';

import { squealRead_t, squealReadSchema } from './../schema/squealValidators.ts'
import {computed, reactive, ref, watch} from 'vue';
import { axios } from '../lib/axios';
import { isPopular, isRiskUnpopular, isRiskControversial } from '../lib/popularity.ts';

const squViews = ref()

let sortOptions = [
  { value: "recent", text: "per data ↓", sortmethod: (a : squealRead_t, b : squealRead_t) => b.datetime.getTime() - a.datetime.getTime() },
  { value: "antirecent", text: "per data ↑", sortmethod: (a : squealRead_t, b : squealRead_t) => a.datetime.getTime() - b.datetime.getTime() },
  { value: "popular", text: "Popolarità", sortmethod: (a : squealRead_t, b : squealRead_t) => b.positive_reaction - a.positive_reaction },
  { value: "controversy", text: "Controverso", sortmethod: (a : squealRead_t, b : squealRead_t) => b.negative_reaction - a.negative_reaction },
  { value: "mediocre", text: "Mediocre", sortmethod: (a : squealRead_t, b : squealRead_t) => (a.positive_reaction + a.negative_reaction) - (b.positive_reaction + b.negative_reaction) },
]

let filterOptions = [
  { value: "none", text: "Mostra tutti", function: (_:squealRead_t) => true},
  { value: "popular", text: "Mostra popolari", function: isPopular},
  { value: "unpopular", text: "Mostra inpopolari", function: isRiskUnpopular},
  { value: "controversial", text: "Mostra controversi", function: isRiskControversial},
]

let sortmethodSelected = ref(sortOptions[0])
let filterSelected = ref(filterOptions[0])

let p = defineProps<{ vip: string }>()


const showSqueals = () => {
  console.log(`sort ${sortmethodSelected.value.text} filter ${filterSelected.value.text}`)
  return posts.sort(sortmethodSelected.value.sortmethod).filter(filterSelected.value.function)
}

let posts = reactive<squealRead_t[]>([])
let sortedPosts = computed(showSqueals)

const fetchSqueal = async () => {
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
}

console.log(filterSelected.value.function)
watch(p , async () => {await fetchSqueal(); showSqueals()})
//watch(sortedPosts, showSqueals)
//watch(filterOptions, showSqueals)
//posts = computed(() => posts.sort(sortOptions.find(e => e.value == sortmethodSelected.value)?.sortmethod)) // non dovrei usare value



console.log(`${info.API_address}/squeals?author=${p.vip}`)

console.log(sortedPosts)

const showSqViewer = (e : {positives: string[],negatives: string[],impressions:string[]}) => {

  let modeFormat = e.impressions.map(i => {return {name: i , status: "view"}}).concat(e.positives.map(p => {return {name: p , status: "upvote"}})).concat(e.negatives.map(n => {return {name: n , status: "downvote"}})).sort(() => Math.random() - 0.5)
  console.log(e)
  if(squViews.value?.viewsState) {
    squViews.value.viewsState = modeFormat
    squViews.value.visible = true
    console.log('gooorrof')
  }
}


</script>

<template>
<!--Squeals di {{ vip }}:-->
  <div class="p-2 ">
    <select name="sort" id="" v-model="sortmethodSelected" class="py-1 px-2 rounded bg-slate-50 border border-slate-200">
      <option v-for="option in sortOptions" :key="option.text" :value="option"> {{ option.text }} </option>
    </select>
    <select name="filters" id="" v-model="filterSelected" class="py-1 px-2 rounded bg-slate-50 border border-slate-200">
      <option v-for="filter in filterOptions" :key="filter.text" :value="filter"> {{ filter.text }} </option>
    </select>
    <div class="p-2 space-y-2 overflow-auto h-screen pb-40 ">
      <Post :squeal="post" v-for="post in sortedPosts" :key="post.id" @show-interactions="showSqViewer"/>
    </div>
  </div>
  <SquealViewes ref="squViews"/>

</template>
