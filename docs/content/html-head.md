---
title: "HTML Head"
date: 2023-07-01T00:00:00+08:00
---

Hugo Ice 针对生成的 HTML 网页 Head 实现了一些额外功能支持，可以满足配置 Golang Package 信息使用。

## Golang Package

在文章 Markdown 文件的 Front Matter 中配置 Golang Package 的相关信息，可以实现对 Package 重定向的效果。

```yaml
goPackage:
  rootPath: icytown.com/hugo-ice
  repoURL: https://github.com/megashow/hugo-ice
```

上述配置会在网页的 Head 中生成如下元信息。

```html
<meta name="go-import" content="icytown.com/hugo-ice git https://github.com/megashow/hugo-ice">
<meta name="go-source" content="icytown.com/hugo-ice https://github.com/megashow/hugo-ice https://github.com/megashow/hugo-ice/tree/master{/dir} https://github.com/megashow/hugo-ice/blob/master{/dir}/{file}#L{line}">
```
