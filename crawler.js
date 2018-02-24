var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var hbs = require('hbs');

app.set('view engine', 'hbs');  // 用hbs作为模版引擎
app.set('views', __dirname + '/views'); // 模版所在路径

app.use(express.static(__dirname + '/style'));	// 静态资源
app.use(express.static(__dirname + '/image'));	// 静态资源

app.get('/',function(req, res) {
	request('https://www.zuocai.tv/caipu/xiaochi/', function(error, response, body){
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(body);
			var imgUrl = $('#ad1_rinima1 li');
		};
		var data = [];
		imgUrl.map(function(index,item){
			var list = {};
			list.imgUrl = 'https://www.zuocai.tv' + $(item).find('img').attr('src');
			list.title = $(item).find('.title a').text();
			list.index = index;
			data.push(list);
		})

		var Data = {
			data: data
		}
		res.render('index', Data);
	});
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});