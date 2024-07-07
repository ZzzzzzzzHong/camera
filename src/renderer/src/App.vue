<script setup lang="ts">
import { ref } from 'vue'
import Camera from './components/Camera.vue'
import CameraSetting from './components/CameraSetting.vue'

const page = ref('camera')
</script>
<template>
  <div>
    <Suspense>
      <Camera v-if="page === 'camera'"></Camera>
      <CameraSetting v-else></CameraSetting>
    </Suspense>
  </div>
</template>
