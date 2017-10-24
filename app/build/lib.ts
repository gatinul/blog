var Rx = require('@reactivex/rxjs');
import api from '../api/index';
var moment = require('moment');

export const disable = (ele:JQuery<HTMLElement>)=>{
  ele.addClass('disabled')
}
export const undisable = (ele:JQuery<HTMLElement>)=>{
  ele.removeClass('disabled')
}


