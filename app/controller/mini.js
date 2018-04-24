'use strict';
const rp = require('request-promise');

module.exports = app => {
  class miniController extends app.Controller {
    async middleApi(ctx) {
      const result = {
        success: false,
        message: '',
      };
      const url = ctx.request.body.url;
      console.log(url);
      const res = await this.fetch(url, ctx.request.body);
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
    async getAccessToken(ctx) {
      const accessToken = await this.fetch('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx3ae282ed1304c5b2&secret=fa274024b22f7a3beafffd08a1bdf51e');
      ctx.body = accessToken;
    }
    async getSessionKey(ctx) {
      const code = ctx.request.body.code;
      const sessionKey = await this.fetch('https://api.weixin.qq.com/sns/jscode2session?appid=wx3ae282ed1304c5b2&secret=fa274024b22f7a3beafffd08a1bdf51e&js_code=' + code + '&grant_type=authorization_code');
      ctx.body = sessionKey;
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

