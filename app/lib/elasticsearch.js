'use strict';

const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error',
});
esClient.search({
  q: 'pants',
}).then(function(body) {
  console.log(body);
}, function(error) {
  console.trace(error.message);
});
