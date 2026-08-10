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
  let isClick = false;
  let isClickTimer = 0;
  let timer = 0;
  titleInfos.forEach(titleInfo => {
    titleInfo.element.addEventListener('click', () => {
      isClick = true;
      clearTimeout(isClickTimer);
      isClickTimer = setTimeout(() => {
        isClick = false;
      }, 1000);
      if (titleInfo !== lastTitle) {
        lastTitle?.element.classList.remove('active');
        titleInfo.element.classList.add('active');
        lastTitle = titleInfo;
      }
    });
  });
  window.addEventListener('scroll', () => {
    if (timer || isClick) {
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

interface PreviewImage {
  rawLeft(): number; // 原图位置
  rawTop(): number; // 原图位置
  rawWidth(): number; // 原图渲染宽度 (不包含 padding 和 border)
  rawHeight(): number; // 原图渲染高度 (不包含 padding 和 border)
  rawNaturalWidth(): number; // 原图实际宽度
  rawNaturalHeight(): number; // 原图实际高度

  element(): HTMLElement; // 预览图 document 对象
  baseWidth(): number; // 预览图初始渲染宽度
  baseHeight(): number; // 预览图初始渲染高度
  maxScale(): number; // 预览图最大缩放比例
}

/** 初始化图片 */
export function initImage() {
  const addPreviewImg = (imagePreview: HTMLDivElement, img: HTMLImageElement): PreviewImage => {
    // 创建图片, 默认位置不变
    const rect = img.getBoundingClientRect();
    const image = document.createElement('img');
    image.classList.add('image-preview-animate');
    image.src = img.currentSrc || img.src;
    image.alt = img.alt || img.title || '';
    image.style.position = 'fixed';
    image.style.width = `${img.width}px`;
    image.style.height = `${img.height}px`;
    image.style.transform = `translate(${rect.left + 5}px, ${rect.top + 5}px)`; // 存在 padding 和 border
    imagePreview.appendChild(image);

    const maxScale = Math.min(img.naturalWidth / img.width, img.naturalHeight / img.height);
    const initialWidth = img.width;
    const initialHeight = img.height;
    return {
      rawLeft: () => img.getBoundingClientRect().left,
      rawTop: () => img.getBoundingClientRect().top,
      rawWidth: () => img.width,
      rawHeight: () => img.height,
      rawNaturalWidth: () => img.naturalWidth,
      rawNaturalHeight: () => img.naturalHeight,

      element: () => image,
      baseWidth: () => initialWidth,
      baseHeight: () => initialHeight,
      maxScale: () => maxScale,
    };
  };
  const addPreviewSvg = (imagePreview: HTMLDivElement, span: HTMLSpanElement): PreviewImage => {
    const svg = span.querySelector('svg');
    if (!svg) {
      throw new Error('SVG not found');
    }
    const rect = svg.getBoundingClientRect();
    const svgNode = svg.cloneNode(true) as SVGElement;
    const div = document.createElement('div');
    div.classList.add('image-preview-animate');
    div.style.position = 'fixed';
    div.style.width = `${Math.round(rect.width - 10)}px`; // 去掉 padding 和 border
    div.style.height = `${Math.round(rect.height - 10)}px`;
    div.style.transform = `translate(${rect.left + 5}px, ${rect.top + 5}px)`;
    div.appendChild(svgNode);
    imagePreview.appendChild(div);

    const initialWidth = rect.width - 10;
    const initialHeight = rect.height - 10;
    return {
      rawLeft: () => svg.getBoundingClientRect().left,
      rawTop: () => svg.getBoundingClientRect().top,
      rawWidth: () => Math.round(svg.getBoundingClientRect().width) - 10,
      rawHeight: () => Math.round(svg.getBoundingClientRect().height) - 10,
      rawNaturalWidth: () => initialWidth,
      rawNaturalHeight: () => initialHeight,

      element: () => div,
      baseWidth: () => initialWidth,
      baseHeight: () => initialHeight,
      maxScale: () => 5,
    };
  };
  const createPreview = (addImage: (imagePreview: HTMLDivElement) => PreviewImage) => {
    const imagePreview = document.createElement('div');
    imagePreview.classList.add('image-preview');
    const img = addImage(imagePreview);
    document.body.appendChild(imagePreview);

    // 缩放和拖拽状态
    let minScale = 1; // 最小缩放值
    let currentScale = 1; // 当前缩放值
    let isDragging = false; // 是否处于拖拽状态
    let hasDragged = false; // 是否发生了拖拽
    let dragStartX = 0;
    let dragStartY = 0;
    let offsetX = 0;
    let offsetY = 0;

    // 更新元素尺寸和位置
    const updateElement = () => {
      let currentWidth = img.baseWidth() * currentScale;
      let currentHeight = img.baseHeight() * currentScale;
      // 矫正 width 和 height, 确保比例更合适
      const wf = (img.rawNaturalHeight() / Math.floor(currentHeight)) * img.rawNaturalWidth();
      const wr = (img.rawNaturalHeight() / Math.round(currentHeight)) * img.rawNaturalWidth();
      if (wf === Math.floor(wf)) {
        currentWidth = wf;
      } else if (wr === Math.floor(wr)) {
        currentWidth = wr;
      } else {
        currentWidth = Math.round(currentWidth);
      }
      const hf = (img.rawNaturalWidth() / Math.floor(currentWidth)) * img.rawNaturalHeight();
      const hr = (img.rawNaturalWidth() / Math.round(currentWidth)) * img.rawNaturalHeight();
      if (hf === Math.floor(hf)) {
        currentHeight = hf;
      } else if (hr === Math.floor(hr)) {
        currentHeight = hr;
      } else {
        currentHeight = Math.round(currentHeight);
      }

      const targetX = Math.round((document.documentElement.clientWidth - currentWidth) / 2 + offsetX);
      const targetY = Math.round((document.documentElement.clientHeight - currentHeight) / 2 + offsetY);
      img.element().style.width = `${currentWidth}px`;
      img.element().style.height = `${currentHeight}px`;
      img.element().style.transform = `translate(${targetX}px, ${targetY}px)`;
      // 对于 SVG，直接修改 SVG 元素的 width/height，保持矢量清晰度
      if (img.element().tagName === 'DIV') {
        const svg = img.element().querySelector('svg');
        if (svg) {
          svg.setAttribute('width', String(currentWidth));
          svg.setAttribute('height', String(currentHeight));
          svg.style.width = `${currentWidth}px`;
          svg.style.height = `${currentHeight}px`;
        }
      }
    };

    // 更新拖拽光标
    const updateDragCursor = () => {
      const canDrag =
        img.baseWidth() * currentScale > document.documentElement.clientWidth ||
        img.baseHeight() * currentScale > document.documentElement.clientHeight;
      img.element().style.cursor = canDrag ? 'grab' : '';
    };

    // 预览图片大小调整
    const handleResize = () => {
      const wasZoomed = currentScale > minScale;
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      let scale = 1;
      if (clientWidth < img.rawNaturalWidth() || clientHeight < img.rawNaturalHeight()) {
        scale = Math.min(clientWidth / img.baseWidth(), clientHeight / img.baseHeight());
      } else if (clientWidth > img.rawNaturalWidth() || clientHeight > img.rawNaturalHeight()) {
        scale = Math.min(img.rawNaturalWidth() / img.baseWidth(), img.rawNaturalHeight() / img.baseHeight());
      }
      minScale = scale;
      if (!wasZoomed) {
        currentScale = scale; // 如果当前未处于缩放状态，则调整当前缩放值为最小缩放值
      }
      offsetX = 0;
      offsetY = 0;
      updateElement();
      updateDragCursor();
    };
    requestAnimationFrame(() => {
      imagePreview.classList.add('image-preview-open');
      handleResize();
    });
    setTimeout(() => {
      img.element().classList.remove('image-preview-animate');
    }, 300);
    window.addEventListener('resize', handleResize);

    // 滚轮缩放
    const handleImageWheel = (e: WheelEvent) => {
      if (currentScale >= img.maxScale() && e.deltaY < 0) {
        return;
      }
      if (currentScale <= minScale && e.deltaY > 0) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      currentScale = Math.max(minScale, Math.min(img.maxScale(), currentScale * factor));

      // 缩放后重新约束偏移量，防止超出边界
      const hBound = Math.max(0, (img.baseWidth() * currentScale - document.documentElement.clientWidth) / 2);
      const vBound = Math.max(0, (img.baseHeight() * currentScale - document.documentElement.clientHeight) / 2);
      offsetX = Math.max(-hBound, Math.min(hBound, offsetX));
      offsetY = Math.max(-vBound, Math.min(vBound, offsetY));
      updateElement();
      updateDragCursor();
    };
    const preventScroll = (e: Event) => e.preventDefault();
    img.element().addEventListener('wheel', handleImageWheel, { passive: false });
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    // 鼠标拖拽
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      img.element().style.cursor = 'grabbing';
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
      const hBound = Math.max(0, (img.baseWidth() * currentScale - document.documentElement.clientWidth) / 2);
      const vBound = Math.max(0, (img.baseHeight() * currentScale - document.documentElement.clientHeight) / 2);
      offsetX = Math.max(-hBound, Math.min(hBound, offsetX));
      offsetY = Math.max(-vBound, Math.min(vBound, offsetY));
      updateElement();
    };
    img.element().addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    // 容器关闭
    const closeImagePreview = () => {
      if (hasDragged) {
        hasDragged = false;
        return;
      }
      img.element().classList.add('image-preview-animate');
      img.element().removeEventListener('wheel', handleImageWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      // 回到原图位置和尺寸
      const targetX = img.rawLeft() + 5.5; // 存在 padding 和 border, 再加 0.5 看起来效果更好
      const targetY = img.rawTop() + 5.5;
      img.element().style.width = `${img.rawWidth()}px`;
      img.element().style.height = `${img.rawHeight()}px`;
      img.element().style.transform = `translate(${targetX}px, ${targetY}px)`;
      // 对于 SVG，重置 SVG 元素的 width/height
      if (img.element().tagName === 'DIV') {
        const svg = img.element().querySelector('svg');
        if (svg) {
          svg.classList.add('image-preview-animate');
          svg.setAttribute('width', String(Math.round(img.rawWidth())));
          svg.setAttribute('height', String(Math.round(img.rawHeight())));
          svg.style.width = `${img.rawWidth()}px`;
          svg.style.height = `${img.rawHeight()}px`;
        }
      }
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
  };

  document.querySelectorAll<HTMLImageElement>('.article p img').forEach(img => {
    img.addEventListener('click', () => {
      createPreview((imagePreview: HTMLDivElement) => addPreviewImg(imagePreview, img));
    });
  });
  document.querySelectorAll<HTMLSpanElement>('.article p .article-inline-image').forEach(span => {
    span.addEventListener('click', () => {
      createPreview((imagePreview: HTMLDivElement) => addPreviewSvg(imagePreview, span));
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
