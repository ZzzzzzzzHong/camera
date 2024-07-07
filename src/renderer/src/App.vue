<script setup lang="ts">
import { ref } from 'vue'
import Camera from './components/Camera.vue'
import Setting from './components/Setting.vue'

const page = ref('camera')
</script>
<template>
  <div>
    <Suspense>
      <Camera v-if="page === 'camera'"></Camera>
      <Setting v-else></Setting>
    </Suspense>
  </div>
</template>
