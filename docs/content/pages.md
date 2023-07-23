---
title: "页面配置"
date: 2023-07-02T00:00:00+08:00
---

Hugo 提供了一些布局用于创建不同类型的页面。

## 归档

创建一个 Markdown 文件，指定 layout 为 archives 可将该页面声明为归档页。

```yaml
title: 归档
date: 2023-07-02T00:00:00+08:00
layout: archives
```

## 空白页

Hugo Ice 提供了空白布局 `blank`，可以配合使用 Import 短代码导入外部文件的 HTML。

```yaml
title: 自定义页面
date: 2023-07-02T00:00:00+08:00
layout: blank
```
