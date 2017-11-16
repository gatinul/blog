# Java String.split的坑

## 问题

在JDK 7 以及以下版本String.split会有个问题：

```java
String type = "01";
System.out.println(type.split(""));
// JDK1.7及以下，打印出
["", "0", "1"]
// JDK1.8
["0", "1"]

```

如上述代码，在JDK1.7及以下版本时，split会在开头截出一个多余的空字符串。为了避免这种情况建议改成使用`substring` 截取字符串。

```java
String type = "01";
System.out.println(type.substring(type.length()-1, type.length()));
// 都打印出
"1"
```

## 其它

另外，在使用split时，有几个符号需特殊注意下。`* ^ : | . \ `这几个字符作为分隔标志时，必须使用转义符`\\` 进行转义。