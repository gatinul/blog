'use strict';
const amqp = require('amqplib');
// const Elastic = require('./app/lib/elasticsearch');
const path = require('path');

const q = 'hello';


module.exports = app => {
  // 在这里写你的初始化逻辑
  app.beforeStart(() => {
    const directory = path.join(app.config.baseDir, 'app/lib');
    app.loader.loadToApp(directory, 'lib');
  });
  amqp.connect('amqp://localhost')
    .then(function(conn) {
      return conn.createChannel();
    }).then(function(ch) {
      return ch.assertQueue(q, { durable: false }).then(function(ok) {
        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q);
        return ch.consume(q, async function(msg) {
          if (msg !== null) {
            console.log(' [x] Received %s', msg.content.toString('utf8'));
            const es = app.lib.elasticsearch;
            const result = await new es().analysis(msg.content.toString('utf8').replace(/{/g, '').replace(/}/g, ''));
            if (!result.success) {
              app.logger.error(`报错信息：${result.message}\n 消息队列：${msg.content}`);
            }
            ch.ack(msg);
          }
        });
      });
    });
};
