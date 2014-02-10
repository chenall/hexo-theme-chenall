title: Hello World 测试文章
date: 2013-10-28 10:35:32
tags: 
- 标签1
- 测试
- hexo
categories: 
- 文章
- 测试
thread: abcd
---

关于LuaJIT,以下是官网的介绍.

LuaJIT is a Just-In-Time Compiler (JIT) for the Lua programming language. Lua is a powerful, dynamic and light-weight programming language. It may be embedded or used as a general-purpose, stand-alone language.

LuaJIT is Copyright © 2005-2013 Mike Pall, released under the MIT open source license.
LuaJIT对原版LUA进行了一些扩展,功能更强大,实用,速度也更快.本文主要介绍一下FFI扩展功能.
FFI库允许调用外部C函数以及使用C数据结构.这意味着我们可以通过它来调用一些系统API或DLL的函数,像调用LIBCURL来实现网络功能.等…
比如以下来自官网最简单的应用代码
<!-- more -->
##图片测试

![](/imgs/1lightning1.jpg)
![](/imgs/1lightning1.jpg)

##代码测试


```html
<div class="container" style="margin-top: 15px;">
    <div class="row">
        <div class="col-1 col-sm-1 col-lg-1">
            <a href="https://twitter.com/share" class="twitter-share-button" data-via="<%- theme.twitter_id %>" data-size="large">Tweet</a>
        </div>
    </div>
</div>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
```
```
<div class="container" style="margin-top: 15px;">
    <div class="row">
        <div class="col-1 col-sm-1 col-lg-1">
            <a href="https://twitter.com/share" class="twitter-share-button" data-via="<%- theme.twitter_id %>" data-size="large">Tweet</a>
        </div>
    </div>
</div>
```
```lua
local ffi = require("ffi")
ffi.cdef[[
    typedef char TCHAR;
    typedef unsigned int UINT;
    typedef TCHAR *LPTSTR;
    typedef const TCHAR *LPCTSTR;
    typedef LPCTSTR LPCSTR;
    typedef UINT WPARAM;
    typedef unsigned long LPARAM;
    typedef UINT HWND;
    typedef struct {
	long x;
	long y;
    } POINT,*PPOINT;
    void* malloc(size_t size);
    void* free(void* memblock);
    bool GetCursorPos(PPOINT lpPoint);
    HWND WindowFromPoint(POINT Point);
    int GetWindowTextA(HWND hWnd, LPTSTR lpString, int nMaxCount);
    bool SetWindowTextA(HWND hWnd, LPCTSTR lpString);
    int SendMessageA(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam);
    int MessageBoxA(HWND hWnd,LPCSTR lpText,LPCSTR lpCaption,UINT uType);
]]
local user32 = ffi.load("User32.dll")--WINDOWS API函数所在DLL文件
local win32 = ffi.load('msvcrt.dll')--malloc和free函数
local pos=ffi.new("POINT");
local oks = user32.GetCursorPos(pos)--获取当前鼠标位置
local IDYES = 6
local IDNO = 7
local WM_SETTEXT = 0x000C
local WM_GETTEXT = 0x000D
if oks then
    local hwnd = user32.WindowFromPoint(pos)--获取指定位置下窗体的句柄
    local lpString = ffi.new("char*",win32.malloc(1024))--分配内存
    local test = user32.GetWindowTextA(hwnd,lpString,1023)--获取文本
    local str1 = ffi.string(lpString);
    local strtest ="FFI 调用SetWindowText功能测试"
    local t = user32.MessageBoxA(0,"是否把以下窗体\n<"..str1..">\n的标题修改为以下内容:\n"..strtest,"LUAJIT FFI 调用WINAPI测试",0x44)--MB_ICONINFORMATION || 0x00000004L
    if t == IDYES then
	if user32.SetWindowTextA(hwnd,strtest) == true then
	    user32.MessageBoxA(0,"修改成功","测试",0x40)
	end
    end
    user32.MessageBoxA(0,"测试使用SendMessage来实现同样的功能","测试2",0x40)
    user32.SendMessageA(hwnd,WM_GETTEXT,1024,ffi.cast("LPARAM",lpString))--通过ffi.cast功能进行类型转换
    user32.MessageBoxA(0,"用SendMessage和WM_GETTEXT功能获取到的窗体标题为\n"..ffi.string(lpString),"测试2",0x40);
    user32.SendMessageA(hwnd,WM_SETTEXT,1024,ffi.cast("LPARAM","用SendMessage和WM_SETTEXT功能改写目标字符串"))
    user32.MessageBoxA(0,"目标标题已改变","测式2",0x40)
    win32.free(lpString)--释放内存
end
```

PS: 本文章放在`_POST/目录分类/子目录分类`,会自动设置`目录分类/子目录分类`的分类.