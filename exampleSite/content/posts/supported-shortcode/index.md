---
title: '支持的短代码'
date: '2023-02-23T00:00:00+08:00'
tags: [Hugo, Markdown]
---

Hugo 提供了丰富的 shortcode 短代码能力，本文将使用 Hugo ICE 额外提供 shortcode，用于验证 shortcode 的渲染和使用是否正常。

<!--more-->

# Hugo 预设的短代码

暂不验证。

# 主题提供的短代码

## Import

{{< Import "test.html" >}}

## Tab

{{< TabGroup >}}
{{% Tab header="第一个Tab" %}}
这是第一个 Tab 的内容。
{{% /Tab %}}
{{% Tab "第二个Tab" %}}
这是第二个 Tab 的内容。
{{% /Tab %}}
{{% Tab /%}}
{{% Tab %}}
{{% /Tab %}}
{{< /TabGroup >}}