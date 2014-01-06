# chenall

基于[Hexo]默认主题light修改而成,采用bootstrap css框架
在尽量保留原有主题功能的同时采用模块化设计支持多个widgets.实现高度自定义,通过widgets你可以添加许多实用功能.
可以自定义组合各种组件,像评论系统,统计系统等.

- 支持单独启用或禁用小工具(像侧边栏之类的)
- 支持单独启用或禁用评论
- 可以单独指定加载小工具
- 支持子分类显示(侧边栏只显示一级分类)
[demo](http://hexo.chenall.net)

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

## 配置说明

默认的配置:

``` yaml
# Site default meta keywords
#keywords: site, wide, default, keywords

#已加载的模块,按顺序加载,所以需要自己调整加载的顺序,比如jquery一般要加载在最前面
loaded_modules:
- jquery
- bootstrap
- fontawesome
- highlightjs
- imagesloaded
- fancybox
- mathjax

# 注: 模块是由css或js文件来实现的,部份需要附加js代码的模块在_modules目录下.
# 如: prettify 如果加载了prettify则会同时加载_modules\_modules.ejs
# 部份模块是自动按需加载的,在模板中添加如下代码加载多说的JS模块
# <% theme.add_module('duoshuo'); %>
#
#
modules:
  jquery:
    js: http://cdn.bootcss.com/jquery/1.10.2/jquery.min.js
  bootstrap: #强大的CSS框架，由Twitter的开发工程师推出
    css: http://cdn.bootcss.com/twitter-bootstrap/3.0.3/css/bootstrap.min.css
    js: http://cdn.bootcss.com/twitter-bootstrap/3.0.3/js/bootstrap.min.js
  prettify: # Google Code Prettify 代码的高亮显示
    css: http://cdn.bootcss.com/prettify/r298/prettify.min.css
    js: http://cdn.bootcss.com/prettify/r298/prettify.min.js
  highlightjs: # highlight.js 代码高亮显示插件
    css: http://cdn.bootcss.com/highlight.js/7.4/styles/github.min.css
    js:  http://cdn.bootcss.com/highlight.js/7.4/highlight.min.js
  fancybox: # 一款基于jQuery开发的类Lightbox插件
    css: http://cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.min.css
    js:  http://cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.min.js
  imagesloaded: #监测图片是否加载完毕的JavaScript库 使用Gallery Post 时需要用到
    js: /js/jquery.imagesloaded.min.js
  Gallery:
    css: http://cdn.bootcss.com/blueimp-gallery/2.11.2/css/blueimp-gallery.min.css
    js: http://cdn.bootcss.com/blueimp-gallery/2.11.2/js/jquery.blueimp-gallery.min.js
  fontawesome:
    css: http://cdn.bootcss.com/font-awesome/4.0.3/css/font-awesome.min.css
  # MathJax is an open source JavaScript display engine for mathematics that works in all browsers.
  mathjax: # 生成数学公式插件
    css:
    js: http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML
  uyan: #有言评论系统
    uid: 1880458
  ujian: #友荐：为网站添加'猜你喜欢'功能
    uid: 1880458

##评论功能设置,目前支持disqus和duoshuo/uyan,需要在上面的modules中进行要应的设置
# show_count 是否显示文章的评论数量
# short_name 对应的short_name
# 需要的其它参数也可以加在下面,然后自己修改模板来使用.theme.comments.xxxxxx来调用
#
# 
comments:
    provider: doushuo
    show_count: true
    short_name: chenallcn

## 站点分析统计代码功能组件
# 加载在站点的footer位置
analytics:
  # provider 要加载的统计代码类型,可同时加载多少,使用","分隔. 如下就加载了51la和google的统计代码
  # provider: 51la,google 
  provider: 51la,google,cnzz
  # google-analytics UA
  google:
  # 我要啦」免费统计 ID
  51la:
  # cnzz 免费统计
  cnzz:
    siteid: 5774006  #站点ID,在获取统计代码的页面的地址栏上可以看到siteid=xxxx或从代码中提取(一般是一串数字)
    show: #显示样式  留空: 图片形式1; 1: 图片形式2; 2: 图片形式1; 其它值: 文字形式

# 站点顶部菜单,支持子菜单
menu:
  Home: /
  About: /about
  Archives: /archives
  其它链接:
    chenall: //chenall.net
    gihtub: https://github.com/chenall/hexo-theme-chenall

widgets:
  header: #顶部
  footer: #底部
  sidebar: #侧边栏
    - search
    - category
    - recent_posts
    - tagcloud
    - tags
    - sina_weiboshow
    - recent_comments
  before_content: # 文章内容前
  after_content:  # 文章内容后
    - post_footer_info
    - ujian
  after_post:     # 文章框架之后
    - wumiiRelatedItems

# For use with tagcloud or tag widgets
# - only tags >= to tag_minium are shown
tag_minium: 3

twitter_id: chenall
facebook_id:
linkedin_id:
github_id: chenall/almrun

addthis:
  enable: false
  pubid:
  twitter: true
  facebook: true

rss: /atom.xml
```

[Hexo]: http://zespia.tw/hexo/