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
      data.length / 6 > parseInt(data.length / 6) ? total = parseInt(data.length / 6) + 1 : total = parseInt(data.length / 6);
      ctx.body = {
        totalPage: total,
        list: data,
      };
    }
    async search(ctx) {
      const condition = ctx.request.body;
      console.log(condition);
    }
    async searchAll(ctx) {
      await ctx.render('search.nj');
    }
  }
  return HomeController;
};
