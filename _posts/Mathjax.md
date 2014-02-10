---
layout: post
title: 数学公式示范
date: 2013-12-23
tags:
- Mathjax
- Hexo
- 测试
---

本文章内容需要启用Mathjax,否则显示不正常 来源 http://winterland.me/2013/12/hexo-mathjax/

<!-- more -->

>大家都喜欢用 $E=mc^2$ 举例子，但是我不是很理解。  

> 这个公式 $\cos 2\theta = \cos^2 \theta - \sin^2 \theta =  2 \cos^2 \theta - 1$ 少年可还记得？

>插入方程组（注意多行公式结尾\\\需要打成\\\，可能是因为markdown会自动转义第一个\\）：

>\begin{aligned}
>\dot{x} & = \sigma(y-x) \\\
>\dot{y} & = \rho x - y - xz \\\
>\dot{z} & = -\beta z + xy
>\end{aligned}

>插入矩阵（同上）：

>\begin{bmatrix}
>1 & 2\\\
>3 & 4
>\end{bmatrix}

>来个复杂点的（注意有的公式开头不会自动识别，用$$包围）：

>$$\frac{\partial u}{\partial t}
= h^2 \left( \frac{\partial^2 u}{\partial x^2}
+\frac{\partial^2 u}{\partial y^2}
+\frac{\partial^2 u}{\partial z^2}\right)$$

>最后来个牛逼的吧，薛定谔方程，大学物理就记得这个了：

>$$ i\hbar\frac{\partial \psi}{\partial t}
= \frac{-\hbar^2}{2m} \left(
\frac{\partial^2}{\partial x^2}
+\frac{\partial^2}{\partial y^2}
+\frac{\partial^2}{\partial z^2}
\right) \psi + V \psi.$$