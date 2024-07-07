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
      ElMessage.error(error)
    })
})
</script>

<template>
  <div
    class="h-screen w-screen relative overflow-hidden"
    :class="{ 'rounded-full': config.rounded }"
    :style="`border:
    ${config.borderWidth}px
    solid
    ${config.borderColor}`"
  >
    <el-icon
      class="text-stone-300 absolute h-8 z-10 w-full bg-slate-900/60 cursor-pointer top-0 left-1/2 -translate-x-1/2"
      @click="$emit('change-page')"
    >
      <Setting />
    </el-icon>
    <video ref="cameraVideo" class="h-full object-cover"></video>
    <el-icon
      class="text-stone-300 absolute h-8 z-10 w-full bg-slate-900/60 cursor-pointer bottom-0 left-1/2 -translate-x-1/2"
      @click="config.rounded = !config.rounded"
    >
      <Notification />
    </el-icon>
  </div>
</template>
<style></style>
