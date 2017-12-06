


function redirectToIndex(req, res){
	var time = new Date();
	var GMT = time.getYear() + time.getMonth() + time.getDay();
	var data = {
		'title' : '行云全球购',
		'imgUrl' : __dirname+'/public/images/icon_checked.png',
		'time' : GMT,
		'footer' : '@copyright深圳天行云供应链有限公司' 
	}
	console.log('redirect');
	res.render('../views/index', data);
}

exports.redirectToIndex = redirectToIndex;