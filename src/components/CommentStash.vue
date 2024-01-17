<script setup lang="ts">
import {commentRead_t} from '../schema/commentValidators';
import Comment from './Comment.vue';

let p = defineProps<{comments : commentRead_t[]}>()
let data = Date.now()
</script>

<template>
  <h1>piske feedda</h1>
  <div>
    <Comment v-for="c in comments" :comment="c"/>
  </div>
</template>
