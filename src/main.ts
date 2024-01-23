import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { axios } from "./lib/axios"

async function loginAndMakeApp() {
  const data =  {
    "username":"@gigasmm",
    "password":"Giga.smm1"
} 

  console.log(await axios.post<string>('/token', data))


  createApp(App).mount('#app')

}

loginAndMakeApp()
