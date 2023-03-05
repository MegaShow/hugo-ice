import { onLoad } from './event';
import * as header from './partials/header';
import * as shortcodes from './shortcodes';

/** 初始化流程 */
function init() {
  onLoad(header.onLoad);
  onLoad(shortcodes.onLoad);
}

init();
