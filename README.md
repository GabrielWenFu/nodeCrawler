# node爬虫
### 项目简要
```
* 此项目需要拉到本地运行，目前还不能直接在线预览
* 此项目主要用到了express框架，cheerio,hbs,request模块,iconv-lite编译模块本项目未用到
```
### 项目运行命令
```
* npm install 
* node crawler
```
### 编码错误问题
```
首先让request请求的返回直接buffer
然后 iconv.decode(body, ‘gb2312’) 即可
代码如下：

// 加载第三方库
var request = require('request'),
    iconv = require('iconv-lite');
// 要抓取的url
var url = 'http://www.xiaohuar.com/list-1-0.html';
// 开始抓取
request.get({
    url: url,
    encoding: null // buffer
}, function (err, response, body) {
    if (!err && response.statusCode === 200) {
        body = iconv.decode(body, 'gb2312');// 处理转码问题
        console.log(body);// 请求页面返回的html数据
    } else {
        console.error('请求失败', err);
    }
});

```

