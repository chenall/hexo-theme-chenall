# chenall V2.0

基于[Hexo]默认主题light修改而成,采用bootstrap css框架,主要考虑多站点支持.
在尽量保留原有主题功能的同时采用模块化设计支持多个widgets.实现高度自定义,通过widgets你可以添加许多实用功能.
可以自定义组合各种组件,像评论系统,统计系统等.

- 支持多站点共用同一主题,免切换
- 支持单独启用或禁用小工具(像侧边栏之类的)
- 支持单独启用或禁用评论
- 支持自动设置目录(source_dir,public_dir,scaffolds)
- 可以单独指定加载小工具
- 支持多个分类，支持子分类
- 独特的用户配置文件(自动加载`$SOURCE\_$THEME.yml`[默认就是**source\\_chenall.yml**]作为主题的配置文件,这样可以避免升级主题或其它原因导致的配置文件丢失).
- `iLink` 文章内链功能
- `ijs` 文章内嵌脚本或能
- 允许在head或body的前面或尾部附加自定义内容.
- 独立脚本插件扩展(source_dir/_scripts目录里面的js文件会自动加载,效果和scripts目录里面一样)

注1: 上面的$SOURCE是hexo配置文件中在`source_dir`,$THEME是hexo配置文件中的`theme`,即 **hexo.source_dir + '_'+ hexo.config.theme+ '.yml'**;

注2: 本主题V2.0版适用的hexo版本为 2.5.3 以上(2.5.2版本有Bug会显示不正常).2.4.X版请下载V1.0的主题.

```
npm install hexo@2.5.3
```

注3: 建议仔细阅读一下`自动设置目录`和`用户配置文件`相关内容.

注4: 建议把主题配置文件放到source目录下,主题自定义的组件也放到source目录下,并且把站点对应的hexo配置文件放到对应站点目录下,具体可以参考下面的目录结构.


```
hexo/chenall.net
hexo/chenall.net/_config.yml
hexo/chenall.net/source
hexo/chenall.net/source/_chenall.yml
.....
hexo/chenall.net/public
hexo/hexo.chenall.net
hexo/hexo.chenall.net/_config.yml
hexo/hexo.chenall.net/source
....
hexo/hexo.chenall.net/source/_chenall.yml
hexo/hexo.chenall.net/public
```

类似以上的目录结构,其中hexo是工作目录,`_config.yml`这个是hexo的配置文件,`_chenall.yml`是主题配置文件,这样的好处就是多站点的配置完全独立,另外更新主题时也不需要重新修改主题的配置,更不用担心因为更新的原因导致配置丢失.

使用时只需要添加`--config`参数就行了

比如

```
hexo server --config chenall.net/_config.yml
hexo generate --config hexo.chenall.net/_config.yml
```

### **具体效果:** [demo] 或我的搏客 [chenall.net] github.com/chenall里面有这两个站点的完整源码

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

## 自动设置目录

`hexo`默认的`source`目录等虽然可以通过配置文件来指定,但由于必须使用固定的目录,使用起来不太灵活

本主题对此进行了扩展,允许这些目录跟随配置文件自动变化,比如下面的配置,最终的source_dir是`$config/_config.yml`


```
CustomDir:
  source_dir: source
  public_dir: public
```

说明:

1. 目前只支持'public_dir','source_dir','scaffold_dir'的配置.
2. 可以使用变量**:config**代表配置文件目录.比如 source_dir: **:config**
3. 具体实例可以参考[demo.site](https://github.com/chenall/hexo-theme-chenall/tree/site)和[chenall.net.site](https://github.com/chenall/chenall/tree/site)的源码.

## 分类说明

一行一个分类,每一行都是一个分类,这一点和HEXO默认的配置不一样(hexo默认是属于上一个的子分类)
同时支持多级分类,像下面的.就设置了两个分类,`编程开发`和`VBScript`,`VBScript`是一个子分类.具体效果请参考[demo]

```yaml
categories: 
- 程序设计/VB/VBScript
- 编程开发
```

## ijs 内嵌脚本

ijs 是本主题的增强标签,可以在文章中内嵌脚本,这样可以实现一些特殊功能.(因为是在主题中执行的,所以可以使用那些helper插件);

一个简单的例子,在文章中插入以下内容.

```
{% ijs %}
return link('http://chenall.net');
{% endijs %}
```

以上通过hexo内置的helper插件link实现在文章中插入一个链接指向`http://chenall.net`.

复杂一些的例子,在文章中插入最近的5篇文章.

```
{% ijs %}
var str = '';
if (site.posts.length){
  str = '<ul class="list-group">';
  site.posts.sort('date', -1).limit(5).each(function(post){
    str += '<li class="list-group-item"><a href="' + config.root + post.path + '">' + post.title + '</a></li>';
  });
  str += '</ul>';
}
return str;
{% endijs %}
```

## iLink 文章内链

iLink 是本主题自带的tag插件,通过iLink可以很方便的在文章中插入文章链接.

iLink 使用格式

```
{% iLink TYPE:VALUE%}
TYPE: 类型
VALUE: 值
```

其中TYPE可使用的值如下:

* `tag`  链接到标签  
   例子:  
   ```
   {% iLink tag:GRUB4DOS %}
   ```
* `cat` 或 `category` 链接到分类  
   例子:  
   ```
   {% iLink cat:程序设计 %}
   ```
* 其它值会根据提供的信息自动链接到指定文章   
  例子:
	1. 链接到源文件名是`_posts/test.md`的文章  
      ```
      {% iLink source:_posts/test.md %}
      ```
    2. 链接到文章标题为'测试文章'的文章  
      ```
      {% iLink title:测试文章 %}
      ```
    3. 若某个文章页有额外添加了一些信息比如`myid: test`  
      ```
      {% iLink myid:test %}
      ```
    4. 通过文章的slug  
      ```
      {% iLink slug:test %}
      ```

## 附加自定义内容

如果你需要一些添加一些额外和主题无关的内容.这时就可以使用这个功能. 
在`_modules`目录中(主题或source都可以)新建一个文件夹`partial`.

然后就可以通过`partial`里面的特定文件添加额外内容.

具体文件列表:

* `body_start.ejs`   标签`<body>`后.
* `body_end.ejs`     标签`</body>`前.
* `head_start.ejs`   标签`<head>`后
* `head_end.ejs`     标签`</head>`前

例子: 想要在head中添加一行`meta`信息就可以在`head_start.ejs`中添加.

## 主题配置说明

注: 配置中如果需要访问到本地路径,除非特别指定否则应该用`css/theme.css`不要写成`/css/theme.css`,前者是相对路径会自动添加config.root路径.后者是绝对路径.

本主题特色: **把这个配置文件复制到`source`目录下并改名为_chenall.yml则会优先使用该配置,这样可以避免由于升级主题或其它原因导致的配置丢失.更方便使用.**

默认的配置:

``` yaml
# Site default meta keywords
#keywords: site, wide, default, keywords

#已加载的模块,按顺序加载,所以需要自己调整加载的顺序,比如jquery一般要加载在最前面
loaded_modules:
- jquery
- bootstrap
- fontawesome
- prettify
- fancybox
- mathjax

# 注: 模块是由css或js文件来实现的,部份需要附加js代码的模块在_modules目录下.
# 如: prettify 如果加载了prettify则会同时加载_modules\_modules.ejs
# 部份模块是自动按需加载的,在模板中添加如下代码加载多说的JS模块
# <% theme.add_module('duoshuo'); %>
#
#
modules:
  # respond 不要放到loaded_modules中,这个会自动加载
  # proxy 指定respond的proxy地址
  # 注: bootstrap的css文件和这个proxy需要在同一个域上
  respond: ## A fast & lightweight polyfill for min/max-width CSS3 Media Queries (for IE 6-8, and more).
    js: http://cdn.staticfile.org/respond.js/1.4.2/respond.min.js
    proxy: http://cdn.staticfile.org/respond.js/1.4.2/respond-proxy.html
  jquery:
    js: http://cdn.bootcss.com/jquery/1.10.2/jquery.min.js
  bootstrap: #强大的CSS框架，由Twitter的开发工程师推出
    css: http://cdn.staticfile.org/twitter-bootstrap/3.1.0/css/bootstrap.min.css
    js: http://cdn.staticfile.org/twitter-bootstrap/3.1.0/js/bootstrap.min.js
  prettify: # Google Code Prettify 代码的高亮显示
    css: http://cdn.bootcss.com/prettify/r298/prettify.min.css
    js: http://cdn.bootcss.com/prettify/r298/prettify.min.js
  highlightjs: # highlight.js 代码高亮显示插件
    css: http://cdn.bootcss.com/highlight.js/7.4/styles/github.min.css
    js:  http://cdn.bootcss.com/highlight.js/7.4/highlight.min.js
  fancybox: # 一款基于jQuery开发的类Lightbox插件
    css: http://cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.min.css
    js:  http://cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.min.js
  imagesloaded: #监测图片是否加载完毕的JavaScript库
    #js: js/jquery.imagesloaded.min.js
     js: http://cdn.bootcss.com/jquery.imagesloaded/3.0.4/jquery.imagesloaded.min.js
  Gallery:
    css: http://cdn.bootcss.com/blueimp-gallery/2.11.2/css/blueimp-gallery.min.css
    js: http://cdn.bootcss.com/blueimp-gallery/2.11.2/js/jquery.blueimp-gallery.min.js
  fontawesome:
    css: http://cdn.bootcss.com/font-awesome/4.0.3/css/font-awesome.min.css
  # MathJax is an open source JavaScript display engine for mathematics that works in all browsers.
  mathjax: # 生成数学公式插件
    css:
    js: http://cdn.bootcss.com/mathjax/2.3/MathJax.js?config=TeX-AMS-MML_HTMLorMML
    #js: http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML
  uyan: #有言评论系统
    uid: 1880458
  ujian: #友荐：为网站添加'猜你喜欢'功能
    uid: 1880458
  swiftype: #Swiftype配置，详情访问https://swiftype.com
    key: #对应的Engine Key 在https://swiftype.com/home可以看到。

##评论功能设置,目前支持disqus和duoshuo/uyan,需要在上面的modules中进行要应的设置
# show_count 是否显示文章的评论数量
# short_name 对应的short_name
# 需要的其它参数也可以加在下面,然后自己修改模板来使用.theme.comments.xxxxxx来调用
#
# 
comments:
    provider: duoshuo
    show_count: true
    short_name: hexochenall

## 站点分析统计代码功能组件
# 加载在站点的footer位置
analytics:
  # provider 要加载的统计代码类型,可同时加载多少,使用","分隔. 如下就加载了51la和google的统计代码
  # provider: 51la,google 
  provider: 51la,google,cnzz,baidu
  # google-analytics UA
  google:
  # 我要啦」免费统计 ID
  51la:
  # cnzz 免费统计
  cnzz:
    siteid: 5774006  #站点ID,在获取统计代码的页面的地址栏上可以看到siteid=xxxx或从代码中提取(一般是一串数字)
    show: #显示样式  留空: 图片形式1; 1: 图片形式2; 2: 图片形式1; 其它值: 文字形式
  baidu: # 百度统计对应站点的hash信息，在百度统计中获取的代码中的32个字符串信息 %3F 后面的32个十六进制字符串。类似下面的
    siteid: 1442f50724afc42380b51f097c43082c

# 站点顶部菜单,支持子菜单
menu:
  Home: ''
  About: about/
  Archives: archives/
  其它链接:
    chenall: //chenall.net
    gihtub: https://github.com/chenall/hexo-theme-chenall

# ajax_widgets是否使用jquery.load动态加载widget的内容,
# 注: 部份小工具,像标签,分类,最近文章等,这些工具的内容在所有页面都是一样的,这时它就支持动态加载
# 所谓的动态加载,就是把这些内容从文章中分离出来独立存在,并采用ajax技术动态加载到指定位置.
# 使用动态加载,更新文章时,就不会因为分类或标签等内容的更改,导致所有页面都需要更新.
#
ajax_widgets: true

# 要加载的工具在这里添加
widgets:
  header: #顶部
  footer: #底部
  sidebar: #侧边栏
    - search
    - category
    - recent_posts
    - tagcloud
    - latest_update_posts
    - random_posts
    - sina_weiboshow
    - recent_comments
  before_content: # 文章内容前
  after_content:  # 文章内容后
    - wumiiRelatedItems
    - post_footer_info
    - ujian

  after_post:     # 文章框架之后
    - post_pageNav
    - related_posts

# For use with tagcloud or tag widgets
# - only tags >= to tag_minium are shown
tag_minium: 3

## Google 跟踪代码管理器 设置
## https://www.google.com/tagmanager/
## ID 就是对应容器的ID
## GoogleTagManagerID: GTM-ABCDEF
GTM_ID:

## 在文章中使用'[CDN_URL]:'字符串自动替换为下面的地址,主要是为了方便使用.
CDN_URL: http://your.cdn.url

## ICP备案编号
Beian:

## 使用反色的导航条(值为true时导航条的背景色是黑色)
bs_nav_inverse: false

twitter_id: chenall
facebook_id:
linkedin_id:
github_id: chenall/almrun

rss: atom.xml

```

### 其它语言支持

  本主题只设置了简体中文语言文件,要使用其它语言,可以自己翻译下.以下是简体中文的语言文件例子:

```yaml
categories: 分类
search: 搜索
tags: 标签
tagcloud: 标签云
tweets: 推文
prev: 上一页
next: 下一页
comment: 留言
archive_a: 归档
archive_b: 归档：%s
page: 第 %d 页

post:
  updated: 最近更新
  Tagged: 标签
  Posted on: 发表于
  Posted in: 归类
  read more: 阅读全文

menu:
  Home: 主页
  About: 关于
  Archives: 归档
  GuestBook: 留言板

widgets:
  category: 分类
  recent_posts: 最近文章
  latest_update_posts: 最近更新
  recent_comments: 最近评论
  sina_weiboshow: 新浪微搏秀
  google_sidebar: 赞助商
  tags: 标签
  tagcloud: 标签云
```
[Hexo]: http://zespia.tw/hexo/
[demo]: http://hexo.chenall.net
[chenall.net]: http://chenall.net