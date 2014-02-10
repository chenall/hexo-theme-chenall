---
layout: post
title: 代码显示示范
date: 2013-12-27
tags:
- code
- hexo
- chenall
categories: 
- 测试
- 代码
---

一些在文章中贴代码块的方法

<!-- more -->
普通的代码块:

使用方法:
例子:
    
    ```js
    var http = require('http');
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello World\n');
    }).listen(1337, '127.0.0.1');
    console.log('Server running at http://127.0.0.1:1337/');
    ```
    
效果如下:
``` js
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```


Code block:

{% codeblock Javascript Array Syntax lang:js http://j.mp/pPUUmW MDN Documentation %}
var arr1 = new Array(arrayLength);
var arr2 = new Array(element0, element1, ..., elementN);
{% endcodeblock %}

支持直接调用GIST代码标签:
{% raw %}
```
    {% gist 996818 %}
```
{% endraw %}
{% gist 996818 %}

支持直接调用jsFiddle的标签:
{% raw %}
```
     {% jsfiddle ccWP7 %}
```
{% endraw %}

{% jsfiddle ccWP7 %}