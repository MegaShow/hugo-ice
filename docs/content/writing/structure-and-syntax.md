---
title: "结构与语法"
date: 2024-08-24T00:00:00+08:00
lastmod: 2024-08-28T00:00:00+08:00
---

Hugo Ice 沿用 Hugo 默认的文章管理策略和写作语法，并在其基础上进行扩展。

## 文件结构

Hugo Ice 的所有文章均存放在站点目录的 content 文件夹中。

### 页面捆绑包

Hugo Ice 使用页面捆绑包 (Page Bundles) 的形式管理内容。捆绑包将每一篇文章以及相关资源 (图片/视频/音频) 存放在同一个文件夹中。如下例子，hi-world 是一个捆绑包，index.md 是对应的文章内容，而剩下的文件则是该文章对应的资源。

```
content
└── posts
    ├── hello-world.md
    └── hi-world
        ├── index.md
        ├── image1.png
        └── image2.png
```

如果你的文章不存在任何资源，也可以直接创建一个文章内容文件，不需要创建一个捆绑包文件夹，比如上面的 hello-world.md。

### Section

Section 是文章的一个分类，每篇文章仅属于一个 Section。文章的 Section 是在 content 文件夹内的下一级文件夹的名称，如下图的例子中，hello-world 文章的 Section 是 post。

```
content
└── posts
    └── hello-world
        ├── index.md
        ├── image1.png
        └── image2.png
```

在默认情况下，文章数量最多的 Section 被认为是 MainSections 之一，Hugo Ice 默认只会在首页、归档页等页面渲染属于 MainSections 的文章。

通过站点配置可以修改 MainSections，详情见 [站点配置]({{< relref "/config/site" >}})。

## 文章语法

### Markdown

我们推荐使用 Markdown 编写文章，Hugo Ice 所有使用文档均围绕着 Markdown 展开。

如果想要学习 Markdown，可以前往 [CommonMark](https://commonmark.org/)。

### 站内链接跳转

Markdown 支持嵌入链接。

```markdown
[Hugo Ice](https://github.com/megashow/hugo-ice)
```

但是，如果是一个站内文章链接，我们推荐使用 relref 或者 ref 短代码。如果站内文章地址错误或不存在的时候，Hugo 可以提前抛出错误。

```markdown
<!-- 地址: /hugo-ice/writing/front-matter/ -->
[文章配置]({{</* relref "/writing/front-matter" */>}})

<!-- 地址: https://docs.icytown.com/hugo-ice/writing/front-matter/ -->
[文章配置]({{</* ref "/writing/front-matter" */>}})
```

### 概要

在 Hugo Ice 的特定场景下 (比如首页) 仅展示文章的概要，并不会展示全文内容。Hugo 默认按字数进行概要截断，但是推荐通过注释标识标明截断位置。

```markdown
这是一个概要。

<!--more-->

这是剩下全文内容。
```
