import * as $ from 'jquery'
import * as moment from 'moment'
import api from '../api/index'
import axios from 'axios'

const currentPage:number = 1;
let totalPage:number = 1;
const blogList: Array<object> = [];


const $past = $('#past')
const future:JQuery<HTMLElement> = $('#future');
const pagation:JQuery<HTMLElement> = $('#pagation');
const ul:JQuery<HTMLElement> = $('.blogUl');

$(document).ready(function(){
  api.getBlogList({
    'ctoken':'123456',
    'currentPage':currentPage
  }).then(res=>{
    totalPage = res.totalPage;
    blogList.push(res.list);
    pagation.text(currentPage+' / '+totalPage);
    showList(blogList[0],currentPage);
  })
});

function showList(data:object, page:number){
  for(let i=7*(page-1);i<(7*page);i++){
    console.log(data[i]);
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


