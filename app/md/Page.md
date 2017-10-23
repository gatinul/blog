### 分页实现

工作业务中需要一个假分页的实现，数据同时显示出来排版会十分拥挤，而数据量又只有百条左右，使用服务端分页又没什么必要，写了一个js静态分页通用方法。

#### API

- renderPage：传入数据data(Array),每页数量size(Number),渲染页数
- renderList：传入数据data(Array),当前页码page(Number),每页数量size(Number)
- pageChange：页码改变时，重新renderList
- totalPage：总页数
- size：每页数量

#### renderPage

```javascript
renderPage:function(data,size){ //所有函数都定义在一个大原型链中
  if(data.length>0){ //是否有数据
    data.length/size)>parseInt(data.length/size)?self.totalPage=parseInt(data.length/size)+1
    :self.totalPage=parseInt(data.length/size)
    for(var i=1;i<=self.totalPage;i++){
      self.pageUl.append(
          '<li>...</li>'
      )
    }
    self.renderList(data,1,size) //初始默认第一页
    self.pageUl.children(':first').addClass('active')// 先给第一页加选中样式
  }
}
```

#### renderList

```javascript
renderList:function(data,page,size){
  for(var i=size*(page-1);i<(size*page);i++){ // 当前页码的数据
    if(data[i]){ // 可能此页无size条满数据 比如size4，data长度10 第三页只有2条
    	self.ul.append(
        	'<li>...</li>'
        )  
    }
  }
}
```

#### pageChange

```javascript
pageChange:function(e){
  var target = e.currentTarget;
  $('li').removeClass('active') // 删除所有页的选中样式
  $(target).parent().addClass('active') // 给当前li加选中
  self.currentPage = parseInt($(target).text()) //当前页码
  self.ul.empty();// 先清空
  self.renderList(self.data,self.currentPage,self.size) // 重新渲染
}
```



---



使用时，只需一次获取数据data放入this.data中，每页数量size可自由定义。