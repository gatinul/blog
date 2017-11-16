'use strict';

const elasticsearch = require('elasticsearch');


const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error',
});


class Elastic {
  analysis(data) {
    const info = this.convert(data);
    console.log(info);
    if (info.get('eventType') === 'UPDATE') {
      this.update(info);
    }
  }
  create() {
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
      if (error) { console.error(error); }
      console.info(response);
    });
  }
  update(data) {
    console.log(data.get('mqUpdate'));
    // esClient.update({
    //   index: data.index,
    //   type: data.type,

    // });
  }
  trim(data) {
    return data.replace(/(^\s*)|(\s*$)/g, '');
  }
  convert(data) {
    const arr = data.split(',');
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
      const brr = arr[i].split('=');
      map.set(this.trim(brr[0]), this.trim(brr[1]));
    }
    console.log('*' + map);
    return map;
  }
}
module.exports = Elastic;

