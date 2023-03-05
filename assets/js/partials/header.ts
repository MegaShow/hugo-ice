/** 展示或隐藏顶部菜单 */
function showOrHideHeaderNav() {
  const icon = document.querySelector('.header-nav-toggle i');
  const nav = document.querySelector('.header-nav');

  if (icon.classList.contains('fa-bars')) {
    // 切出
    icon.classList.replace('fa-bars', 'fa-xmark');
    nav.classList.add('header-nav-open');
  } else {
    // 隐藏
    icon.classList.replace('fa-xmark', 'fa-bars');
    nav.classList.remove('header-nav-open');
  }
}

/** 顶部加载逻辑 */
export function onLoad() {
  // 绑定菜单按键点击事件
  document.querySelector('.header-nav-toggle').addEventListener('click', showOrHideHeaderNav);
}
