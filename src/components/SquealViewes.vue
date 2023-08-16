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

function icon(status : string) {
  switch(status) {
    case "view": return "👁️";
    case "upvote": return "⬆️";
    case "downvote": return "⬇️";

  }
}

//TODO l'ultimo non deve avere hr (?)
</script>

<template>
  <Teleport to="body">
  <div class="absolute left-[40vw] top-[40vh] self-center z-50 rounded border-2 border-slate-50 shadow-md bg-slate-50">
    <div class="flex flex-col p-2">
      <div class="self-end hover:bg-slate-200 px-1 rounded">X</div>
      <template v-for="vs in viewsState">
          <div class="flex flex-row justify-between gap-2">
            <div>{{ vs.name }}</div> <div>{{ icon(vs.status) }}</div>
          </div>
          <hr>
      </template>
    </div>
  </div>
  </Teleport>
</template>
