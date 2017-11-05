'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    async index(ctx) {
      await ctx.render('index.nj');
    }
    async page(ctx) {
      await ctx.render('page.nj');
    }
    async getPage(ctx) {
      const markInfo = await ctx.service.mark.readMd(ctx.request.body.md + '.md');
      ctx.body = markInfo;
    }
    async getBlogList(ctx) {
      const data = await ctx.service.mainService.selectAll('blog_tag_md');
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
