import { onLoad } from './event';
import { initCodeBlock } from './partials/article';
import { initHeaderMenuToggle } from './partials/header';
import { initTab } from './shortcodes/tab';

/** 初始化流程 */
function init() {
  // 框架内容
  onLoad(initHeaderMenuToggle);

  // 文章内容
  onLoad(initCodeBlock);

  // 短代码
  onLoad(initTab);
}

init();
