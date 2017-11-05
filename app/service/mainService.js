'use strict';

module.exports = app => {
  class Main extends app.Service {
    // 获取表中全部数据
    async selectAll(table) {
      const data = await app.mysql.select(table);
      return data;
    }
  }
  return Main;
};
