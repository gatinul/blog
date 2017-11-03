'use strict';

const nodemailer = require('nodemailer');
const email = require('../../private').email;
const mailTransport = nodemailer.createTransport({
  host: 'smtp.163.com',
  secure: true,
  post: '465',
  auth: {
    user: email.name,
    pass: email.password,
  },
});
const options = {
  from: '"gatinul" <13252716435@163.com>',
  to: 'shixy@asiainfo.com',
  subject: '定时任务邮件',
  text: '一封来自Node Mailer的邮件',
  html: '<h1>Hello world</h1>',
};
module.exports = {
  schedule: {
    interval: '6h', // 6小时间隔
    type: 'all', // 指定所有的 worker 都需要执行
  },
  * task(ctx) {
    mailTransport.sendMail(options, function(err, msg) {
      console.log(err, msg);
      if (err) {
        console.log(err);
        ctx.logger.error(err);
      } else {
        console.log('发送邮件成功');
      }
    });
  },
};
