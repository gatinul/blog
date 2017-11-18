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
    const info = this.convert(data);
    if (info.get('eventType')) {
      self.result.success = true;
      switch (info.get('eventType')) {
        case 'UPDATE' :
          self.update(info);
          break;
        default:
          self.result.message = '事件类型无效';
      }
    } else {
      self.result.message = '无事件类型';
    }
    return self.result;
  }
  update(data) {
    if (data.get('mqUpdate')) {
      return true;
    }
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
    return map;
  }
}
module.exports = Elastic;

