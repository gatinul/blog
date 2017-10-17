## 自己搭建博客系统

> 1. marked && highlight 提供md解析以及样式
> 2. egg提供后端服务


| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


you can `write` text [with links](http://example.com) 


```Diff
- defaultMode:
- {
+ defaultMode: {
+   contains: ['comment', 'title', 'setting'],
+   illegal: '[^\\s]'
+ }
*** /path/to/original timestamp
--- /path/to/new      timestamp
***************
*** 1,3 ****
--- 1,9 ----

! compress the size of the
! changes.
```

### javascript
```javascript
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             ` class="${cls}"`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }
}

export  $initHighlight;
```

---

### css
```css
.love{
  font-weight:500
}
```

---

### bash
```bash
# 第一个
cd my/love
```
