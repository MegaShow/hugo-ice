import { onLoad } from './event';
import { initCodeBlock } from './partials/article';
import * as header from './partials/header';
import * as shortcodes from './shortcodes';

/** 初始化流程 */
function init() {
  onLoad(header.onLoad);

  // 文章内容
  onLoad(initCodeBlock);

  onLoad(shortcodes.onLoad);
}

init();
