import { ref } from 'vue'

type ConfigType = {
  deviceId: string
  borderColor: string
  borderWidth: string
  rounded: boolean
  flip: boolean
}

const initConfig: ConfigType = {
  deviceId: '',
  borderColor: '#54a0ff',
  borderWidth: '0',
  rounded: true,
  flip: false
}

export const useConfig = () => {
  const cache = localStorage.getItem('config')
  const data = cache ? (JSON.parse(cache) as ConfigType) : initConfig
  const config = ref(Object.assign(initConfig, data))

  const updateConfig = () => {
    localStorage.setItem('config', JSON.stringify(config.value))
  }

  return { config, updateConfig }
}
