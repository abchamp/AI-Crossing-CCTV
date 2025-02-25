import { ref } from 'vue'

export const mockCameraData = ref({
  preview: 'https://placehold.co/1920x1080/1f2937/1f2937',
  streamUrl: 'https://example.com/stream1',
  aiUrl: 'https://example.com/ai1',
  isActive: true,
  dangerLevel: 3,
  name: 'Camera 1',
  stationName: 'Bangkok Central Station',
  startPoint: 'Sukhumvit',
  endPoint: 'Silom',
})

export const mockCameraList = ref([
  {
    id: 1,
    preview: 'https://placehold.co/400x225/1f2937/1f2937',
    streamUrl: 'https://example.com/stream1',
    aiUrl: 'https://example.com/ai1',
    isActive: true,
    dangerLevel: 3,
    name: 'Camera 1',
    stationName: 'Bangkok Central Station',
    startPoint: 'Sukhumvit',
    endPoint: 'Silom',
  },
  {
    id: 2,
    preview: 'https://placehold.co/400x225/1f2937/1f2937',
    streamUrl: 'https://example.com/stream2',
    aiUrl: 'https://example.com/ai2',
    isActive: false,
    dangerLevel: 4,
    name: 'Camera 2',
    stationName: 'Thonburi Station',
    startPoint: 'Wongwian Yai',
    endPoint: 'Bang Wa',
  },
  {
    id: 3,
    preview: 'https://placehold.co/400x225/1f2937/1f2937',
    streamUrl: 'https://example.com/stream3',
    aiUrl: 'https://example.com/ai3',
    isActive: true,
    dangerLevel: 2,
    name: 'Camera 3',
    stationName: 'Lat Phrao Station',
    startPoint: 'Lat Phrao',
    endPoint: 'Bang Kapi',
  },
])
