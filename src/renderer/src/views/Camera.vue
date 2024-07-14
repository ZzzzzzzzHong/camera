<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { SettingTwo, GraphicDesign, FlipHorizontally, FullScreenPlay } from '@icon-park/vue-next'
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

// 切换全屏
const toggleFullScreen = async () => {
  if (config.value.rounded) return
  // 当前页面是否在全屏模式
  if (document.fullscreenElement) {
    await document.exitFullscreen()
  } else {
    await document.documentElement.requestFullscreen()
  }
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
  <div class="h-screen relative overflow-hidden" :class="{ 'rounded-full': config.rounded }" :style="`border:
    ${config.borderWidth}px
    solid
    ${config.borderColor}`">
    <video v-if="!hasError" ref="cameraVideo" class="h-full w-full overflow-hidden object-cover" :style="{
      transform: config.flip ? 'rotateY(180deg)' : '',
      'border-radius': config.rounded ? '50%' : '0'
    }"></video>
    <div v-else class="bg-[#c8d6e5] w-full h-full">
      <el-result icon="error" sub-title="请检查摄像头权限"> </el-result>
    </div>
    <div
      class="nodrag w-full h-9 bg-slate-900/50 cursor-pointer absolute bottom-0 left-0 opacity-0 hover:opacity-100 duration-500">
      <div class="setting-menu h-full flex justify-center items-center gap-1.5 text-stone-300">
        <el-tooltip content="设置" show-after="500">
          <SettingTwo theme="outline" size="16" @click="$emit('change-page')" />
        </el-tooltip>
        <el-tooltip content="圆角切换" show-after="500">
          <GraphicDesign theme="outline" size="16" @click="isRounded" />
        </el-tooltip>
        <el-tooltip content="画面镜像" show-after="500">
          <FlipHorizontally theme="outline" size="16" @click="isflip" />
        </el-tooltip>
        <el-tooltip content="全屏模式：仅在非圆角下可用" show-after="500">
          <FullScreenPlay theme="outline" size="16" @click="toggleFullScreen" />
        </el-tooltip>
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
