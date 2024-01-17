import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { axios } from "./lib/axios"

async function loginAndMakeApp() {
  const data = {
    "username":"@angolo180",
    "password":"Angolo.180"
}

  console.log(await axios.post<string>('/token', data))


  createApp(App).mount('#app')

}

loginAndMakeApp()
