'use strict';

const { app, assert, mock } = require('egg-mock/bootstrap');


describe('test/app/controller/home.test.js', () => {


  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /', function* () {
    yield app.httpRequest()
      .get('/')
      .expect(200);
    yield app.httpRequest()
      .get('/more/:id')
      .expect(200);
  });

  describe('POST /more/getPage', () => {
    it('should post and response 200', function* () {
      app.mockCsrf();
      yield app.httpRequest()
        .post('/more/getPage')
        .send({ md: 'hello' })
        .expect(200);
    });
  });
  describe('POST /getBlogList', () => {
    it('should post and res 200', function* () {
      app.mockCsrf();
      yield app.httpRequest()
        .post('/getBlogList')
        .send({ ctoken: '123456', currentPage: 1 })
        .expect(200);
    });
  });
});
