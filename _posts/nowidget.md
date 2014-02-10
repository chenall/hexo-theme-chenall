---
date: 2013-12-28 15:00
layout: post
path: /hexo/nowidget/
title: 禁用所有小工具的文章
widgets:
  theme: false
  after_post:
    - post_pageNav
categories: 
- 测试/子分类
---

本页面会禁用主题设置的所有widgets包含侧边栏

使用方法,在贴子信息中添加以下内容

```
widgets:
  theme: false
```

<!-- more -->

本页面的设置如下: 本页面额外添加了一个小工具post_pageNav
```
---
title: 禁用所有小工具的文章
widgets:
  theme: false
  after_post:
    - post_pageNav
---
```

你同样可以添加需要的小工具,只需要在widgets:后面添加你需要添加的小工具就行了.

也可以参考 [自定义添加小工具](/post/customwidget/)