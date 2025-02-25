<template>
  <div
    class="luxury-card tw-p-1 tw-rounded-xl tw-bg-white tw-h-full tw-flex tw-flex-col tw-relative"
  >
    <!-- Map Container -->
    <div class="tw-flex-1 tw-rounded-lg tw-overflow-hidden">
      <div id="map" class="tw-h-full tw-w-full"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { stations } from '../../data/mockStations'

// Fix for the marker icon issue in Leaflet with Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
})

let map = null

// Train route coordinates (Chachoengsao to Bangkok)
const routeCoordinates = [
  { name: 'Chachoengsao', coords: [13.6904, 101.0771] },
  { name: 'Bang Nam Prieo', coords: [13.7178, 100.9837] },
  { name: 'Ban Pho', coords: [13.7321, 100.9172] },
  { name: 'Khlong Luang Phaeng', coords: [13.7368, 100.8508] },
  { name: 'Lat Krabang', coords: [13.7272, 100.7789] },
  { name: 'Hua Mak', coords: [13.7486, 100.6451] },
  { name: 'Bangkok', coords: [13.7563, 100.5018] },
]

onMounted(() => {
  // Initialize map
  map = L.map('map', {
    zoomControl: true,
    zoomAnimation: true,
  })

  // Add the OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors',
  }).addTo(map)

  // Create a polyline for the train route
  const routeLine = L.polyline(
    routeCoordinates.map((point) => point.coords),
    {
      color: '#C4A052', // Gold color to match the theme
      weight: 4,
      opacity: 0.8,
    },
  ).addTo(map)

  // Add markers for each station
  routeCoordinates.forEach((station) => {
    L.marker(station.coords)
      .bindPopup(
        `
        <div class="tw-font-medium">${station.name}</div>
        <div class="tw-text-sm tw-text-gray-600">${
          stations.find((s) => s.name.includes(station.name))?.cameras.length || 0
        } cameras</div>
      `,
      )
      .addTo(map)
  })

  // Calculate the bounds of the route and fit the map to show all markers
  const bounds = routeLine.getBounds()
  map.fitBounds(bounds, {
    padding: [50, 50], // Add padding around the bounds
    maxZoom: 11, // Limit the zoom level
    animate: true, // Enable smooth animation
    duration: 1, // Animation duration in seconds
  })

  // Force a resize after mounting to ensure the map fills the container
  setTimeout(() => {
    map.invalidateSize()
  }, 100)
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style>
/* Ensure the map container takes full height */
#map {
  min-height: 400px;
  z-index: 1; /* Ensure map stays below toggle buttons */
}

/* Fix for marker icon paths */
.leaflet-default-icon-path {
  background-image: url('leaflet/dist/images/marker-icon.png');
}

/* Custom popup styles */
.leaflet-popup-content {
  padding: 8px;
  margin: 8px !important;
}

/* Ensure Leaflet controls stay below the toggle button */
.leaflet-control-container {
  z-index: 1;
}
</style>
