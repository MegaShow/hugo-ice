import { iconMenuHTML, iconXMarkHTML } from '../resources/icon';

/** 展示或隐藏顶部菜单 */
function showOrHideHeaderMenu() {
  const menu = document.querySelector('.header-menu');
  const toggle = document.querySelector('.header-menu-toggle');

  if (!menu?.classList.contains('header-menu-open')) {
    // 切出
    menu?.classList.add('header-menu-open');
    if (toggle) {
      toggle.innerHTML = iconXMarkHTML();
    }
  } else {
    // 隐藏
    menu.classList.remove('header-menu-open');
    if (toggle) {
      toggle.innerHTML = iconMenuHTML();
    }
  }
}

/** 初始化头部 */
export function initHeader() {
  // 为头部导航菜单按钮添加切入切出效果
  document.querySelector('.header-menu-toggle')?.addEventListener('click', showOrHideHeaderMenu);
}
