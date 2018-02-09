'use strict';
const rp = require('request-promise');

module.exports = app => {
  class miniController extends app.Controller {
    async middleApi(ctx) {
      const result = {
        success: false,
        message: '',
      };
      const res = await this.fetch(ctx.request.body.url, ctx.request.body);
      if (res.success) {
        result.success = true;
        result.message = res.message;
      } else {
        result.message = '请求失败';
        // 以后另分一个小程序专用日志
        this.logger.error('*****小程序：' + res.message + '*****');
      }
      ctx.body = result;
    }
    async fetch(path, data) {
      return new Promise(function(resolve) {
        const options = {
          method: 'POST',
          uri: path,
          formData: data,
        };
        rp(options)
          .then(function(body) {
            resolve({
              success: true,
              message: body,
            });
          })
          .catch(function(err) {
            resolve({
              success: false,
              message: err,
            });
          });
      });
    }
  }
  return miniController;
};

