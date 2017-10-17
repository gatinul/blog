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
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1508120559939_7556';

  // add your config here
  config.middleware = [];

  return config;
};
