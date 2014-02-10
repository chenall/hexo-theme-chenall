---
layout: post
title: 自定义添加小工具
date: 2013-12-28 15:00
widgets:
  after_post:
    - uyan
  after_content:
    - post_pageNav
    - +
tags:
- 测试
---

本文章添加了一个小工具<友言>在文章框架后面,作为附加的评论系统.
同时会禁用主题after_post设置的其它小工具.所以主题的设置的post_pageNav就没有了.

after_content的小工具,本例子增加了一个post_pageNav,还有一个'+'代表在当前位置保留主题的设置.

`+`代表添加主题设置的小工具,否则默认不添加.

例子:
```
layout: post
title: 自定义添加小工具
widgets:
  after_content:
    - post_pageNav
    - +
  after_post:
    - uyan
```