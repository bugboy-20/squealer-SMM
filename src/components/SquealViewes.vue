<script setup lang="ts">
let viewsState = [
  {
    name: "kabobo",
    status: "view"
  },
  {
    name: "koko",
    status: "upvote"
  },
  {
    name: "susan",
    status: "downvote"
  }]
</script>

<template>
  <div>
    <div v-for="vs in viewsState">
      <div>
        {{ vs.name }}
        <hr>
        {{ vs.status }}
      </div>
    </div>
  </div>
</template>
