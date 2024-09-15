---
title: "页面配置"
date: 2023-07-02T00:00:00+08:00
lastmod: 2024-09-15T00:00:00+08:00
---

Hugo 提供了一些布局用于创建不同类型的页面，通过 Markdown 文件 FrontMatter 的 layout 字段来指定该页面的渲染布局。

## 文章 (single)

所有非 _index.md 的文件的默认渲染布局都是 single，这是普通文章页面的布局。

```yaml
title: 你好, 世界
layout: single
```

## 归档 (archives)

创建一个 Markdown 文件，指定 layout 为 archives 可将该页面声明为归档页。

```yaml
title: 归档
layout: archives
```

## 空白页 (blank)

Hugo Ice 提供了空白布局 blank，可以配合使用 Import 短代码导入外部文件的 HTML。

```yaml
title: 自定义页面
layout: blank
```
