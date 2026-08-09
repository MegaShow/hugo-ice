/** 初始化侧栏 */
export function initSidebar() {
  // 为侧栏按钮添加切入切出效果
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.sidebar-toggle');
  let mask: HTMLDivElement | null = null;
  const openSidebar = () => {
    mask = document.createElement('div');
    mask.classList.add('sidebar-mask');
    mask.addEventListener('click', closeSidebar);
    document.body.appendChild(mask);

    // 强制回流，使初始 opacity: 0 生效后再渐显
    void mask.offsetHeight;
    mask.classList.add('sidebar-mask-open');
    sidebar?.classList.add('sidebar-open');
    toggle?.classList.add('sidebar-toggle-open');
  };
  const closeSidebar = () => {
    mask?.classList.remove('sidebar-mask-open');
    // 等待渐隐动画结束后移除蒙层
    setTimeout(() => {
      mask?.remove();
    }, 300);

    sidebar?.classList.remove('sidebar-open');
    toggle?.classList.remove('sidebar-toggle-open');
  };

  toggle?.addEventListener('click', () => {
    if (!sidebar?.classList.contains('sidebar-open')) {
      openSidebar();
    } else {
      closeSidebar();
    }
  });
}
