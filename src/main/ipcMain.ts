import { BrowserWindow, ipcMain } from 'electron'

ipcMain.on('drag', (event, option: { x: number; y: number }) => {
  // console.log(BrowserWindow.fromWebContents(event.sender)?.getPosition())
  const win = BrowserWindow.fromWebContents(event.sender)!
  const [x, y] = win.getPosition()
  win.setPosition(x + option.x, y + option.y)
})

ipcMain.on('setWinAspectRatio', (event: Electron.IpcMainEvent, aspectRatio: number = 1 / 1) => {
  const win = BrowserWindow.fromWebContents(event.sender)!
  win.setAspectRatio(aspectRatio) // 保持特定比例缩放
  const { height } = win.getBounds()
  aspectRatio === 1
    ? win.setBounds({ width: height, height })
    : win.setBounds({ width: Math.floor(height * 1.7), height })
})
