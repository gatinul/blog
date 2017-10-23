'use strict';

module.exports = app => {
  class Main extends app.Service {
    * selectAll(table) {
      const data = yield this.app.mysql.select(table);
      return data;
    }
  }
  return Main;
};
