'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index(ctx) {
      const markInfo = yield ctx.service.mark.readMd('hello.md');
      const data = { markdown: markInfo };
      yield ctx.render('index.nj', data);
    }
  }
  return HomeController;
};
