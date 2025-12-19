---
title: "站点统计分析"
date: 2024-08-10T00:00:00+08:00
lastmod: 2025-12-19T00:00:00+08:00
---

Hugo Ice 支持以下站点数据分析工具。

## Counter

Counter 是一个为冰镇设计的站点数据统计工具，它可以帮助你统计站点的文章阅读量等。

Counter 的官方地址为 [https://cloud.icytown.com/counter](https://cloud.icytown.com/counter)，你也可以使用源码部署属于自己的 Counter 服务。

通过在 Counter 创建应用的 UUID 标识，然后配置在站点配置中。

| 字段 | 类型 | 默认值 | 描述 |
|--|--|--|--|
| apiPath | string | - | Counter 接口路径 |
| tenantId | string | - | Counter 应用 id |
| upsert | bool | false | 是否自动创建资源 |
| delayIncr | number | 0 | 是否延迟上报阅读量, 单位毫秒 |

{{< CodeTabs >}}
{{< CodeTab "toml" >}}
[params.statistics.counter]
  apiPath = 'https://api.icytown.com/counter'
  tenantId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  upsert = true
  delayIncr = 5000
{{< /CodeTab >}}
{{< CodeTab "yaml" >}}
params:
  statistics:
    counter:
      apiPath: 'https://api.icytown.com/counter'
      tenantId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
      upsert: true
      delayIncr: 5000
{{< /CodeTab >}}
{{< CodeTab "json" >}}
{
  "params": {
    "statistics": {
      "counter": {
        "apiPath": "https://api.icytown.com/counter",
        "tenantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "upsert": true,
        "delayIncr": 5000
      }
    }
  }
}
{{< /CodeTab >}}
{{< /CodeTabs >}}

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
