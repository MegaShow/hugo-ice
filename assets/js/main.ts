import { onLoad } from './event';
import { initCatalog, initCodeBlock } from './partials/article';
import { initHeader } from './partials/header';
import { initSidebar } from './partials/sidebar';
import { initCodeTab } from './shortcodes/code-tab';
import { initTab } from './shortcodes/tab';

/** 初始化流程 */
function init() {
  // 框架内容
  onLoad(initHeader);
  onLoad(initSidebar);

  // 文章内容
  onLoad(initCatalog);
  onLoad(initCodeBlock);

  // 短代码
  onLoad(initCodeTab);
  onLoad(initTab);
}

init();
