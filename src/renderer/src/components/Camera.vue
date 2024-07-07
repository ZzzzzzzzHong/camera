<template>
  <div class="h-screen w-screen relative">
    <el-icon color="#409efc" class="absoule top-2 left-2"> <Edit /></el-icon>
    <video ref="cameraVideo" class="h-full object-cover"></video>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'

const constraints = {
  audio: false,
  video: true
}
const cameraVideo = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      if (cameraVideo.value) {
        cameraVideo.value.srcObject = stream
        cameraVideo.value.play()
      }
    })
    .catch((error) => {
      ElMessage.error(error)
    })
})
</script>

<style></style>
