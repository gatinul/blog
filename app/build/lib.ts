var Rx = require('@reactivex/rxjs');
import api from '../api/index';
var moment = require('moment');



export const httpPostBlog = (value)=>{
  return Rx.Observable.create(observer=>{
    api.getBlogList(value).then(res => {
      observer.next(res)
      observer.complete()
    }).catch(err=>{
      observer.error(err)
    })
  })
}


