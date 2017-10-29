'use strict';

module.exports = app => {
  class Main extends app.Service {
    // 获取表中全部数据
    * selectAll(table) {
      const data = yield app.mysql.select(table);
      return data;
    }
  }
  return Main;
};
