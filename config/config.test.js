'use strict';
const db = require('../config').database;

exports.mysql = {
  // 单数据库信息配置
  client: {
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database,
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
