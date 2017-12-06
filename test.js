// var http = require('http');
// var captchapng = require('captchapng');

// http.createServer(function (request, response) {
//     if(request.url == '/captcha.png') {
//         var p = new captchapng(80,30,parseInt(Math.random()*9000+1000)); // width,height,numeric captcha
//         p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
//         p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

//         var img = p.getBase64();
//         var imgbase64 = new Buffer(img,'base64');
//         response.writeHead(200, {
//             'Content-Type': 'image/png'
//         });
//         response.end(imgbase64);
//     } else response.end('');
// }).listen(8181);

// console.log('Web server started.\n http:\\\\127.0.0.1:8181\\captcha.png');
var express = require('express');

var captchapng = require('captchapng');
var app = express();

app.get('/', function(req, res){

    var p = new captchapng(80,30,parseInt(Math.random()*9000+1000));
    p.color(0,0,0,0);
    p.color(80,80,80,255);

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
                'Content-Type': 'image/png'
            });
    res.end(imgbase64);

});

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})