<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useConfig } from '../composables/useConfig'
defineEmits(['change-page'])
const { config, updateConfig } = useConfig()

const constraints = {
  audio: false,
  video: {
    deviceId: config.value.deviceId
  }
} as MediaStreamConstraints

const hasError = ref<boolean>(false)
const cameraVideo = ref<HTMLVideoElement | null>(null)
const isRounded = () => {
  config.value.rounded = !config.value.rounded
  config.value.rounded ? window.api.setAspectRatio(1) : window.api.setAspectRatio(16 / 9)
  updateConfig()
}

onMounted(() => {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      if (cameraVideo.value) {
        hasError.value = false
        cameraVideo.value.srcObject = stream
        cameraVideo.value.play()
      }
    })
    .catch((error) => {
      hasError.value = true
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
    <video v-if="!hasError" ref="cameraVideo" class="h-full object-cover"></video>
    <div v-else class="bg-[#c8d6e5] w-full h-full">
      <el-result icon="error" sub-title="请检查摄像头权限"> </el-result>
    </div>
    <el-icon
      class="text-stone-300 absolute h-0 z-10 w-full bg-slate-900/60 cursor-pointer top-0 left-1/2 -translate-x-1/2 group-hover:h-8 duration-500"
    >
      <Setting class="hidden group-hover:block" @click="$emit('change-page')" />
    </el-icon>
    <el-icon
      class="text-stone-300 absolute h-0 z-10 w-full bg-slate-900/60 cursor-pointer bottom-0 left-1/2 -translate-x-1/2 group-hover:h-8 duration-500"
    >
      <Notification class="hidden group-hover:block" @click="isRounded" />
    </el-icon>
  </div>
</template>
<style></style>
