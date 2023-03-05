/**
 * 注册 window 加载事件
 * @param listener 监听逻辑函数
 */
export function onLoad(listener: (this: Window, ev: Event) => void) {
  window.addEventListener('load', listener);
}
