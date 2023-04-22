import { onLoad } from './event';
import { initCodeBlock } from './partials/article';
import * as header from './partials/header';
import { initTab } from './shortcodes/tab';

/** 初始化流程 */
function init() {
  onLoad(header.onLoad);

  // 文章内容
  onLoad(initCodeBlock);

  // 短代码
  onLoad(initTab);
}

init();
