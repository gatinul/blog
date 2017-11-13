'use strict';

const amqp = require('amqplib');


const q = 'hello';

// 官网上没设置durable: false，会报错 vhost '/': received 'true' but current is 'false'"
amqp.connect('amqp://localhost')
  .then(function(conn) {
    return conn.createChannel();
  }).then(function(ch) {
    return ch.assertQueue(q, { durable: false }).then(function(ok) {
      console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q);
      return ch.consume(q, function(msg) {
        if (msg !== null) {
          console.log(' [x] Received %s', msg.content.toString());
          ch.ack(msg);
        }
      });
    });
  });
