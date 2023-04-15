# Hugo ICE

[![GitHub Action Status](https://github.com/megashow/hugo-ice/workflows/main.yml/badge.svg)](https://github.com/megashow/hugo-ice/actions)
[![Netlify Status](https://api.netlify.com/api/v1/badges/de4fa6da-8847-49ea-9524-c3bf39f6c3e1/deploy-status)](https://app.netlify.com/sites/hugo-ice-demo/deploys)

> 目前正处于开发中，尚未发布任何版本。

Hugo ICE (冰块) 是由 MegaShow 设计，由 Rytia、yuyuforest 指导的 Hugo 主题，主打简洁、清爽。

## 特性

- 简洁、清爽

## 要求

- Hugo extended 0.102.3 或更高版本
- Embedded Dart Sass 1.56.1 或更高版本

如果使用 hugo module 特性，你还需要

- Git
- Go 1.13 或更高版本

## 使用主题

你可以使用 hugo module 的特性引入冰块主题。

将你的仓库初始化为一个 hugo module。

```sh
$ hugo mod init github.com/repo/path
```

在 `config.toml` (或者其他配置文件) 中添加主题模块信息。

```toml
[module]
[[module.imports]]
path = 'github.com/megashow/hugo-ice'
```

然后拉取依赖和运行。

```sh
$ hugo mod tidy
$ hugo server --minify
```

## TODO

- [x] header、footer
- [x] 首页
- [ ] 分页
- [ ] 文章页面
- [ ] 目录、专题/专栏
- [ ] 标签
- [ ] 时间轴
- [ ] 评论
- [ ] 分享
- [x] 响应式
- [ ] i18n
- [ ] 黑夜模式
- [ ] 订阅
