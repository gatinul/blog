'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const Elastic = require('../../../app/lib/elasticsearch');

describe('test/app/lib/elasticsearch.test.js', () => {
  const es = new Elastic();
  const data = 'info=hello world,mqUpdate=info,eventType=UPDATE';
  it('should assert', async function() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });
  it('should return map', () => {
    assert(typeof (es.convert(data)) === 'object');
    assert(es.update(es.convert(data)) === true);
  });
  describe('run analysis should success', () => {
    before(function() {
      es.analysis(data);
    });
    it('should result.success true', () => {
      assert(es.result.success === true);
    });
  });
  describe('run analysis should fail', () => {
    before(function() {
      es.analysis('info=hello');
    });
    it('should result.message 无事件类型', () => {
      assert(es.result.message === '无事件类型');
    });
  });
  describe('run analysis should invalid', () => {
    before(function() {
      es.analysis('info=hello,eventType=CHANGE');
    });
    it('should result.message 事件类型无效', () => {
      assert(es.result.message === '事件类型无效');
    });
  });
});
