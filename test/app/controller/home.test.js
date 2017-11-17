'use strict';

const { app, assert } = require('egg-mock/bootstrap');


describe('test/app/controller/home.test.js', () => {


  it('should assert', async function() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /', async function() {
    await app.httpRequest()
      .get('/')
      .expect(200);
    await app.httpRequest()
      .get('/more/:id')
      .expect(200);
  });

  describe('POST /more/getPage', () => {
    it('should post and response name gatinul', async () => {
      app.mockCsrf();
      app.mockService('mark', 'readMd', async () => {
        return {
          name: 'gatinul',
        };
      });
      await app.httpRequest()
        .post('/more/getPage')
        .send({ md: 'hello' })
        .expect(200)
        .expect({
          name: 'gatinul',
        });
    });
  });
  describe('POST /getBlogList', () => {
    it('should post and res 200', async () => {
      app.mockCsrf();
      await app.httpRequest()
        .post('/getBlogList')
        .send({ ctoken: '123456', currentPage: 1 })
        .expect(200);
    });
  });
});
