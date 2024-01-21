<script setup lang="ts">
import { ref } from 'vue';
import { axios } from '../lib/axios';

let d = defineProps<{vip: string}>()

const data = ref({
  recipients: '',
  imageUrl: '',
});

const sendMessage = async () => {
  // Implement your logic to send the message using data.recipients and data.imageUrl
  console.log('Sending message to:', data.value.recipients);
  console.log('Image URL:', data.value.imageUrl);
  const schema = {
    author:d.vip,
    body: {
      type:"media",
      content:data.value.imageUrl
    },
    receivers: data.value.recipients.split(", ")
  }
/*const res = */await axios.post("/squeals",schema)

  // You can make an API call or perform any other actions as needed

  // After sending the message, you might want to reset the form
  resetForm();
};

const resetForm = () => {
  // Reset the form fields after sending the message
  data.value.recipients = '';
  data.value.imageUrl = '';
};

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    // Assuming you want to upload the image as a file
    // You can perform additional logic here, like showing a preview
    var formData = new FormData();
    formData.append("image", file);
    let res = axios.post('media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    res.then(r => { data.value.imageUrl = r.data}).then( () => {
      console.log('Image uploaded:', file);
      console.log('Image URL:', data.value.imageUrl);})
  }
};

const toggleImageInput = () => {
  // Toggle between file input and URL input
  data.value.imageUrl = '';
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>

<template>
  <div>
    <form @submit.prevent="sendMessage" class="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <label for="recipients" class="block text-gray-700 text-sm font-medium">Recipients:</label>
      <input v-model="data.recipients" type="text" id="recipients" class="mt-1 p-2 w-full border rounded-md" placeholder="Enter recipients" required />

      <label for="image" class="block mt-4 text-gray-700 text-sm font-medium">Image:</label>
      <div class="flex items-center mt-1">
        <!--input type="file" accept="image/* video/*" @change="handleImageUpload"/ -->
        <input v-model="data.imageUrl" type="text" id="image" class="flex-grow p-2 border rounded-md" placeholder="Paste image URL" required />
        <button @click="toggleImageInput" type="button" class="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300">
          {{ data.imageUrl ? 'Upload Image' : 'Paste URL' }}
        </button>
      </div>

      <button type="submit" class="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">Send</button>
    </form>
  </div>
</template>
