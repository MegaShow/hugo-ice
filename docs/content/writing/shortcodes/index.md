---
title: "短代码"
date: 2023-05-28T00:00:00+08:00
lastmod: 2024-09-07T00:00:00+08:00
---

## CodeTab 代码标签页

代码标签页提供了平级的区域块，可以将多块代码进行收纳和展示。

{{< CodeTabs >}}
{{< CodeTab lang="golang" header="Golang" >}}
func main() {
    fmt.Println("Hello, hugo ice!")
}
{{< /CodeTab >}}

{{< CodeTab "python" "Python" >}}
if __name__ == '__main__':
    print('Hello, hugo ice!')
{{< /CodeTab >}}

{{< CodeTab lang="rust" >}}
fn main() {
    println!("Hello, hugo ice!");
}
{{< /CodeTab >}}

{{< CodeTab "ruby" >}}
puts 'Hello, hugo ice!'
{{< /CodeTab >}}
{{< /CodeTabs >}}

```markdown
{{</* CodeTabs */>}}
{{</* CodeTab lang="golang" header="Golang" */>}}
func main() {
    fmt.Println("Hello, hugo ice!")
}
{{</* /CodeTab */>}}

{{</* CodeTab "python" "Python" */>}}
if __name__ == '__main__':
    print('Hello, hugo ice!')
{{</* /CodeTab */>}}

{{</* CodeTab lang="rust" */>}}
fn main() {
    println!("Hello, hugo ice!");
}
{{</* /CodeTab */>}}

{{</* CodeTab "ruby" */>}}
puts 'Hello, hugo ice!'
{{</* /CodeTab */>}}
{{</* /CodeTabs */>}}
```

## Import 导入

Import 短代码允许导入该页面的资源文件，当前仅支持导入 HTML 文件。

{{< Import "main.html" >}}

```markdown
{{</* Import "main.html" */>}}
```

```html
<!-- main.html -->
<u>Content of HTML File</u>
```

## Tab 标签页

标签页提供了平级的区域块，可以将多块内容进行收纳和展示。

{{< Tabs >}}
{{% Tab header="Tab 1" %}}
Content of Tab 1
{{% /Tab %}}

{{% Tab header="Tab 2" %}}
Content of Tab 2
{{% /Tab %}}

{{% Tab "Tab 3" %}}
Content of Tab 3
{{% /Tab %}}

{{< /Tabs >}}

```markdown
{{</* Tabs */>}}
{{%/* Tab header="Tab 1" */%}}
Content of Tab 1
{{%/* /Tab */%}}

{{%/* Tab header="Tab 2" */%}}
Content of Tab 2
{{%/* /Tab */%}}

{{%/* Tab "Tab 3" */%}}
Content of Tab 3
{{%/* /Tab */%}}
{{</* /TabGTabsroup */>}}
```
