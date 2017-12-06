var express = require('express');
var path = require('path');
var userRouter = require('../module/user/route/account.js');

module.exports = function(app) {

	app.use(function(req, res, next) {
		var originalUrl = req.originalUrl;
		console.log('请求路径为:'+originalUrl);
		var jsPattern = /.(js|css|html|png|jpg|ico|gif)$/;
        if (jsPattern.test(originalUrl)) {
            next();
            return;
        }
		var needTokenUrl = false;
		var needTokens = ['/user/center', '/user/register'];
		for(var i = 0; i<needTokens.length; i++){
			var str = needTokens[i];
			if(req.originalUrl.slice(0, needTokens[i].length) === str){
				needTokenUrl = true;
				break
			}
		}
		console.log(needTokenUrl);
		if(needTokenUrl){
			console.log(req.signedCookies.xyb2b);
			if(req.signedCookies.xyb2b){
				var xyb2bCookie = req.signedCookies.xyb2b;
				
				if(xyb2bCookie){
					next();
					return;
				}
			} else {
				var isAjax = false;
				var header = req.headers;
				if (header['x-requested-with'] === 'XMLHttpRequest'){
					isAjax = true;
				}
				if(isAjax) {
					res.send({retCode: 1403});
				}else{
					res.redirect('/user/login');
				}
			}	
		}else{
			next();
			return;
		}
	});
	app.use('/user', userRouter);

};


