<script setup lang="ts">

import { commentRead_t } from '../schema/commentValidators'
import { ref } from 'vue';

let p = defineProps<{comment: commentRead_t, subComment: boolean}>()

let bodyType = p.comment.body?.type
let body = p.comment.body?.content
let author = p.comment.author
let id = p.comment.id
let data = `${p.comment.datetime.getHours()}:${p.comment.datetime.getMinutes()} ${p.comment.datetime.getDay()}/${p.comment.datetime.getMonth()}/${p.comment.datetime.getFullYear()}`;
let sub_comments = p.comment.comments

const glowing = ref(false)
const glowComment = () => {
  glowing.value = true
  setTimeout(() => { glowing.value = false},500)
}

</script>

<template>
    <hr>
    <div class="flex flex-row gap-2" :class="{glowingcomment: glowing}">
      <button v-if="p.subComment" @click="$emit('selectFather')" class="bg-slate-200 rounded ml-2 px-1">↑</button>
      <div class="font-light" > {{ author }} ({{data}})</div>
      <p v-if="bodyType == 'text'">{{body}}</p>
      <p v-else-if="bodyType == 'media'"><img src="{{body}}"></p>
    </div>
    <Comment v-for="comment in sub_comments" :comment="comment" @select-father="glowComment" :sub-comment="true" />
</template>

<style scoped>

.glowingcomment {
  animation: glow 0.4s normal 10ms 1;
}

@keyframes glow {
  0%,100% { background-color: white; }
  50% { background-color: #a0ffff; }
}
</style>
