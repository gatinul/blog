'use strict';

const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error',
});

// esClient.indices.putMapping({
//   index: 'koa',
//   type: 'blog',
//   body: {
//     blog: {
//       properties: {
//         name: {
//           type: 'text',
//           term_vector: 'with_positions_offsets',
//           analyzer: 'ik_max_word',
//           search_analyzer: 'ik_max_word',
//         },
//         content: {
//           type: 'text',
//           term_vector: 'with_positions_offsets',
//           analyzer: 'ik_max_word',
//           search_analyzer: 'ik_max_word',
//         },
//         tags: {
//           type: 'text',
//           index: 'not_analyzed',
//         },
//         update_date: {
//           type: 'date',
//           index: 'not_analyzed',
//         },
//       },
//     },
//   },
// });
// esClient.create({
//   index: 'koa',
//   type: 'blog',
//   id: '1',
//   body: {
//     name: 'test.md',
//     content: 'hello world test,这是一个测试的markdown文件',
//     tags: 'test',
//     update_date: '2017-12-05T13:05:55Z',
//   },
// });
esClient.create({
  index: 'koa',
  type: 'blog',
  id: '2',
  body: {
    name: 'hello.md',
    content: '介绍用的博客，markdown文件',
    tags: 'test',
    update_date: '2017-12-27T09:05:55Z',
  },
});

// esClient.search({
//   index: 'koa',
//   type: 'blog',
//   q: 'javascript',
// }, function(error, response) {
//   // ...
//   console.log(response.hits.hits);
// });

// esClient.update({
//   index: 'koa',
//   type: 'blog',
//   id: '1',
//   body: {
//     doc: {
//       name: 'test.md',
//       content: 'hello world javascript,这是一个测试的markdown文件,谷歌',
//       tags: 'test',
//       update_date: '2017-12-05T13:05:55Z',
//     },
//   },
// });
