<script setup lang="ts">
import { ref } from 'vue'
import Camera from './components/Camera.vue'
import CameraSetting from './components/CameraSetting.vue'

const page = ref('camera')
const changePage = () => {
  page.value === 'camera' ? (page.value = 'setting') : (page.value = 'camera')
}
</script>

<template>
  <div>
    <Suspense>
      <Camera v-if="page === 'camera'" @change-page="changePage"></Camera>
      <CameraSetting v-else @change-page="changePage"></CameraSetting>
    </Suspense>
  </div>
</template>
