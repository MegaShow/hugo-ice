---
title: "短代码"
date: 2023-05-28T00:00:00+08:00
---

## Import 导入

Import 短代码允许导入该页面的资源文件，当前仅支持导入 HTML 文件。

{{< Import "main.html" >}}

```text
{{</* Import "main.html" */>}}
```

```html
<!-- main.html -->
<u>Content of HTML File</u>
```

## Tab 标签页

标签页提供了平级的区域块，可以将多块内容进行收纳和展示。

{{< TabGroup >}}
{{% Tab header="Tab 1" %}}
Content of Tab 1
{{% /Tab %}}
{{% Tab header="Tab 2" %}}
Content of Tab 2
{{% /Tab %}}
{{% Tab header="Tab 3" %}}
Content of Tab 3
{{% /Tab %}}
{{< /TabGroup >}}

```text
{{</* TabGroup */>}}
{{%/* Tab header="Tab 1" */%}}
Content of Tab 1
{{%/* /Tab */%}}
{{%/* Tab header="Tab 2" */%}}
Content of Tab 2
{{%/* /Tab */%}}
{{%/* Tab header="Tab 3" */%}}
Content of Tab 3
{{%/* /Tab */%}}
{{</* /TabGroup */>}}
```
