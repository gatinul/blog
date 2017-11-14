'use strict';

const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error',
});


esClient.create({
  index: 'koa',
  type: 'blog_tag_md',
  id: '1',
  body: {
    tag_name: 'rebecca',
    md: 'hello.md',
    remark: '',
    create_time: '2017-10-25 16:38:40',
  },
}, function(error, response) {
  // ...
  console.log(response);
});

