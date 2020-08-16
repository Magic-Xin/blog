---
title: 被弱智bug搞了11个小时
date: 2020-08-16 11:14:43
tags:
---
今天想起来自己还有个这个 Blog，但因为 http://magicxin.tech 这个域名没有备案，80 和 443 端口被阿里云强制关掉了，所以之前大概有三四个月的时间都是无法正常访问的

这次把域名换成了 https://blog.magicxin.tech 来钻阿里云政策的空子，顺便用了土法Https。域名解析并不是用 CHAME 解析到 https://Magic-Xin.github.io, 而是提交了四个 A 记录，分别解析到

    185.199.108.153
    185.199.109.153
    185.199.110.153
    185.199.111.153

从而达到使用 GitHub Pages 提供的 Https 证书

这个方法是百度来的，不得不说是真的妖啊。唯一的缺点是每次重新部署 GitHub Pages 以后就会收到一封警告邮件，建议你使用 CHAME 解析

这么久没管这个 Blog，无论是 Hexo 还是 Next 主题都有更新，于是我算是重新精装了一边，填了一些看上去挺好玩儿，但实际没什么用的插件

顺便还想搞个 GitHub Actions 来实现全自动部署，毕竟以后只要用网页端 GitHub 新建一个 .md 文件，写完了以后自动生成静态页面+自动部署，想想都爽

然后去 Google 随便搜了一个别人写好的 Actions，准备自己魔改一番就能用了。结果这破玩意我从 0 点折腾到上午 11 点。。。

Bug 是报错
```
ERROR: Repository not found.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
##[error]Process completed with exit code 128.
```
我一开始以为是 npm 的问题，因为最新版的 Next 主题把之前需要 git clone 的 three 插件打包进 npm 里了。但后来转念一想，那也应该是 npm 报错啊！所以排除了这种可能

去 Google 转了一圈，StackOverFlow 上说是 GitHub 远程地址设置的问题。然后我就开始围绕着这个点死扣，重新生成 ssh-key 啊，各种改 git remote 啊。基本上 80% 的时间都折腾在这条路上了。结果事实证明，无论是 git remote 设置，还是我的 ssh-key，都没有问题

这时候我注意到了在这堆报错上面还有一行
```
Cloning into 'themes/next/source/lib/fancybox'...
```

因为之前接触到的 GitHub Actions 都是编译路由器固件，多线程编译最后输出的结果都是乱的，我也就没往这方面想。但这个 Actions 明显是单线程的，难不成是 git clone 的时候出问题了？

把 git clone 那两行删了，果然跑过了。再仔细一查，两个项目的 repo 地址应该是 theme-next，我tmd给写成 next-theme 了！

这么简单一个 Bug 浪费了我将近 11 个小时，我现在严重怀疑我是不是有天生智力缺陷。。。

最后放个图来让大家感受一下我有多绝望
![](https://magicxin-blog-image.oss-cn-beijing.aliyuncs.com/img/20200816115709.png)

如果有需要的朋友可以直接去 [GitHub](https://github.com/Magic-Xin/blog/tree/master/.github/workflows) 拿我写好的 Actions，如果后期有空我会专门写一个整合了各种 next 插件的通用版本

<b>咕咕咕！</b>