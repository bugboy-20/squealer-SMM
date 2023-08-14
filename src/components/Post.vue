<script setup lang="ts">
/*
import { squealSchema_t, squealSchema } from '../schema/squealForm';

defineProps<{ squeal: squealSchema_t}>()
*/
//TODO usare tailwindcss
let receiver = ["koko","literal"]
let body = "kjak cicci sadsa"
let up = 5
let down = 20
let views = 100
</script>

<template>

  <div class="rounded border-2 border-blue-500 shadow">
    <p class="">
      {{ receiver }}   
    </p>
    <hr>
    <p>
      {{ body }}
    </p>
    <div class="flex flex-row justify-center justify-items-center gap-2">
      <p class=""> {{ up }} </p>
      <p class=""> {{ views }} </p>
      <p class=""> {{ down }} </p>
    </div>
  </div>

</template>

