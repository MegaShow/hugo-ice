export function initCodeTab() {
  // 给每一个 CodeTabs 中的 Tab 添加点击事件
  const tabsList = document.querySelectorAll<HTMLDivElement>('.ice-code-tabs');
  tabsList.forEach(tabs => {
    const headers = tabs.querySelectorAll<HTMLLIElement>('.ice-code-tabs-header > li');
    const contents = tabs.querySelectorAll<HTMLDivElement>('.ice-code-tabs-content > div');

    const onClick = function (this: HTMLLIElement) {
      const idx = this.dataset.index;
      headers.forEach(header => {
        if (header.dataset.index === idx) {
          header.dataset.active = 'true';
        } else {
          delete header.dataset.active;
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

    headers.forEach(header => {
      header.addEventListener('click', onClick);
    });
  });
}
