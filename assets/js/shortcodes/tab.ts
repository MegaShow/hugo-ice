export function initTab() {
  // 给每一个 TabGroup 中的 Tab 添加点击事件
  const groups = document.querySelectorAll<HTMLDivElement>('.ice-tabs');
  groups.forEach(group => {
    const tabs = group.querySelectorAll<HTMLLIElement>('.ice-tabs-header > li');
    const contents = group.querySelectorAll<HTMLDivElement>('.ice-tabs-content > div');

    const onClick = function (this: HTMLLIElement) {
      const idx = this.dataset.index;
      tabs.forEach(tab => {
        if (tab.dataset.index === idx) {
          tab.dataset.active = 'true';
        } else {
          delete tab.dataset.active;
        }
      });
      contents.forEach(content => {
        if (content.dataset.index === idx) {
          content.dataset.active = 'true';
        } else {
          delete content.dataset.active;
        }
      });
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', onClick);
    });
  });
}
