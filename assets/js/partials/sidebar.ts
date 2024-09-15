import { iconMenuHTML, iconXMarkHTML } from '../resources/icon';

/** 展示或隐藏侧栏 */
function showOrHideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.sidebar-toggle');

  if (!sidebar?.classList.contains('sidebar-open')) {
    // 切出
    const mask = document.createElement('div');
    mask.classList.add('sidebar-mask');
    mask.addEventListener('click', showOrHideSidebar);
    document.body.appendChild(mask);

    sidebar?.classList.add('sidebar-open');
    if (toggle) {
      toggle.innerHTML = iconXMarkHTML();
    }
  } else {
    // 隐藏
    const mask = document.querySelector('.sidebar-mask');
    if (mask) {
      document.body.removeChild(mask);
    }

    sidebar.classList.remove('sidebar-open');
    if (toggle) {
      toggle.innerHTML = iconMenuHTML();
    }
  }
}

/** 初始化侧栏 */
export function initSidebar() {
  // 为侧栏按钮添加切入切出效果
  document.querySelector('.sidebar-toggle')?.addEventListener('click', showOrHideSidebar);
}
