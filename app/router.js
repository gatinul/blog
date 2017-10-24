'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/more/:id', 'home.page');
  app.post('/getBlogList', 'home.getBlogList');
  app.post('/more/getPage', 'home.getPage');
};
