<script setup lang="ts">

import { commentRead_t } from '../schema/commentValidators'

let p = defineProps<{comment: commentRead_t}>()

let bodyType = p.comment.body?.type
let body = p.comment.body?.content
let author = p.comment.author
let id = p.comment._id
let data = `${p.comment.datetime.getHours()}:${p.comment.datetime.getMinutes()} ${p.comment.datetime.getDay()}/${p.comment.datetime.getMonth()}/${p.comment.datetime.getFullYear()}`;
let sub_comments = p.comment.comments
</script>

<template>
    <hr><!-- TODO Maybe a different component?-->
    <div class="flex flex-row gap-2">
      <a href="#{{id}}"><div class="font-light"> {{ author }} ({{data}}) <a href="{{ref}}">ref</a> </div></a>
      <p v-if="bodyType == 'text'">{{body}}</p>
      <p v-else-if="bodyType == 'media'"><img src="{{body}}"></p>
    </div>
    <Comment v-for="comment in sub_comments" :comment="comment"/>
</template>
