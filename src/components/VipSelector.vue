<script setup lang="ts">
import { ref, watch } from 'vue';
import { axios } from '../lib/axios'

let vips = ref<string[]>(await axios.get('users/me/assistedVIP').then(r => r.data))
let vip = ref<string>(vips.value[0])
//TODO chiarire justify-stretch

const emit = defineEmits<{ vipSelected: [ name: string]}>()

watch(vip,() => emit('vipSelected',vip.value))
</script>

<template>
  <div class="flex flex-col place-content-center"><select name="vip_valiable" id="" v-model="vip" class="p-4 text-2xl font-bold text-center align-middle rounded bg-white border border-slate-200">
        <option v-for="v in vips" :key="v" :value="v">{{v}}</option>
      </select></div>
</template>
