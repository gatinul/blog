'use strict';

const elasticsearch = require('elasticsearch');


const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error',
});


class Elastic {
  constructor() {
    this.result = {
      success: false,
      message: '',
    };
  }
  analysis(data) {
    const self = this;
    self.clear();
    const info = this.convert(data);
    if (info.get('eventType')) {
      if (info.get('eventType') === 'UPDATE') {
        self.update(info);
      } else if (info.get('eventType') === 'INSERT') {
        self.insert(info);
      } else {
        self.result.success = false;
        self.result.message = '事件类型无效';
      }
    } else {
      self.result.message = '无事件类型';
    }
    return self.result;
  }
  update(data) {
    const self = this;
    self.clear();
    if (data.get('mqUpdate')) {
      const list = data.get('mqUpdate').split(' ');
      const obj = {};
      for (let i = 0; i < list.length; i++) {
        obj[list[i]] = data.get(list[i]);
      }
      esClient.update({
        index: data.get('index'),
        type: data.get('type'),
        id: data.get('id'),
        body: {
          doc: obj,
        },
      }, function(res, err) {
        if (err) console.log(err);
        self.result.success = true;
      });
    } else {
      self.result.message = '无更新字段/更新字段无效';
    }
    return self.result;
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
    return map;
  }
  clear() {
    this.result = {
      success: false,
      message: '',
    };
  }
}
module.exports = Elastic;

