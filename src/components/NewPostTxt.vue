<script setup lang="ts">
import { ref } from 'vue';
import { axios } from '../lib/axios';
import { squealWrite_t , squealWriteSchema} from '../schema/squealValidators';
let content = ref("")
let recipients = ref("")

async function send() {
  const schema = {
    author:"@angolo180", // TODO va generalizzato
    body: {
      type:"text",
      content:content.value,
    },
    receivers: recipients.value.split(", ")
  }

  //squealWriteSchema.parse(schema)
  /*const res = */await axios.post("/squeals",schema)
  //res.status
  resetForm();
}

function resetForm() {
  // Reset the form fields after sending the message
  recipients.value = "";
  content.value = "";
}

/*
<template>
  <div>
    <textarea name="f" id="" cols="30" rows="10" class="" placeholder="Nuovo post..."></textarea>
    <hr>
    <button class="p-4">invia</button>
  </div>
</template>
*/
</script>
<template>
  <div>
    <form @submit.prevent="send" class="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <label for="recipients" class="block text-gray-700 text-sm font-medium">Recipients:</label>
      <input v-model="recipients" type="text" id="recipients" class="mt-1 p-2 w-full border rounded-md" placeholder="Enter recipients" required />

      <label for="message" class="block mt-4 text-gray-700 text-sm font-medium">Message:</label>
      <textarea v-model="content" id="message" class="mt-1 p-2 w-full border rounded-md" placeholder="Write your message" rows="4" required></textarea>

      <button type="submit" class="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">Send</button>
    </form>
  </div>
</template>
