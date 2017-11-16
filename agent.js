'use strict';
const amqp = require('amqplib');
const Elastic = require('./app/lib/elasticsearch');


const q = 'hello';

module.exports = agent => {
  // 在这里写你的初始化逻辑

  amqp.connect('amqp://localhost')
    .then(function(conn) {
      return conn.createChannel();
    }).then(function(ch) {
      return ch.assertQueue(q, { durable: false }).then(function(ok) {
        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q);
        return ch.consume(q, function(msg) {
          if (msg !== null) {
            console.log(' [x] Received %s', msg.content.toString('utf8'));
            // agent.logger.info();
            const elastic = new Elastic();
            elastic.analysis(msg.content.toString('utf8').replace(/{/g, '').replace(/}/g, ''));
            ch.ack(msg);
          }
        });
      });
    });

  // amqp.connect('amqp://localhost').then(function(conn) {
  //   process.once('SIGINT', function() { conn.close(); });
  //   return conn.createChannel().then(function(ch) {
  //     let ok = ch.assertExchange('logs', 'fanout', { durable: false });
  //     ok = ok.then(function() {
  //       return ch.assertQueue('', { exclusive: true });
  //     });
  //     ok = ok.then(function(qok) {
  //       return ch.bindQueue(qok.queue, 'logs', '').then(function() {
  //         return qok.queue;
  //       });
  //     });
  //     ok = ok.then(function(queue) {
  //       return ch.consume(queue, logMessage, { noAck: true });
  //     });
  //     return ok.then(function() {
  //       console.log(' [*] Waiting for logs. To exit press CTRL+C');
  //     });
  //     function logMessage(msg) {
  //       console.log(" [x] '%s'", msg.content.toString());
  //     }
  //   });
  // }).catch(console.warn);
};
