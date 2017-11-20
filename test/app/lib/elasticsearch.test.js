'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const Elastic = require('../../../app/lib/elasticsearch');

describe('test/app/lib/elasticsearch.test.js', () => {
  const es = new Elastic();
  const data = 'info=hello world,mqUpdate=info,eventType=UPDATE';
  const trueData = 'remark=hello,mqUpdate=remark,eventType=UPDATE,remark=123,id=1,index=koa,type=blog_tag_md';
  it('should assert', async function() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });
  it('should return map', () => {
    assert(typeof (es.convert(data)) === 'object');
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
  describe('run update should success', () => {
    before(function() {
      es.update(es.convert(data));
    });
    it('should result.success true', () => {
      assert(es.result.success === true);
    });
  });
  describe('run update should fail', () => {
    before(function() {
      es.update(es.convert('info=hello world,eventType=UPDATE'));
    });
    it('should result.message 无更新字段/更新字段无效', () => {
      assert(es.result.message === '无更新字段/更新字段无效');
    });
  });
});
