var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var favicon = require('serve-favicon');
var template = require('art-template');
var routes = require('./routes/index');
var app = express();
var init = require('./routes/init');
var session = require('express-session');
var multer = require('multer');
//设定上传位置 
var upload = multer({dest: __dirname+"/module/upload/"});

var viewPath = path.join(__dirname, 'views');
//console.log(app);
//为views配置路径
app.set('views', path.join(__dirname, 'views'));
//art-template模板引擎配置
//console.log(template);
template.config('base','');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
//告诉app到哪里去找路由 貌似express4.0不能用了
//上传
app.use(upload.any());
//保存映射（map）默认隐式调用
// app.use(express.router);

//配置body的请求类型
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//指定静态文件路径
app.use(express.static(path.join(__dirname, 'public')));
//指定cookie的签名
app.use(cookieParser('xyb2b'));
//启用session中间件
app.use(session({
	secret: 'xyb2b',
	name  : 'xyb2b',
	cookie: {maxAge:80000},
	resave: true,
	saveUninitialized: true
}));
//指定图标
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//定制默认请求资源
app.get('/', function(req, res){
	init.redirectToIndex(req, res);
});
app.get('/index', function(req, res){
	init.redirectToIndex(req, res);
});

//汇集请求到index.js
routes(app);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	err.message = '页面不存在';
	console.log(err+"111");
	next(err);
});
// development error handler
//will print stacktrace
// if (app.get('env') === 'development') {
	// app.use(function(err, req, res, next) {
	// 	res.status(err.status || 500);
	// 	res.render(viewPath+'/error', {
	// 	message: err.message,
	// 	error: err
	// 	});
	// 	console.log(err.message);
	// });
// }


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
		res.render(viewPath+'/error', {
		message: err.message,
		error: {}
	});
});



module.exports = app;