---
layout: post
title: 图片展示页面示范
path: /test/test/
date: 2013-12-10
photos: 
- imgs/1lightning1.jpg>>测试图片1>>测试图片1的说明介绍信息支持使用HTML标签哦,比如<a href='http://chenall.net'>我的搏客</a>
- imgs/2lightning2.jpg>>测试图片2
tags:
- Gallery
- hexo
- 测试
---

### 图片轮播功能

<!-- more -->

使用方法: 只要在photos中添加图片就行了,例子
```yaml
photos:
- imgs/1lightning1.jpg
- imgs/2lightning2.jpg
```

图片后面还可以添加一些说明信息,支持HTML标签用`>>`分隔第一个是标题,第二个是内容介绍.
比如本页面头部信息:
```yaml
photos:
- imgs/1lightning1.jpg>>测试图片1>>测试图片1的说明介绍信息支持使用HTML标签哦,比如<a href='http://chenall.net'>我的搏客</a>
- imgs/2lightning2.jpg>>测试图片2
```

PS: 本文章放在在`_POST/目录分类`会自动添加一个分类名子就是文件夹名`目录分类`