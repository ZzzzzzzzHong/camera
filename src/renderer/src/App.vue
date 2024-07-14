<script setup lang="ts">
import { ref } from 'vue'
import Camera from './views/Camera.vue'
import CameraSetting from './views/CameraSetting.vue'
import AuthorInfo from './components/AuthorInfo.vue'

const page = ref('camera')
const changePage = () => {
  page.value === 'camera' ? (page.value = 'setting') : (page.value = 'camera')
}
</script>

<template>
  <div class="relative">
    <Suspense>
      <Camera v-if="page === 'camera'" @change-page="changePage"></Camera>
      <CameraSetting v-else @change-page="changePage"></CameraSetting>
    </Suspense>
    <AuthorInfo
      v-if="page !== 'camera'"
      class="w-full absolute left-0 bottom-0 flex items-center justify-center bg-[#f0f7ff]"
    ></AuthorInfo>
  </div>
</template>
