'use strict';

module.exports = {
  entry: {
    blogList: [ './app/build/blogList.ts' ],
    tagList: [ './app/build/tagList.ts' ],
    vendor: [ 'moment', 'jquery', 'axios', '@reactivex/rxjs' ],
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ],
  },
};
