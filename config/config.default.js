'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {
    view: {
      defaultViewEngine: 'nunjucks',
      root: [
        path.join(appInfo.baseDir, 'app/view'),
        path.join(appInfo.baseDir, 'app/md'),
      ].join(','),
    },
    security: {
      csrf: {
        ignoreJSON: true,
      },
      doMainWhiteList: [ 'http://localhost:7002' ],
    },
    cors: {
      allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS',
      credentials: true,
    },
    onerror: {
      // 线上页面发生异常时，重定向到这个页面上
      errorPageUrl: 'index.nj',
    },
    notfound: {
      // 404时指向首页
      pageUrl: 'index.nj',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1508120559939_7556';

  // add your config here
  config.middleware = [];

  return config;
};
