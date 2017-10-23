'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/more', 'home.page');
  app.post('/getBlogList', 'home.getBlogList');
};
