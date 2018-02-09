'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/more/:id', 'home.page');
  app.get('/searchAll', 'home.searchAll');
  app.post('/getBlogList', 'home.getBlogList');
  app.post('/more/getPage', 'home.getPage');
  app.post('/search', 'home.search');
  app.post('/mini/middleApi', 'mini.middleApi');
};
