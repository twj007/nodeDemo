//总路由

//当前的开发环境是all，通过以下的分路由处理各方请求
module.exports = function(app){
	if(process.env.NODE_ENV === 'all'){
		var user = require('./user.js');
		user(app);
	}
};