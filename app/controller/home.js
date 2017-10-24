'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index(ctx) {
      yield ctx.render('index.nj');
    }
    * page(ctx) {
      yield ctx.render('page.nj');
    }
    * getPage(ctx) {
      const markInfo = yield ctx.service.mark.readMd(ctx.request.body.md + '.md');
      ctx.body = markInfo;
    }
    * getBlogList(ctx) {
      const data = yield ctx.service.mainService.selectAll('blog_tag_md');
      let total;
      data.length / 7 > parseInt(data.length / 7) ? total = parseInt(data.length / 7) + 1 : total = parseInt(data.length / 7);
      ctx.body = {
        totalPage: total,
        list: data,
      };
    }
  }
  return HomeController;
};
