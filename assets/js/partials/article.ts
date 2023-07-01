import { iconCopyHTML, iconCopySuccessHTML } from '../resources/icon';

const copyButton = iconCopyHTML({ fill: 'currentColor', height: 20, width: 20 });
const copySuccessButton = iconCopySuccessHTML({ fill: '#2aa766', height: 20, width: 20 });

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
        navigator.clipboard
          .writeText(text)
          .then(() => {
            button.blur();
            button.innerHTML = copySuccessButton;
            setTimeout(() => (button.innerHTML = copyButton), 2000);
          })
          // eslint-disable-next-line no-console
          .catch(err => console.error(err));
      }
    });

    codeBlock.appendChild(button);
  });
}
