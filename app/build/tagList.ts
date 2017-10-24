// import {Observable, Observer} from 'rxjs'
import api from '../api/index';
var axios = require('axios')
var Rx = require('@reactivex/rxjs');
import * as $ from 'jquery'
import {httpPostBlog} from './lib'
var moment = require('moment')

interface GetBlogList {
  ctoken:string;
  currentPage:number
  remark?:string
}
const ul:JQuery<HTMLElement> = $('.blogUl')
const past:JQuery<HTMLElement> = $('#past')
const future:JQuery<HTMLElement> = $('#future')

let currentPage:number = 1;
let totalPage:number = 1;

const blogList: Array<object> = [];

const obj:GetBlogList = {
  ctoken:'123456',
  currentPage:currentPage
}

const $past = Rx.Observable.fromEvent(past, 'click')
const $future = Rx.Observable.fromEvent(future, 'click')

const past$ = $past
  .map(()=>currentPage)
  .filter(currentPage => currentPage > 1)
  .do((currentPage)=>{ 
    console.log(currentPage)
    currentPage = currentPage -1;
    showList(blogList[0],currentPage)
  })

const future$ = $future
  .map(()=>currentPage)
  .filter(currentPage => currentPage<totalPage)
  .do((currentPage)=>{
    currentPage = currentPage +1
    console.log(currentPage)
    showList(blogList[0],currentPage)
  })



const app$ = past$.merge(future$)
app$.subscribe()

const init = Rx.Observable.create(observer => {
  api.getBlogList(obj).then(res => {
    observer.next(res)
    observer.complete()
  }).catch(err=>{
    observer.error(err)
  })
})

init.subscribe(res=>{
  totalPage = res.totalPage;    
  blogList.push(res.list)
  showList(blogList[0],currentPage)
})



function showList(data:object, page:number){
  console.log(data);
  ul.empty()
  for(let i=7*(page-1);i<(7*page);i++){
    if(data[i]){ 
        let formateDate:string  = moment(data[i].create_time).toString();
        let dateArr: Array<string> = formateDate.split(' ');
        let date:string = dateArr[1] + ' ' + dateArr[2] + '，' + dateArr[3];
        let fileName:string = data[i].md.split('.')[0];
        ul.append(
          "<li>" +
          "<h3>"+ date +"</h3>" +
          "<h2><a>"+ fileName +"</a></h2>" +
          "<blockquote>"+ data[i].tag_name +"</blockquote>" +
          "</li>"
        )  
    }
  }
}


