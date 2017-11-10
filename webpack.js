'use strict';

module.exports = {
  entry: {
    blogList: [ './app/build/blogList.ts' ],
    pageList: [ './app/build/pageList.ts' ],
    vendor: [ 'moment', 'jquery', 'axios', '@reactivex/rxjs' ],
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ],
  },
};
