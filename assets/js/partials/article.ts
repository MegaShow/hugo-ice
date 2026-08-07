import params from '@params';

import { CounterService } from '../api/counter';
import { iconCopyHTML, iconCopySuccessHTML } from '../resources/icon';

const copyButton = iconCopyHTML({ fill: 'currentColor', height: 20, width: 20 });
const copySuccessButton = iconCopySuccessHTML({ fill: '#2aa766', height: 20, width: 20 });

const counterService = new CounterService(
  params.statistics?.counter?.apipath ?? '',
  params.statistics?.counter?.tenantid ?? '',
);

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

/** 初始化文章阅读量 */
export async function initCounter() {
  const counter = document.querySelector<HTMLDivElement>('.article-counter');
  const text = counter?.querySelector<HTMLSpanElement>('span');
  if (!counter || !text) {
    return;
  }
  if (!params.statistics?.counter?.apipath || !params.statistics?.counter?.tenantid) {
    return;
  }

  const objectId = window.location.pathname;
  const count = await counterService.getCounter(objectId);
  if (count > 0) {
    text.innerText = text.innerText.replaceAll('{{ count }}', String(count));
    counter.classList.add('article-counter-show');
  }
  // 上报增加阅读量
  const incr = async () => {
    await counterService.incrCounter(objectId, params.statistics?.counter?.upsert);
  };
  if ((params.statistics?.counter?.delayincr ?? 0) > 0) {
    setTimeout(incr, params.statistics?.counter?.delayincr);
  } else {
    await incr();
  }
}

/** 初始化图片 */
export function initImage() {
  document.querySelectorAll<HTMLImageElement>('.article img').forEach(img => {
    img.addEventListener('click', () => {
      // 创建预览图片和容器, 默认位置不变
      const rect = img.getBoundingClientRect();
      const image = document.createElement('img');
      image.classList.add('image-preview-animate');
      image.src = img.currentSrc || img.src;
      image.alt = img.alt || img.title || '';
      image.style.position = 'fixed';
      image.style.width = `${img.width}px`;
      image.style.height = `${img.height}px`;
      image.style.transform = `translate(${rect.left + 5}px, ${rect.top + 5}px)`; // 存在 padding 和 border

      const imagePreview = document.createElement('div');
      imagePreview.classList.add('image-preview');
      imagePreview.appendChild(image);
      document.body.appendChild(imagePreview);

      // 缩放和拖拽状态
      const maxScale = Math.min(img.naturalWidth / img.width, img.naturalHeight / img.height); // 最大缩放值
      let minScale = 1; // 最小缩放值
      let currentScale = 1; // 当前缩放值
      let isDragging = false; // 是否处于拖拽状态
      let hasDragged = false; // 是否发生了拖拽
      let dragStartX = 0;
      let dragStartY = 0;
      let offsetX = 0;
      let offsetY = 0;

      // 更新拖拽光标
      const updateDragCursor = () => {
        const canDrag =
          image.width * currentScale > document.documentElement.clientWidth ||
          image.height * currentScale > document.documentElement.clientHeight;
        image.style.cursor = canDrag ? 'grab' : '';
      };

      // 预览图片大小调整
      const handleResize = () => {
        const wasZoomed = currentScale > minScale;
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        const targetX = (clientWidth - image.width) / 2;
        const targetY = (clientHeight - image.height) / 2;
        let scale = 1;
        if (clientWidth < image.naturalWidth || clientHeight < image.naturalHeight) {
          scale = Math.min(clientWidth / image.width, clientHeight / image.height);
        }
        minScale = scale;
        if (!wasZoomed) {
          currentScale = scale; // 如果当前未处于缩放状态，则调整当前缩放值为最小缩放值
        }
        offsetX = 0;
        offsetY = 0;
        image.style.transform = `translate(${targetX}px, ${targetY}px) scale(${currentScale})`;
        updateDragCursor();
      };
      requestAnimationFrame(() => {
        imagePreview.classList.add('image-preview-open');
        handleResize();
      });
      setTimeout(() => {
        image.classList.remove('image-preview-animate');
      }, 300);
      window.addEventListener('resize', handleResize);

      // 滚轮缩放
      const handleImageWheel = (e: WheelEvent) => {
        if (currentScale >= maxScale && e.deltaY < 0) {
          return;
        }
        if (currentScale <= minScale && e.deltaY > 0) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        const factor = e.deltaY > 0 ? 0.9 : 1.1;
        currentScale = Math.max(minScale, Math.min(maxScale, currentScale * factor));

        // 缩放后重新约束偏移量，防止超出边界
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        const hBound = Math.max(0, (image.width * currentScale - clientWidth) / 2);
        const vBound = Math.max(0, (image.height * currentScale - clientHeight) / 2);
        offsetX = Math.max(-hBound, Math.min(hBound, offsetX));
        offsetY = Math.max(-vBound, Math.min(vBound, offsetY));
        const targetX = (clientWidth - image.width) / 2 + offsetX;
        const targetY = (clientHeight - image.height) / 2 + offsetY;
        image.style.transform = `translate(${targetX}px, ${targetY}px) scale(${currentScale})`;
        updateDragCursor();
      };
      image.addEventListener('wheel', handleImageWheel, { passive: false });

      // 鼠标拖拽
      const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        image.style.cursor = 'grabbing';
      };
      const handleMouseUp = () => {
        if (isDragging) {
          isDragging = false;
          updateDragCursor();
        }
      };
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) {
          return;
        }
        hasDragged = true;
        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        offsetX += deltaX;
        offsetY += deltaY;

        // 约束边界，确保图片不超出窗口范围
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        const hBound = Math.max(0, (image.width * currentScale - clientWidth) / 2);
        const vBound = Math.max(0, (image.height * currentScale - clientHeight) / 2);
        offsetX = Math.max(-hBound, Math.min(hBound, offsetX));
        offsetY = Math.max(-vBound, Math.min(vBound, offsetY));
        const targetX = (clientWidth - image.width) / 2 + offsetX;
        const targetY = (clientHeight - image.height) / 2 + offsetY;
        image.style.transform = `translate(${targetX}px, ${targetY}px) scale(${currentScale})`;
      };
      image.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);

      // 监听窗口变化
      const preventScroll = (e: Event) => e.preventDefault();
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });

      // 容器关闭
      const closeImagePreview = () => {
        if (hasDragged) {
          hasDragged = false;
          return;
        }
        image.classList.add('image-preview-animate');
        image.removeEventListener('wheel', handleImageWheel);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('touchmove', preventScroll);
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        const rect = img.getBoundingClientRect();
        const targetX = (img.width - image.width) / 2 + rect.left + 5.5; // 存在 padding 和 border, 再加 0.5 看起来效果更好
        const targetY = (img.height - image.height) / 2 + rect.top + 5.5;
        const scale = img.width / image.width;
        image.style.transform = `translate(${targetX}px, ${targetY}px) scale(${scale})`;
        imagePreview.classList.remove('image-preview-open');
        imagePreview.addEventListener(
          'transitionend',
          () => {
            imagePreview.remove();
          },
          { once: true },
        );
      };
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeImagePreview();
        }
      };
      imagePreview.addEventListener('click', closeImagePreview);
      window.addEventListener('keydown', handleKeyDown);
    });
  });
}

/** 初始化过时提示 */
export function initOutdatedTips() {
  const tips = document.querySelector<HTMLDivElement>('.article-outdated-tips');
  if (!tips?.dataset.lastmod || !tips.dataset.min) {
    return;
  }
  const currentDays = Math.floor((new Date().getTime() - Date.parse(tips.dataset.lastmod)) / 1000 / 86400);
  const minDays = parseInt(tips.dataset.min);
  if (Number.isNaN(currentDays) || Number.isNaN(minDays)) {
    return;
  }
  if (currentDays < minDays) {
    return;
  }

  const text = tips.querySelector<HTMLElement>('p');
  if (text) {
    text.innerText = text.innerText.replaceAll('{{ days }}', String(currentDays));
    tips.classList.add('article-outdated-tips-show');
  }
}
