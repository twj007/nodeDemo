require.config({
	//require配置文件详解：
	//requirejs.config({
    // context: "_",  // default context name配置空间命名
    // baseUrl: "./",
    // waitSeconds：7, // how long canloading last 加载等待时间
	//     paths: {}, 路径，设置别名与引入库的路径，相对于node配置的静态文件的路径,路径中引入
	//     		的文件必须符合amd规范，不然需要通过中间垫片（符合AMD规范（使用define(name, deps, callback)定义模块）的js文件）依赖来加载
	//     bundles: {}, 用于引入多个模块的js文件
	//     pkgs: {}, 引入一个文件夹下多个js文件，省去写多个路径的麻烦
	//     shims: {}, 垫片，
	//     config: {}，
	//     map : {} 用于切换版本（对于一些依赖版本的不同）
	// });
	//baseUrl:
	paths: {
		'jquery' : '/common/lib/jquery/dist/jquery.min.js',
		'validate' : '/common/lib/jquery-validation/dist/js/jquery.validate.min.js',
		'aesFn':'/common/lib/aes/aes-min.js', 
        'modeEcb':'/common/lib/aes/mode-ecb.js',
		'aes' : '/common/lib/aes/aesencrypt.js'
	},
	shim: {
		'validate' : {
			deps: ['jquery']
		},
		'modeEcb':{
            deps:['aesFn']
        }
	},
	waitSeconds:0
});