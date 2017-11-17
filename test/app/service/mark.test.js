'use strict';
const fs = require('fs');

const { app, assert, mock } = require('egg-mock/bootstrap');

describe('test/app/service/mark.test.js', () => {
  describe('readFile', () => {
    it('should readFile return hello world', function* () {
      mock(fs, 'readFileSync', filename => {
        return 'hello world';
      });
      const ctx = app.mockContext();
      const data = yield ctx.service.mark.readMd('hello.md');
      assert(data === '<p>hello world</p>\n');
    });
  });
});
