<script setup lang="ts">
import {commentRead_t} from '../schema/commentValidators';
import Comment from './Comment.vue';

let p = defineProps<{comments : commentRead_t[]}>()
</script>

<template>
  <h1>Commenti: </h1>
  <div>
    <div v-if="p.comments.length == 0" class="text-center">Non ci sono commenti, al momento</div>
    <Comment v-for="c in comments" :comment="c" :sub-comment="false"/>
  </div>
</template>
