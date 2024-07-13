<script setup lang="ts">
import { ReverseLens } from '@icon-park/vue-next'
import { useConfig } from '../composables/useConfig'
import AuthorInfo from '../components/AuthorInfo.vue'

defineEmits(['change-page'])

const { config, updateConfig } = useConfig()
const devices = await navigator.mediaDevices.enumerateDevices()
const cameras = devices.filter((d) => d.kind === 'videoinput') // 获取摄像头设备
</script>

<template>
  <main class="px-4 flex flex-col items-center overflow-hidden bg-[#f0f7ff]">
    <div
      class="pt-4 pb-2 flex items-center cursor-pointer text-black text-sm"
      @click="$emit('change-page')"
    >
      <ReverseLens theme="outline" />
      <span class="pl-1 text-xs">参数设置</span>
    </div>
    <el-select v-model="config.deviceId" placeholder="请选择摄像头" class="my-2 nodrag">
      <el-option
        v-for="camera in cameras"
        :key="camera.deviceId"
        :label="camera.label"
        :value="camera.deviceId"
        class="nodrag"
      />
    </el-select>
    <el-input v-model="config.borderWidth" class="mb-2" placeholder="边框宽度">
      <template #append>px</template>
    </el-input>
    <el-input v-model="config.borderColor" class="mb-2" placeholder="边框颜色"> </el-input>
    <el-button type="primary" plain class="w-full" @click="updateConfig">保存</el-button>
    <AuthorInfo />
  </main>
</template>
