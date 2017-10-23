'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index(ctx) {
      // const listInfo = yield ctx.service.mainService.list();
      // const data = { list: listInfo };
      // yield ctx.render('index.nj', data);
      yield ctx.render('index.nj');
    }
    * page(ctx) {
      const markInfo = yield ctx.service.mark.readMd('Page.md');
      const data = { markdown: markInfo };
      yield ctx.render('page.nj', data);
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
