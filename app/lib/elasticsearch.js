'use strict';

const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error',
});

module.exports = app => {
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
        if (info.get('eventType') === 'UPDATE') {
          self.update(info, self.getField(info));
        } else if (info.get('eventType') === 'INSERT') {
          self.insert(info, self.getField(info));
        } else if (info.get('eventType') === 'DELETE') {
          self.delete(info);
        } else {
          self.result.success = false;
          self.result.message = '事件类型无效';
        }
      } else {
        self.result.message = '无事件类型';
      }
      return self.result;
    }
    delete(data) {
      esClient.delete({
        index: data.get('index'),
        type: data.get('type'),
        id: data.get('id'),
      }, function(err, res) {
        if (err) {
          console.log(err);
        }
      });
    }
    insert(data, obj) {
      esClient.create({
        index: data.get('index'),
        type: data.get('type'),
        id: data.get('id'),
        body: obj,
      }, function(err, res) {
        if (err) {
          app.logger.error(new Error(err));
        }
      });
    }
    update(data, obj) {
      esClient.update({
        index: data.get('index'),
        type: data.get('type'),
        id: data.get('id'),
        body: {
          doc: obj,
        },
      }, function(error, response) {
        if (error) {
          app.logger.error(new Error(error));
        }
      });
    }
    getField(data) {
      const list = data.get('mqUpdate').split(' ');
      const obj = {};
      for (let i = 0; i < list.length; i++) {
        obj[list[i]] = data.get(list[i]);
      }
      return obj;
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
  return Elastic;
};
