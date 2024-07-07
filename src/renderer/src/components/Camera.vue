<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useConfig } from '../composables/useConfig'
defineEmits(['change-page'])
const { config } = useConfig()

const constraints = {
  audio: false,
  video: {
    deviceId: config.value.deviceId
  }
} as MediaStreamConstraints

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
      ElMessage.error('无法打开摄像头')
      console.error(error)
    })
})
</script>

<template>
  <div
    class="h-screen w-screen relative overflow-hidden group"
    :class="{ 'rounded-full': config.rounded }"
    :style="`border:
    ${config.borderWidth}px
    solid
    ${config.borderColor}`"
  >
    <video ref="cameraVideo" class="h-full object-cover"></video>
    <el-icon
      class="text-stone-300 absolute h-0 z-10 w-full bg-slate-900/60 cursor-pointer top-0 left-1/2 -translate-x-1/2 group-hover:h-8 duration-500"
      @click="$emit('change-page')"
    >
      <Setting class="hidden group-hover:block" />
    </el-icon>
    <el-icon
      class="text-stone-300 absolute h-0 z-10 w-full bg-slate-900/60 cursor-pointer bottom-0 left-1/2 -translate-x-1/2 group-hover:h-8 duration-500"
      @click="config.rounded = !config.rounded"
    >
      <Notification class="hidden group-hover:block" />
    </el-icon>
  </div>
</template>
<style></style>
