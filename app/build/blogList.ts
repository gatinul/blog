// import {Observable, Observer} from 'rxjs'
import api from '../api/index';
var axios = require('axios')
var Rx = require('@reactivex/rxjs');
import * as $ from 'jquery'
import { disable, undisable } from './lib'
var moment = require('moment')

interface GetBlogList {
  ctoken:string;
  currentPage:number
  remark?:string
}
const ul:JQuery<HTMLElement> = $('.blogUl')
const past:JQuery<HTMLElement> = $('#past')
const future:JQuery<HTMLElement> = $('#future')
const path:string = window.location.toString();


let currentPage:number = 1;
let totalPage:number = 1;
const pagation:JQuery<HTMLElement> = $('#pagation');


const blogList: Array<object> = [];

const obj:GetBlogList = {
  ctoken:'123456',
  currentPage:currentPage
}

const $past = Rx.Observable.fromEvent(past, 'click')
const $future = Rx.Observable.fromEvent(future, 'click')



const init = Rx.Observable.create(observer => {
  api.getBlogList(obj).then(res => {
    observer.next(res)
    observer.complete()
  }).catch(err=>{
    observer.error(err)
  })
})


const past$ = $past.do(()=>{
  console.log(currentPage)
  if(currentPage>1){
    currentPage = currentPage -1;
    showList(blogList[0], currentPage)
  }else{
    console.log('already first')
  }
})
const future$ = $future.do(()=>{
  console.log(currentPage)
  if(currentPage<totalPage){
    currentPage = currentPage +1;
    showList(blogList[0], currentPage)
  }else{
    console.log('already last')
  }
})

const init$ = init
  .do(res=>{
    totalPage = res.totalPage;    
    blogList.push(res.list);
    showList(blogList[0],currentPage)
  })
  

const app$ = init$.merge(past$, future$)
  .mergeMap(() => {
    return Rx.Observable.fromEvent($('.more'), 'click')
      .do((e)=>{
        const target = $(e.currentTarget)
        console.log(target.text(), path)
        location.href=(path + 'more/' + target.text())
      })
  })

app$.subscribe()


/**
 * 渲染列表
 * @param  {object} data
 * @param  {number} page
 */
function showList(data:object, page:number){
  pagation.text(page+' / '+totalPage);  
  pageStyle(page,totalPage)
  ul.empty()
  for(let i=6*(page-1);i<(6*page);i++){
    if(data[i]){ 
        let formateDate:string  = moment(data[i].create_time).toString();
        let dateArr: Array<string> = formateDate.split(' ');
        let date:string = dateArr[1] + ' ' + dateArr[2] + '，' + dateArr[3];
        let fileName:string = data[i].md.substring(0, data[i].md.lastIndexOf("."));
        ul.append(
          "<li>" +
          "<h3>"+ date +"</h3>" +
          "<h2><a class=\"more\">"+ fileName +"</a></h2>" +
          "<blockquote>"+ data[i].tag_name +"</blockquote>" +
          "</li>"
        )  
    }
  }
}
/**
 * 页面禁用样式
 * @param  {number} page
 * @param  {number} totalPage
 */
function pageStyle(page:number, totalPage:number){
  if(page == totalPage && page == 1){
    disable(future)
    disable(past)
  }else if(totalPage == page){
    disable(future)
    undisable(past)
  }else if(page == 1){
    disable(past)
    undisable(future)
  }else{
    undisable(future)
    undisable(past)
  }
}

