# Blog

[![Build Status](https://www.travis-ci.org/gatinul/Blog.svg?branch=master)](https://travis-ci.org/gatinul/Blog)
[![codecov](https://codecov.io/gh/gatinul/Blog/branch/master/graph/badge.svg)](https://codecov.io/gh/gatinul/Blog)
[![codebeat badge](https://codebeat.co/badges/02f41e24-762d-4c06-9b93-053b081f6acf)](https://codebeat.co/projects/github-com-gatinul-blog-master)

一个从零搭建的个人博客系统，服务端使用[EGG](https://eggjs.org)构建，前端使用[TYPESCRIPT](http://www.typescriptlang.org)编写，
[RXJS](http://reactivex.io/rxjs/)控制数据流以及控制状态。

## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [egg 文档][egg]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试
- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org