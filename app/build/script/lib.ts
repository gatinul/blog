var Rx = require('@reactivex/rxjs');
import api from '../../api/index';
var moment = require('moment');


export const disable = (ele:JQuery<HTMLElement>)=>{
  ele.addClass('disabled')
}
export const undisable = (ele:JQuery<HTMLElement>)=>{
  ele.removeClass('disabled')
}


/**
 * es搜索
 * @param  {} condition
 */
export const esSearch = (condition) => {
  return new Promise(function (resolve, reject){
      api.search(condition).then(r=>{
          if(r.success){
            resolve(r.data)
          }else{
              resolve(r.message)
          }
      })
  })
}