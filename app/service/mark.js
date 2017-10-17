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
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: code => {
    return highlight.highlightAuto(code).value;
  },
});

module.exports = app => {
  class Mark extends app.Service {
    * readMd(fileName) {
      const data = marked(fs.readFileSync(path.join(__dirname, '../md/', fileName), 'utf-8'));
      return data;
    }
  }
  return Mark;
};
