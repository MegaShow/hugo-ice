---
title: "主题配置"
date: 2023-07-01T00:00:00+08:00
lastmod: 2024-09-07T00:00:00+08:00
---

Hugo Ice 在 Hugo 基础配置外，额外支持了一些特有功能的配置。本文仅介绍部分 Hugo 基础配置，其他配置可前往 Hugo 官网查阅。

## 基本信息

站点的基础配置指定了站点的链接、语言、名称、使用主题。当主题指定为 Hugo Ice 时，特有功能配置方可生效。

{{< CodeTabs >}}
{{< CodeTab "toml" >}}
baseURL = 'http://example.org/'
languageCode = 'zh-cn'
title = 'Hugo Ice Demo Site'
theme = 'hugo-ice'
{{< /CodeTab >}}
{{< CodeTab "yaml" >}}
baseURL: 'http://example.org/'
languageCode: 'zh-cn'
title: 'Hugo Ice Demo Site'
theme: 'hugo-ice'
{{< /CodeTab >}}
{{< CodeTab "json" >}}
{
  "baseURL": "http://example.org/",
  "languageCode": "zh-cn",
  "title": "Hugo Ice Demo Site",
  "theme": "hugo-ice"
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

Hugo Ice 在首页和归档页面等文章列表中，仅展示标注为主 Section 的文章。默认的主 Section 为文章数量最多的 Section，因此只有处于主 Section 文件夹中的文章才会被渲染到首页和归档页面等文章列表中。可以通过 mainSections 参数指定需要被渲染到文章列表的 Section，可指定多个 Section。

{{< CodeTabs >}}
{{< CodeTab "toml" >}}
[params]
  mainSections = ['posts', 'docs']
{{< /CodeTab >}}
{{< CodeTab "yaml" >}}
params:
  mainSections: ['posts', 'docs']
{{< /CodeTab >}}
{{< CodeTab "json" >}}
{
  "params": {
    "mainSections": ["posts", "docs"]
  }
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

配置站点作者信息，可在其他需要的场景使用作者信息。

{{< CodeTabs >}}
{{< CodeTab "toml" >}}
[params]
  [params.author]
    name = 'MegaShow'
{{< /CodeTab >}}
{{< CodeTab "yaml" >}}
params:
  author:
    name: 'MegaShow'
{{< /CodeTab >}}
{{< CodeTab "json" >}}
{
  "params": {
    "author": {
      "name": "MegaShow"
    }
  }
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

## 菜单

Hugo Ice 允许通过 menu.header 指定页面顶部的菜单。

| 字段 | 类型 | 默认值 | 描述 | 示例 |
|--|--|--|--|--|
| name | string | - | 菜单名称 | 关于 |
| url | string | - | 地址 | /about |
| weight | number | - | 权重, 必须大于0, 越小权重越大越靠前 | 100 |

{{< CodeTabs >}}
{{< CodeTab "toml" >}}
[menu]
[[menu.header]]
  name = '首页'
  url = '/'
  weight = 1
[[menu.header]]
  name = '归档'
  url = '/archives'
  weight = 2
[[menu.header]]
  name = '关于'
  url = '/about'
  weight = 100
{{< /CodeTab >}}
{{< CodeTab "yaml" >}}
menu:
  header:
    - name: '首页'
      url: '/'
      weight: 1
    - name: '归档'
      url: '/archives'
      weight: 2
    - name: '关于'
      url: '/about'
      weight: 100
{{< /CodeTab >}}
{{< CodeTab "json" >}}
{
  "menu": {
    "header": [
      {
        "name": "首页",
        "url": "/",
        "weight": 1
      },
      {
        "name": "归档",
        "url": "/arhives",
        "weight": 2
      },
      {
        "name": "关于",
        "url": "/about",
        "weight": 100
      }
    ]
  }
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

## 页尾

### 版权声明

在配置站点作者信息后，Hugo Ice 将在站点底部 CopyRight 信息区展示作者名字。

指定的站点的版权信息，将在主 section 的文章页面底部声明版权信息。

{{< CodeTabs >}}
{{< CodeTab "toml" >}}
copyright = '本站点所有文章除特别声明外，均采用 CC BY-NC-SA 4.0 许可协议，转载请注明出处！'
{{< /CodeTab >}}
{{< CodeTab "yaml" >}}
copyright: '本站点所有文章除特别声明外，均采用 CC BY-NC-SA 4.0 许可协议，转载请注明出处！'
{{< /CodeTab >}}
{{< CodeTab "json" >}}
{
  "copyright": "本站点所有文章除特别声明外，均采用 CC BY-NC-SA 4.0 许可协议，转载请注明出处！"
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

### 站点时间

指定站点的成立时间，Hugo Ice 将在站点底部展示站点的时间信息。

{{< CodeTabs >}}
{{< CodeTab "toml" >}}
[params]
  [params.footer]
    since = 2022
{{< /CodeTab >}}
{{< CodeTab "yaml" >}}
params:
  footer:
    since: 2022
{{< /CodeTab >}}
{{< CodeTab "json" >}}
{
  "params": {
    "footer": {
      "since": 2022
    }
  }
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

### 备案信息

国内站点需要在网站底部展示备案号信息，并需要支持跳转到工信部备案官网。Hugo Ice 已支持展示该信息，仅需要配置站点的备案号即可。

{{< CodeTabs >}}
{{< CodeTab "toml" >}}
[params]
  [params.footer]
    beian = '粤ICP备xxxxxxxx号-x'
{{< /CodeTab >}}
{{< CodeTab "yaml" >}}
params:
  footer:
    beian: '粤ICP备xxxxxxxx号-x'
{{< /CodeTab >}}
{{< CodeTab "json" >}}
{
  "params": {
    "footer": {
      "beian": "粤ICP备xxxxxxxx号-x"
    }
  }
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

### 扩展信息

允许在页尾顶部和底部添加额外的文本描述，通过 prefix 和 suffix 声明插入的文本。

{{< CodeTabs >}}
{{< CodeTab "toml" >}}
[params]
  [params.footer]
    prefix = '这是页尾顶部文本'
    suffix = '这是页尾底部文本'
{{< /CodeTab >}}
{{< CodeTab "yaml" >}}
params:
  footer:
    prefix: '这是页尾顶部文本'
    suffix: '这是页尾底部文本'
{{< /CodeTab >}}
{{< CodeTab "json" >}}
{
  "params": {
    "footer": {
      "prefix": "这是页尾顶部文本",
      "suffix": "这是页尾底部文本"
    }
  }
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

## 样式和资源

### Favicon

站点 Favicon 需要存放在 `static` 静态资源文件夹中，可在配置中指定使用的文件。

{{< CodeTabs >}}
{{< CodeTab "toml" >}}
[params]
  favicon = 'favicon.svg'
{{< /CodeTab >}}
{{< CodeTab "yaml" >}}
params:
  favicon: 'favicon.svg'
{{< /CodeTab >}}
{{< CodeTab "json" >}}
{
  "params": {
    "favicon": "favicon.svg"
  }
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

### 代码高亮

Hugo Ice 通过 markup.highlight 来设置站点的代码高亮配置，包括配色方案等。我们强烈建议除了配置 markup.highlight.style 外，再同步添加主题所提供的特定配色方案配置。

不同步配置不影响代码高亮的正常渲染，但会缺失 Hugo Ice 的定制样式。

{{< CodeTabs >}}
{{< CodeTab "toml" >}}
[markup]
  [markup.highlight]
    style = 'vs'
[params]
  [params.highlight]
    style = 'vs'
{{< /CodeTab >}}
{{< CodeTab "yaml" >}}
markup:
  highlight:
    style: 'vs'
params:
  highlight:
    style: 'vs'
{{< /CodeTab >}}
{{< CodeTab "json" >}}
{
  "markup": {
    "highlight": {
      "style": "vs"
    }
  }
  "params": {
    "highlight": {
      "style": "vs"
    }
  }
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

## 文章

### 文章元信息

通过 params.article.hidePublishDate 可以隐藏发布时间，仅展示更新时间。如果文章仅配置了发布时间，则更新时间为发布时间。

{{< CodeTabs >}}
{{< CodeTab "toml" >}}
[params]
  [params.article]
    hidePublishDate = true
{{< /CodeTab >}}
{{< CodeTab "yaml" >}}
params:
  article:
    hidePublishDate: true
{{< /CodeTab >}}
{{< CodeTab "json" >}}
{
  "params": {
    "article": {
      "hidePublishDate": true
    }
  }
}
{{< /CodeTab >}}
{{< /CodeTabs >}}
