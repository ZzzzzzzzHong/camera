<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { SettingTwo, GraphicDesign, FlipHorizontally } from '@icon-park/vue-next'
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
const setAspectRatio = () => {
  config.value.rounded ? window.api.setAspectRatio(1) : window.api.setAspectRatio(16 / 9)
}
const isRounded = () => {
  config.value.rounded = !config.value.rounded
  setAspectRatio()
  updateConfig()
}
const isflip = () => {
  config.value.flip = !config.value.flip
  updateConfig()
}
setAspectRatio()

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
    class="h-screen w-screen relative overflow-hidden"
    :class="{ 'rounded-full': config.rounded }"
    :style="`border:
    ${config.borderWidth}px
    solid
    ${config.borderColor}`"
  >
    <video
      v-if="!hasError"
      ref="cameraVideo"
      class="h-full w-full object-cover"
      :style="{
        transform: config.flip ? 'rotateY(180deg)' : ''
      }"
    ></video>
    <div v-else class="bg-[#c8d6e5] w-full h-full">
      <el-result icon="error" sub-title="请检查摄像头权限"> </el-result>
    </div>
    <div
      class="nodrag w-full h-9 bg-slate-900/50 cursor-pointer absolute bottom-0 left-0 opacity-0 hover:opacity-100 duration-500"
    >
      <div class="setting-menu h-full flex justify-center items-center gap-1 text-stone-300">
        <SettingTwo theme="outline" size="16" @click="$emit('change-page')" />
        <GraphicDesign theme="outline" size="16" @click="isRounded" />
        <FlipHorizontally theme="outline" size="16" @click="isflip" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.setting-menu {
  span {
    @apply cursor-pointer;
  }
}
</style>
