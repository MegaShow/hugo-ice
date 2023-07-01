// 图标属性
export interface IconProps {
  fill?: string; // 填充颜色
  height?: number | string; // 高度
  width?: number | string; //宽度
}

// 拷贝图标
export function iconCopyHTML(props: IconProps = {}): string {
  const { fill = '#000000', height = 24, width = 24 } = props;
  return `<svg fill="${fill}"  height="${height}" width="${width}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"/>
  <path opacity="0.4" d="M17.0998 2H12.8998C9.44976 2 8.04977 3.37 8.00977 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V15.99C20.6298 15.95 21.9998 14.55 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z"/>
</svg>`;
}

// 拷贝成功图标
export function iconCopySuccessHTML(props: IconProps = {}): string {
  const { fill = '#000000', height = 24, width = 24 } = props;
  return `<svg fill="${fill}"  height="${height}" width="${width}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path opacity="0.4" d="M17.0998 2H12.8998C9.44976 2 8.04977 3.37 8.00977 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V15.99C20.6298 15.95 21.9998 14.55 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z"/>
  <path d="M11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1V12.9C16 9.4 14.6 8 11.1 8ZM12.29 13.65L8.58 17.36C8.44 17.5 8.26 17.57 8.07 17.57C7.88 17.57 7.7 17.5 7.56 17.36L5.7 15.5C5.42 15.22 5.42 14.77 5.7 14.49C5.98 14.21 6.43 14.21 6.71 14.49L8.06 15.84L11.27 12.63C11.55 12.35 12 12.35 12.28 12.63C12.56 12.91 12.57 13.37 12.29 13.65Z"/>
</svg>`;
}

// 菜单图标
export function iconMenuHTML(props: IconProps = {}): string {
  const { fill = '#000000', height = 24, width = 24 } = props;
  return `<svg fill="${fill}" height="${height}" width="${width}" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z"/>
</svg>`;
}

// X标记图标
export function iconXMarkHTML(props: IconProps = {}): string {
  const { fill = '#000000', height = 24, width = 24 } = props;
  return `<svg fill="${fill}" height="${height}" width="${width}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.70718 4.5858C6.31666 4.19528 5.68349 4.19528 5.29297 4.5858L4.58586 5.29291C4.19534 5.68343 4.19534 6.3166 4.58586 6.70712L9.87877 12L4.5859 17.2929C4.19537 17.6834 4.19537 18.3166 4.5859 18.7071L5.293 19.4142C5.68353 19.8048 6.31669 19.8048 6.70722 19.4142L12.0001 14.1214L17.293 19.4142C17.6835 19.8048 18.3167 19.8048 18.7072 19.4142L19.4143 18.7071C19.8048 18.3166 19.8048 17.6834 19.4143 17.2929L14.1214 12L19.4143 6.70712C19.8048 6.3166 19.8048 5.68343 19.4143 5.29291L18.7072 4.5858C18.3167 4.19528 17.6835 4.19528 17.293 4.5858L12.0001 9.87871L6.70718 4.5858Z"/>
</svg>`;
}
