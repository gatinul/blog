'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const Elastic = require('../../../app/lib/elasticsearch');


describe('test/app/lib/elasticsearch.test.js', () => {
  const data = 'info=hello world,mqUpdate=info,eventType=UPDATE';
  const trueData = 'index=koa,type=blog_tag_md,id=40,mqUpdate=remark,eventType=UPDATE,remark=11';
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
    it('should result.success true', async () => {
      const result = await es.analysis(trueData);
      assert(result.success === true);
    });
    it('should result.message 无事件类型', async () => {
      const result = await es.analysis('info=hello');
      assert(result.message === '无事件类型');
    });
    it('should result.message 无事件类型', async () => {
      const result = await es.analysis('info=hello,eventType=CHANGE');
      assert(result.message === '事件类型无效');
    });
  });
});
