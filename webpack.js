'use strict';

module.exports = {
  entry: {
    blogList: [ './app/build/blogList.ts' ],
    tagList: [ './app/build/tagList.ts' ],
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ],
  },
};
