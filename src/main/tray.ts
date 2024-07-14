import { Tray, Menu, shell } from 'electron'
import path from 'path'

const createTray = () => {
  // 创建托盘跟图标
  const tray = new Tray(
    path.resolve(__dirname, '../../resources/cameraIcon.png')
  )
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '关于',
      click: () => {
        shell.openExternal('https://github.com/ZzzzzzzzHong/camera')
      }
    },
    { label: '退出', role: 'quit' }
  ])
  tray.setToolTip('Hong的摄像头') // 鼠标在托盘悬浮时的标题
  tray.setContextMenu(contextMenu)
}

export default createTray
