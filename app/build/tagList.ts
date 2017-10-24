import api from '../api/index';
var axios = require('axios');
var Rx = require('@reactivex/rxjs');
import * as $ from 'jquery';

const path:string = window.location.pathname;
const arr:Array<string> = path.split('/');
const fileName = arr[arr.length - 1];
const midCol:JQuery<HTMLElement> = $('.mid-col')

const init = Rx.Observable.create(observer => {
  api.getPage({md:fileName}).then(res => {
    observer.next(res)
    observer.complete()
  }).catch(err=>{
    observer.error(err)
  })
})

init.do(res=>{
  midCol.append(res)
}).subscribe()