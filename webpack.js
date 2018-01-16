'use strict';

module.exports = {
  entry: {
    blogList: [ './app/build/script/blogList.ts' ],
    pageList: [ './app/build/script/pageList.ts' ],
    search: [ './app/build/script/search.ts' ],
    vendor: [ 'moment', 'jquery', 'axios', '@reactivex/rxjs' ],
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ],
  },
};

