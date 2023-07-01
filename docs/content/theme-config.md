---
title: "主题配置"
date: 2023-07-01T00:00:00+08:00
---

Hugo Ice 在 Hugo 基础配置外，额外支持了一些特有功能的配置。本文仅介绍部分 Hugo 基础配置，其他配置可前往 Hugo 官网查阅。

> 以下配置均使用 TOML 语法, 可自行转换成 YAML 或 JSON。

## 站点基础配置

站点的基础配置指定了站点的链接、语言、名称、使用主题。当主题指定为 Hugo Ice 时，特有功能配置方可生效。

```toml
baseURL = 'http://example.org/'
languageCode = 'zh-cn'
title = 'Hugo Ice Demo Site'
theme = 'icytown.com/hugo-ice' # 不同站点安装方式, 该值不同, 这里是使用 GoModule 方式安装
```

Hugo Ice 在首页和归档页面等文章列表中，仅展示标注为主 section 的文章。默认的主 section 为 `posts`，因此只有处于 `posts` 文件夹中的文章才会被渲染到首页和归档页面等文章列表中。可以通过 `mainSection` 参数指定需要被渲染到文章列表的 section，可指定多个 section。

```toml
[params]
  mainSections = ['posts', 'docs']  # 默认为 ['posts']
```

## 站点样式

### 站点信息

在配置站点作者信息后，Hugo Ice 将在站点底部展示作者名字。

```toml
[author]
  name = 'MegaShow' # 作者名字
```

指定站点的起始时间，Hugo Ice 将在站点底部展示站点的时间信息。

```toml
[params]
  startYear = 2022
```

### Favicon

站点 Favicon 需要存放在 `static` 静态资源文件夹中，可在配置中指定使用的文件。

```toml
[params]
  favicon = 'favicon.svg'
```

### 备案信息

国内站点需要在网站底部展示备案号信息，并需要支持跳转到工信部备案官网。Hugo Ice 已支持展示该信息，仅需要配置站点的备案号即可。

```toml
[params]
  beian = '粤ICP备xxxxxxxx号-x'
```

## 菜单

Hugo Ice 允许通过 `menu.header` 指定页面顶部的菜单。

```toml
[menu]
[[menu.header]]
  name = '首页'   # 菜单名称
  url = '/'       # 地址
  weight = 1      # 权重, 必须大于0, 越小权重越大
[[menu.header]]
  name = '归档'
  url = '/archives'
  weight = 2
[[menu.header]]
  name = '关于'
  url = '/about'
  weight = 100
```
