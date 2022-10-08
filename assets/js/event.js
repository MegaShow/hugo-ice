// fn: 菜单切出按钮点击
const onClickHeaderNavToggle = () => {
  const icon = document.querySelector('.header-nav-toggle i')
  const nav = document.querySelector('.header-nav')

  if (icon.classList.contains('fa-bars')) {
    // 切出
    icon.classList.replace('fa-bars', 'fa-xmark')
    nav.classList.add('nav-open')
  } else {
    // 隐藏
    icon.classList.replace('fa-xmark', 'fa-bars')
    nav.classList.remove('nav-open')
  }
}

// fn: 添加事件
export const addEventListener = () => {
  window.addEventListener('load', () => {
    document.querySelector('.header-nav-toggle').addEventListener('click', onClickHeaderNavToggle)
  })
}
