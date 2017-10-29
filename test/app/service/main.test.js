'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/main.test.js', () => {
  describe('selectAll', () => {
    it('should get blog list', function* () {
      const ctx = app.mockContext();
      const data = yield ctx.service.mainService.selectAll('blog_tag_md');
      assert(data);
      assert(data.length > 1);
    });
  });
});
