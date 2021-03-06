'use strict';
const marked = require('marked');
const fs = require('fs');
const path = require('path');
const highlight = require('highlight.js');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: code => {
    return highlight.highlightAuto(code).value;
  },
});

module.exports = app => {
  class Mark extends app.Service {
    async readMd(fileName) {
      const data = marked(fs.readFileSync(path.join(__dirname, '../md/', decodeURI(fileName)), 'utf-8'));
      return data;
    }
  }
  return Mark;
};
