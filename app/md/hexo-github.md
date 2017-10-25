---
title: hexo&github 搭建博客
date: 2017-03-30 09:23:25
tags: Learn
---

​	这篇博客主要记下hexo&github搭建这个博客页的过程，总体来说挺顺利的。之前折腾过jekyll，wordpress,但因为新版wordpress不支持导入插件果断转站了。对于常用github以及npm包的人来说，配置hexo个人博客几乎零门槛。

<!--more-->

## 安装hexo

```bash
# 新建一个文件夹，在文件夹下全局安装hexo
npm install -g hexo

# 安装hexo&git插件 后面用
npm install hexo-deployer-git --save

# 初始化hexo,当前目录即博客根目录
hexo init

# 生成静态页
hexo generate

# 本地调试 localhost:4000
hexo server

```

## 创建github仓库

在github上新建一个 名为 `name.github.io` 的仓库

## hexo,github关联

- 打开blog目录（上面创建的博客根目录），打开其中的`config.yml` 文件

```javascript
// 修改最下面的 deploy： 项
deploy:
	type:git
    repo://你的github仓库地址
	branch:master
```

- 因为上面安装了`hexo-deployer-git`  ，这里直接执行`hexo deploy`即可部署到github.io页面上

## 常用命令

```bash
# 新建文章
hexo new "name"

# 新建页面
hexo new page "name"

# 部署更新- 3步
hexo clean 
hexo generate 
hexo deploy
```

## hexo主题   

这里使用的是 [next](http://theme-next.iissnan.com/getting-started.html) 主题，个人比较喜欢留白的设计！

### 安装next

1. git clone https://github.com/iissnan/hexo-theme-next themes/next
2. 将next目录 放到你的博客根目录的 `themes` 下

### 修改配置文件

根目录下config.yml : 站点配置文件

next主题下config.yml : 主题配置文件

*next 提供了3种风格选择，具体参考上方next的文档*

#### 设置语言

编辑站点配置文件

```
language:zh-Hans
```

#### 设置菜单

```bash
# 主题配置文件
menu:
  home: /
  archives: /archives
  #about: /about
  #categories: /categories
  tags: /tags
  #commonweal: /404.html
```

**注意：** hexo默认初始化只有home,archives两个页面，这里的tags页需自己创建

`hexo new page "tags"`

在tags下的index.md中填写

```
type:"tags"
comments:false
```

### 第三方插件

#### 搜索功能

这里使用 [Local Search](http://theme-next.iissnan.com/third-party-services.html#search-system)

##### 安装

```
npm install hexo-generator-searchdb --save
```

##### 站点配置文件

```bash
# 新增以下内容
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```

##### 主题配置文件

```bash
# Local search
local_search:
	enable:true
```

#### 评论功能

评论系统插件有很多，比较出名的如[disqus](https://disqus.com/)，多说，畅言等。disqus经常被墙（--），多说要关闭维护了，畅言挺不错的但是要有icp备案，逼上绝路的我折腾了一晚上选择了[友言](http://www.uyan.cc/index.php) 。总体来说还可以，绑定域名前会容易被浏览器拦截，绑定域名后貌似好了。

##### 使用

```bash
# Support for youyan comments system.
# You can get your uid from http://www.uyan.ccs
youyan_uid: 
```

使用十分简单，在友言注册登录后将你的id号放入`主题配置文件` 中入上位置即可。

#### 域名绑定

网站名默认是xxx.github.io这样，如果你有域名可以改为你的域名，我这里改为了`gatinul.cn`。

1. 在博客目录下的source文件夹下增加`CNAME`文件，将你的域名填入其中。
2. `hexo g` 、`hexo d` 部署
3. dns设置域名解析，具体如下：

这里使用[dnspod](https://www.dnspod.cn/)来解析，注册登录后，在 后台管理-域名解析-添加域名 将你的域名添加

然后记录管理，添加两条记录 ，记录类型均为CNAME，主机记录分别为@，www，记录值为xxx.github.io。确认保存十分钟后，即可访问自己的域名查看github.io页面。

## 更多

- [hexo主题](https://www.zhihu.com/question/24422335)


- [github.io](https://pages.github.com/)

