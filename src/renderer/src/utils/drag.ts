class Drag {
  private originX: number = 0
  private originY: number = 0
  private body?: HTMLBodyElement
  // 监听鼠标按下事件，获取源坐标，按下触发鼠标移动时间，获取现在坐标，两者相减就是移动距离。触发预加载脚本事件，向主进程进行通讯，让主进程设置窗口xy轴位置
  // 设置监听事件，实现拖动
  public setBodyDrag() {
    window.addEventListener('DOMContentLoaded', () => {
      this.body = document.querySelector('body')!
      this.body.addEventListener('mousedown', (e: MouseEvent) => {
        this.originX = e.pageX
        this.originY = e.pageY
        const callbackEvent = this.mouseMove.bind(this)
        this.body?.addEventListener('mousemove', callbackEvent)
        this.body?.addEventListener('mouseup', () => {
          this.body?.removeEventListener('mousemove', callbackEvent)
        })
        this.body?.addEventListener('mouseleave', () => {
          this.body?.removeEventListener('mousemove', callbackEvent)
        })
      })
    })
  }

  private mouseMove(e: MouseEvent) {
    const x = e.pageX - this.originX
    const y = e.pageY - this.originY
    window.api.drag({ x, y })
  }

  constructor() {
    console.log()
  }
}

export default Drag
