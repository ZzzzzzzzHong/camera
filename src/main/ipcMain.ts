import { BrowserWindow, ipcMain } from 'electron'

ipcMain.on('drag', (event, option: { x: number; y: number }) => {
  // console.log(BrowserWindow.fromWebContents(event.sender)?.getPosition())
  const win = BrowserWindow.fromWebContents(event.sender)!
  const [x, y] = win.getPosition()
  win.setPosition(x + option.x, y + option.y)
})
