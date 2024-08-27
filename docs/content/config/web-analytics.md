---
title: "站点统计分析"
date: 2024-08-10T00:00:00+08:00
lastmod: 2024-08-28T00:00:00+08:00
---

Hugo Ice 支持以下站点数据分析工具。

## Umami Cloud

Umami 是一个轻量级的站点数据统计和分析工具，Umami Cloud 是官方提供的云平台解决方案。

Umami Cloud 官方地址：[https://cloud.umami.is/](https://cloud.umami.is/)。

通过在 Umami Cloud 创建站点的 UUID 标识，然后配置在站点配置中。

{{< CodeTabs >}}
{{< CodeTab "toml" >}}
[params.analytics.umami]
  id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
{{< /CodeTab >}}
{{< CodeTab "yaml" >}}
params:
  analytics:
    umami:
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
{{< /CodeTab >}}
{{< CodeTab "json" >}}
{
  "params": {
    "analytics": {
      "umami": {
        "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      }
    }
  }
}
{{< /CodeTab >}}
{{< /CodeTabs >}}
