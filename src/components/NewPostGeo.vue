<script setup lang="ts">
import { onMounted, ref } from "vue";
import L, {DragEndEvent} from "leaflet";
import 'leaflet/dist/leaflet.css';
import { geoJSON } from "leaflet";

const lat = ref(0);
const lng = ref(0);
const map = ref();
const mapContainer = ref();

let d = defineProps<{vip: string}>()
let recipients = ref("")

onMounted(() => {
  map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);

  L.marker([lat.value, lng.value],{
    draggable : true,
    autoPan: true,
  })
  .addTo(map.value)
  .on("dragend",(event)=> {
    let e : DragEndEvent = event
    let pos = e.target.getLatLng()
    lat.value = pos.lat
    lng.value = pos.lng
  });
});



function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
      lat.value = position.coords.latitude;
      lng.value = position.coords.longitude;
      map.value.setView([lat.value, lng.value], 13);


    });
  }
}

async function send() {
  let geo = {
    type:"FeatureCollection",
    features:[{
      type:"Feature",
      properties:{
        popup:`posizione di ${d.vip}`
      },
      geometry:{
        type:"Point",
        coordinates:[lat.value,lng.value]
      }}],
    center:[lat.value,lng.value]}

  const schema = {
    author:d.vip,
    body: {
      type:"geo",
      content:JSON.stringify(geo)
    },
    receivers: recipients.value.split(", ")
  }

  //squealWriteSchema.parse(schema)
  /*const res = */await axios.post("/squeals",schema)
}


</script>

<template>
  <div class="m-2 space-2">
    <div ref="mapContainer" class="aspect-square w-max" style="width: 400px; height: 400px"></div>
    <button @click="getLocation()" class="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">Set current location</button>
    <button @click="send()" class="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">Send</button>
  </div>
</template>

<style scoped>
</style>
