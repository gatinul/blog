'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const Elastic = require('../../../app/lib/elasticsearch');


describe('test/app/lib/elasticsearch.test.js', () => {
  const data = 'info=hello world,mqUpdate=info,eventType=UPDATE';
  const updateData = 'index=koa,type=blog_tag_md,id=2,mqUpdate=md,eventType=UPDATE,md=test1.md';
  const insertData = 'index=koa,type=blog_tag_md,id=2,mqUpdate=tag_name md,eventType=INSERT,tag_name=rebecca,md=test.md';
  const deleteData = 'index=koa,type=blog_tag_md,id=2,eventType=DELETE';
  const elastic = Elastic();
  const es = new elastic();
  it('should assert', async function() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });
  it('should return map', () => {
    assert(typeof (es.convert(data)) === 'object');
  });
  it('should return doc', function() {
    assert(es.getField(es.convert(data)));
  });

  describe('run analysis ', () => {
    it('should insert return true', async () => {
      const result = await es.analysis(insertData);
      assert(result.success === true);
    });
    it('should update return true', async () => {
      const result = await es.analysis(updateData);
      assert(result.success === true);
    });
    it('should delete return true', async () => {
      const result = await es.analysis(deleteData);
      assert(result.success === true);
    });
    it('should result.message 无事件类型', async () => {
      const result = await es.analysis('info=hello');
      assert(result.message === '无事件类型');
    });
    it('should result.message 事件类型无效', async () => {
      const result = await es.analysis('info=hello,eventType=CHANGE');
      assert(result.message === '事件类型无效');
    });
  });
});
