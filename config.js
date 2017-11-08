'use strict';
const path = require('path');

exports.database = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'xiangyu',
  database: 'Koa',
};
exports.logPath = path.join(__dirname, './logs/Blog/common-error.log');
exports.nginxLogPath = '/Applications/gatinul/logs/nginx/error.log';
