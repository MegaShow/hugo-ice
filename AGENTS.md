# AGENTS.md

## 项目概述

Hugo Ice (冰块) 是由 MegaShow 为冰镇设计的站点主题，具备以下特点：

- 原生 CSS 和 JavaScript，不依赖相关第三方框架
- 默认适配 PC 和 Mobile 两类设备
- 更丰富的扩展功能支持

## 技术栈

- Hugo：静态站点生成
- TypeScript：JavaScript 代码生成
- Dart Sass (SCSS)：CSS 样式生成
- PNPM：包管理

## 项目结构

```
/
├── assets/
│   ├── css/            # SCSS 源文件
│   ├── icons/          # SVG 图标
│   └── js/             # TypeScript 源文件
├── docs/               # 使用该主题的文档站点
├── exampleSite/        # 使用该主题的演示站点
├── layouts/            # Hugo 模板
├── .prettierrc         # Prettier 配置
├── .stylelintrc.json   # Stylelint 配置
├── eslint.config.js    # ESLint 配置
├── theme.toml          # 主题配置
└── tsconfig.json       # TypeScript 配置
```

## 常用命令

```bash
# 开发
pnpm dev            # 启动 exampleSite 开发服务器（端口 8080，热重载）
pnpm dev:docs       # 启动文档站开发服务器（端口 8080，热重载）

# 构建
pnpm build          # 构建 exampleSite
pnpm build:docs     # 构建文档站

# 验证（提交前必须运行）
pnpm ts-check       # TypeScript 类型检查
pnpm eslint         # 检查 TypeScript 文件
pnpm stylelint      # 检查 SCSS 文件
```

## 硬性约束

- 代码要求简洁，容易阅读和维护。
- 代码需要添加适当的注释，但不能长篇大论。
- 代码修改要确保兼容 PC 和 Mobile 端。
- 禁止引用任何第三方库、框架或者 CSS 样式集合。
- 不需要添加任何单元测试，而是通过浏览器实际效果来验证修改是否合理。
- 禁止使用圆角设计（border-radius），所有元素保持方正直角。
- 颜色、风格在同一种组件上尽可能保持一致。
