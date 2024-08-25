import { iconCopyHTML, iconCopySuccessHTML } from '../resources/icon';

const copyButton = iconCopyHTML({ fill: 'currentColor', height: 20, width: 20 });
const copySuccessButton = iconCopySuccessHTML({ fill: '#2aa766', height: 20, width: 20 });

interface CatalogItem {
  hash: string;
  offsetTop: number;
  element: HTMLElement;
}

/** 初始化目录 */
export function initCatalog() {
  // 获取目录
  const catalog = document.querySelector('#TableOfContents');
  if (!catalog) {
    return;
  }
  // 获取所有标题
  const titleInfos: CatalogItem[] = [];
  document.querySelectorAll<HTMLElement>('.article > h1,h2,h3,h4,h5,h6').forEach(header => {
    const catalogElement = catalog.querySelector<HTMLElement>(`a[href="#${header.id}"]`);
    if (!catalogElement) {
      return;
    }
    titleInfos.push({ hash: header.id, offsetTop: header.offsetTop, element: catalogElement });
  });

  // 注册点击事件和滚动事件
  let lastTitle: CatalogItem | undefined = undefined;
  let onClick = false;
  let timer = 0;
  titleInfos.forEach(titleInfo => {
    titleInfo.element.addEventListener('click', () => {
      onClick = true;
      if (titleInfo !== lastTitle) {
        lastTitle?.element.classList.remove('active');
        titleInfo.element.classList.add('active');
        lastTitle = titleInfo;
      }
    });
  });
  window.addEventListener('scroll', () => {
    if (timer) {
      return;
    }
    if (onClick) {
      onClick = false;
      return;
    }
    timer = setTimeout(() => {
      const scrollTop = window.scrollY + 20;
      let currentTitle: CatalogItem | undefined = undefined;
      for (const titleInfo of titleInfos) {
        if (scrollTop >= titleInfo.offsetTop) {
          currentTitle = titleInfo;
        } else {
          break;
        }
      }
      if (currentTitle !== lastTitle) {
        lastTitle?.element.classList.remove('active');
        currentTitle?.element.classList.add('active');
        lastTitle = currentTitle;
      }
      timer = 0;
    }, 300);
  });
}

/** 初始化代码块 */
export function initCodeBlock() {
  // 为高亮代码块添加复制按钮
  document.querySelectorAll('.article .highlight').forEach(codeBlock => {
    const code = codeBlock.querySelector<HTMLElement>('code[data-lang]');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-button';
    button.title = 'Copy';
    button.innerHTML = copyButton;
    button.addEventListener('click', () => {
      const text = code?.textContent?.trim();
      if (text) {
        void navigator.clipboard.writeText(text).then(() => {
          button.blur();
          button.innerHTML = copySuccessButton;
          setTimeout(() => (button.innerHTML = copyButton), 2000);
        });
      }
    });

    codeBlock.appendChild(button);
  });
}
