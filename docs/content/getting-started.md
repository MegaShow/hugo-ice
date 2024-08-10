---
title: "快速上手"
date: 2023-05-28T00:00:00+08:00
lastMod: 2024-08-10T00:00:00+08:00
---

## 前置要求

> 以下所有版本均为推荐版本，低于该版本未经测试。

- Hugo Extended 0.131.0 或更高版本
- Dart SaaS 1.77.8 或更高版本

如果使用 Git 或 Hugo Module 特性，你还需要

- Git 2.37.3 或更高版本
- Golang 1.13 或更高版本

## 安装主题

Hugo Ice 支持以下三种安装方式，推荐使用前两种方式。

1. 使用 Git Submodule 安装：额外需要安装 Git；
2. 使用 Go Module 安装：额外需要安装 Git、Golang；
3. 手动下载安装。

{{< TabGroup >}}
{{% Tab header="使用 Git Submodule 安装" %}}
使用 Git 命令创建一个 Submodule 并将主题下载到 `themes/hugo-ice` 文件夹下。

```bash
git submodule add https://github.com/megashow/hugo-ice themes/hugo-ice
```
在 `hugo.toml` 中指定主题。

```toml
theme = 'hugo-ice'
```
{{% /Tab %}}
{{% Tab header="使用 Go Module 安装" %}}

首先，将站点文件夹声明为一个 Go Module，以下命令会创建 `go.mod` 文件。

```bash
hugo mod init github.com/<你的Github账号名>/<你的站点仓库名>
```

Hugo 不使用 Golang 原生的 GOPROXY 配置，因此如果需要配置代理可以修改 `hugo.toml` 文件。

```toml
[module]
  proxy = 'https://goproxy.cn,direct'
```

在 `hugo.toml` 中指定主题。

```toml
theme = 'go.icytown.com/hugo-ice'
```

使用 `hugo mod tidy` 拉取主题内容。

```bash
hugo mod tidy
```
{{% /Tab %}}
{{% Tab header="手动下载安装" %}}
可直接前往 [hugo-ice](https://github.com/megashow/hugo-ice) 下载主题文件夹到本地文件夹 `themes/hugo-ice` 下，同时修改 `hugo.toml` 配置指定主题。

```toml
theme = 'hugo-ice'
```
{{% /Tab %}}
{{< /TabGroup >}}

## 运行

安装好主题，运行 Hugo 进行站点构建并启动调试服务。

```bash
hugo server
```
