---
title: "快速上手"
date: 2023-05-28T00:00:00+08:00
lastmod: 2024-09-15T00:00:00+08:00
---

## 前置要求

在开始之前，确保你的环境已安装了 Hugo Extended 和 Dart Sass，安装方式可以查阅 [Hugo 文档](https://gohugo.io/installation/)。

由于 Hugo Ice 使用了 Sass 来实现 CSS 样式，因此需要使用 Extended 版本的 Hugo，标准版本的 Hugo 将无法正常生成网站。Hugo 官方提供了两种版本的 Hugo 下载方式，安装前请确认版本是否正确。

我们推荐使用以下的版本，低于该版本可能主题也能正常工作，如果遇到问题请先尝试升级版本至满足以下条件。

- Hugo Extended 0.131.0 或更高版本
- Dart SaaS 1.77.8 或更高版本

如果使用 Git 或 Hugo Module 特性，你还需要：

- Git 2.37.3 或更高版本
- Golang 1.23 或更高版本

## 安装主题

Hugo Ice 支持以下三种安装方式，推荐使用前两种方式。

1. 使用 Git 安装：额外需要安装 Git；
2. 使用 Go Module 安装：额外需要安装 Git、Golang；
3. 手动下载安装。

### 使用 Git 安装

> 该方式需要前置安装 Git。

Hugo Ice 主题的源代码仓库均托管在 GitHub，通过拉取 master 分支可以得到主题的最新版本源代码。你可以通过 Git 将代码克隆下来，并放到 `themes/hugo-ice` 文件夹下。

```bash
git clone https://github.com/megashow/hugo-ice themes/hugo-ice
```

如果你的站点已经使用 Git 进行管理，也可以通过 Git Submodule 的形式下载主题。

```bash
git submodule add https://github.com/megashow/hugo-ice themes/hugo-ice
```

然后在 hugo.toml / hugo.yaml / hugo.json 中指定主题。

{{< CodeTabs >}}
{{< CodeTab toml >}}
theme = 'hugo-ice'
{{< /CodeTab >}}
{{< CodeTab yaml >}}
theme: 'hugo-ice'
{{< /CodeTab >}}
{{< CodeTab json >}}
{
  "theme": "hugo-ice"
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

### 使用 Go Module 安装

> 该方式需要前置安装 Git、Golang。

首先，将站点文件夹声明为一个 Go Module，以下命令会创建 `go.mod` 文件。

```bash
hugo mod init github.com/<你的Github账号名>/<你的站点仓库名>
```

Hugo 不使用 Golang 原生的 GOPROXY 配置，因此如果需要配置代理可以修改 `hugo.toml` 文件。如果不需要配置代理，可以跳过这一步骤。

{{< CodeTabs >}}
{{< CodeTab toml >}}
[module]
  proxy = 'https://goproxy.cn,direct'
{{< /CodeTab >}}
{{< CodeTab yaml >}}
module:
  proxy: 'https://goproxy.cn,direct'
{{< /CodeTab >}}
{{< CodeTab json >}}
{
  "module": {
    "proxy": "https://goproxy.cn,direct"
  }
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

在 hugo.toml / hugo.yaml / hugo.json 中指定主题。

{{< CodeTabs >}}
{{< CodeTab toml >}}
theme = 'go.icytown.com/hugo-ice'
{{< /CodeTab >}}
{{< CodeTab yaml >}}
theme: 'go.icytown.com/hugo-ice'
{{< /CodeTab >}}
{{< CodeTab json >}}
{
  "theme": "go.icytown.com/hugo-ice"
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

使用 `hugo mod tidy` 拉取主题内容。

```bash
hugo mod tidy
```

### 手动下载安装

可直接前往 [hugo-ice](https://github.com/megashow/hugo-ice) 下载主题文件夹到本地文件夹 `themes/hugo-ice` 下，同时修改 hugo.toml / hugo.yaml / hugo.json 中指定主题。

{{< CodeTabs >}}
{{< CodeTab toml >}}
theme = 'hugo-ice'
{{< /CodeTab >}}
{{< CodeTab yaml >}}
theme: 'hugo-ice'
{{< /CodeTab >}}
{{< CodeTab json >}}
{
  "theme": "hugo-ice"
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

## 运行

安装好主题，运行 Hugo 进行站点构建并启动调试服务。

```bash
hugo server
```
