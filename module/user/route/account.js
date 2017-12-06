//真正的路由,这层将会把数据提交到后台的接口(或者是抽象出一层，来简化相同操作)

var captchapng = require('captchapng');
var express = require('express');
//该方法在express3.0已经被弃用。。。。。????好像并不是，express4.0可用。。。
var router = express.Router();
var fs = require('fs'); 
//var router = express();
var path = require('path');
var userPath = '/user/';
var viewPath = path.join(__dirname, '/views/');


router.get('/login',function(req, res){
	console.log('用户登录');
	res.sendFile('/node/views/user/login.html');
});

router.post('/validUser', function(req, res){
	debugger;
	var params = req.body;
	var verifyCode = req.session.verifyCode || '';
	//console.log(req);
	console.log(req.session.verifyCode + verifyCode);
	if(params.name == 'admin' && verifyCode == params.verifyCode){
		console.log(params.password);
		res.cookie('xyb2bCookie', params.name+params.password, {path:'/', maxAge: 1000*60, signed:true});
		res.render('user/shoppingCar', params);//相对于设置的引擎模板的views的路径

	}else{
		var data;
		if(!(req.session.verifyCode == params.verifyCode)){
			data = {msg:'验证码错误'}
		}else{
			data = {msg:'用户名或错误'}
		}
		res.render('user/loginFail.html', data);
	}

});
//生成图像验证码
router.use('/pic', function(req, res){
	console.log('ok');
	var randomNum = parseInt(Math.random()*9000+1000);
	var p = new captchapng(80,30,randomNum);
    p.color(0,0,0,0);
    p.color(80,80,80,255);

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    req.session.verifyCode = randomNum;
    res.writeHead(200, {
                'Content-Type': 'image/png'
            });
    res.end(imgbase64);
});


//上传
router.post('/upload', function(req, res){
	var i;
	var files = req.files;
	console.log(req.files);
	if(req.files){
		for(i in files){
			console.log(files[i].filename);
			fs.renameSync(files[i].path, files[i].destination+files[i].originalname+'.jpg');
		}
		res.sendStatus(200);
	}else {
		console.log('上传失败');
		res.sendStatus(400);
	}
});
router.get('/upload', function(req, res){
	res.render('user/upload');
});

module.exports=router;