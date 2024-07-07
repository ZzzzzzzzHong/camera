<template>
  <main class="py-6 px-4 flex flex-col items-center">
    <el-divider>参数设置</el-divider>
    <el-select v-model="deviceId" placeholder="请选择摄像头" class="nodrag w-3/4">
      <el-option
        v-for="camera in cameras"
        :key="camera.deviceId"
        :label="camera.label"
        :value="camera.deviceId"
        class="nodrag"
      />
    </el-select>
    <el-button type="primary" plain class="mt-2" @click="save">保存</el-button>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const deviceId = ref('')
const devices = await navigator.mediaDevices.enumerateDevices()
const cameras = devices.filter((d) => d.kind === 'videoinput')
const save = () => {
  console.log('save')
}
</script>

<style lang="css" scoped></style>
