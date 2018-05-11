'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/more/:id', 'home.page');
  app.get('/searchAll', 'home.searchAll');
  app.post('/getBlogList', 'home.getBlogList');
  app.post('/more/getPage', 'home.getPage');
  app.post('/search', 'home.search');
  app.post('/mini/middleApi', 'mini.middleApi');
  app.get('/mini/getAccessToken', 'mini.getAccessToken');
  app.post('/mini/getSessionKey', 'mini.getSessionKey');
  // 能人
  app.post('/mini/ableQueryByLoginName', 'mini.ableQueryByLoginName');
  app.post('/mini/ableQrcBind', 'mini.ableQrcBind');
  app.post('/mini/ableQuerySecond', 'mini.ableQuerySecond');
  app.post('/mini/ableQueryReviewing', 'mini.ableQueryReviewing');
  app.post('/mini/ableRejectSecond', 'mini.ableRejectSecond');
  app.post('/mini/ableQueryOrder', 'mini.ableQueryOrder');
  app.post('/mini/ableGetAQrcByAbleId', 'mini.ableGetAQrcByAbleId');
  app.post('/mini/ableQueryQrcByBAbleId', 'mini.ableQueryQrcByBAbleId');
  app.post('/mini/retryBindABQrc', 'mini.retryBindABQrc');
};
