<template>
  <div class="h-screen w-screen relative">
    <el-icon
      color="#ccc"
      class="absolute h-6 z-10 w-full bg-slate-900/50 cursor-pointer top-0 left-1/2 -translate-x-1/2"
    >
      <Setting />
    </el-icon>
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
