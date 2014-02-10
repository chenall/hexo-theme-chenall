---
date: 2013-12-28 15:20
layout: post
title: 介绍
comments: false
tags:
- hexo
- theme
- chenall
categories: 
- 测试
- 介绍
---

基于[Hexo]默认主题light修改而成,采用bootstrap css框架
在尽量保留原有主题功能的同时采用模块化设计支持多个widgets.实现高度自定义,通过widgets你可以添加许多实用功能.
可以自定义组合各种组件,像评论系统,统计系统等.
<!-- more -->
## 安装方法

通过以下命令下载主题到您的theme目录，然后修改blog的_config.yml中theme为chenall。

```
git clone git://github.com/chenall/hexo-theme-chenall.git themes/chenall
```
或
```
svn co -r HEAD https://github.com/chenall/hexo-theme-chenall/trunk themes/chenall
```

## 更新

通过以下命令来保持更新:

```
cd themes/light
git pull 或 svn up
```

## 功能

- 两栏模块
- 侧边栏工具
- 模块化,可根据您的需要加载指定模块.
- 支持多种评论系统
- 支持多种统计系统
- 顶部菜单支持子菜单.
- widgets功能增强,完全自定义,并且可以在多个地方加载,比如文章内容前/后,页面顶部/底部等.
- 其它功能请参考 [hexo-theme-light](http://zespia.tw/hexo-theme-light/)
- 可以单独启用或禁用各种小工具
- 支持多级分类,多个一级分类

[Hexo]: http://zespia.tw/hexo