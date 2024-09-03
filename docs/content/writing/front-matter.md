---
title: "文章配置"
date: 2023-07-01T00:00:00+08:00
lastmod: 2024-09-04T00:00:00+08:00
---

文章 Front Matter 用于记录文章一些基本信息和配置，通常以 YAML 的形式记录在文章开头。

## 基本信息

通过在文章 Markdown 文件最开头配置 Front Matter，可标明文章的标题、发布时间、最近更新时间等信息。

```markdown
---
title: "这是一篇测试的文章"
date: 2023-06-30T00:00:00+08:00
lastmod: 2023-07-01T00:00:00+08:00
---
```

下面是关于文章基本信息的说明。

| 字段 | 类型 | 默认值 | 描述 | 示例 |
|--|--|--|--|--|
| title | string | - | 文章标题 | 你好世界 |
| date | date | - | 发布时间 | 2024-08-25T00:00:00+08:00 |
| lastmod | date | - | 更新时间 | 2024-08-25T00:00:00+08:00 |
| draft | bool | false | 是否草稿 | false |
| layout | string | single (文章)、list (列表) | 页面渲染布局, 详情见 [页面布局]({{< relref "/config/page-layout" >}}) | single |
| tags | array<string> | [] | 标签 | [Hugo, Markdown] |

## 扩展信息

Hugo Ice 通过 Front Matter 提供了更丰富的文章配置能力扩展。

| 字段 | 类型 | 默认值 | 描述 | 示例 |
|--|--|--|--|--|
| cover | string | - | 文章封面图, 建议配置相对路径, 在捆绑包下寻找 | post-cover.svg |
| hideHeader | bool | false | 隐藏文章头部, 包括标题、封面图、时间、标签等信息 | true |
| hideTableOfContents | bool | false | 隐藏目录 | true |
