<script setup lang="ts">
import { ReverseLens } from '@icon-park/vue-next'
import { useConfig } from '../composables/useConfig'

defineEmits(['change-page'])

const { config, updateConfig } = useConfig()
const devices = await navigator.mediaDevices.enumerateDevices()
const cameras = devices.filter((d) => d.kind === 'videoinput') // 获取摄像头设备
</script>

<template>
  <main
    class="min-h-screen px-4 pb-8 flex flex-col items-center bg-[#f0f7ff] text-gray-700"
  >
    <div class="pt-4 pb-2 flex items-center">
      <span class="pl-1 text-sm font-bold">参数设置</span>
    </div>
    <el-select
      v-model="config.deviceId"
      placeholder="请选择摄像头"
      class="my-2 nodrag"
    >
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
    <el-input v-model="config.borderColor" class="mb-2" placeholder="边框颜色">
    </el-input>
    <el-button type="primary" plain class="w-full" @click="updateConfig">
      保存
    </el-button>
    <div class="py-2">
      <el-tooltip content="切回镜头" show-after="500">
        <ReverseLens
          theme="outline"
          size="16"
          class="cursor-pointer"
          @click="$emit('change-page')"
        />
      </el-tooltip>
    </div>
  </main>
</template>
