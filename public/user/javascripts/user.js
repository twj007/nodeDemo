require(['jquery', 'aes', 'validate'], function($, aes, validate){

	function validate(){
			//更新验证码
			$('#verifyCode').on('click', function(){
	 			$('#verifyCode').attr('src','/user/pic?p='+new Date().getTime());
	 		});
	 		//多文件上传
		 	$('.addFile').click(function(){
		 		$('.uploadForm').append("<br><input type=\"file\" name=\"myfile\" class=\"myfile\" />");
		 	});
	 		//上传ajax
	 		$('.uploadForm').submit(function(){
	 			$.ajax({
	 				type: 'post',
	 				url: 'upload',
	 				data: $('.uploadForm').serialize(),
	 				success: function(data){
	 					if(data == 200){
		 					alert('上传成功');
		 					return true;
		 				}else{
		 					alert('上传失败');
	 						return false;
		 				}
	 				}
	 			});
	 		});
			//添加自定义验证规则
			var methods = {
				test1: {
					//第二个参数element干嘛的?
					fn: function(value, element){
						if(!value){
							return true;
						}else{
							return value && /^[\w]+$/.test(value);
						}
					},
					msg: '其实我也不知道这个正则什么意思。。。'
				}
			}
			//将自定义的验证规则加入到jquery-validate中
			$.validator.addMethod('test', methods.test1.fn, methods.test1.msg);
	 		$.validator.setDefaults({
	 			submitHandler: function(){
	 				//$(form).submit();不要用会卡死
	 				$('.password').val(aes.aesEncrypt($('.password').val()));
	 				//var pass = aes.aesEncrypt($pass.val());
	 				//console.log(pass);
	 				alert($('.password').val());
	 				form.submit();
	 			}
	 		});
	 		$().ready(function(){
	 			$('.loginForm').validate({
	 				rules: {
	 					name: {
	 						required: true,
	 						minlength:4,
	 						maxlength:10,
	 						test: true
	 					},
	 					password: "required",
	 					verifyCode: {
	 						required: true,
	 						minlength:4,
	 						maxlength:4
	 					}
	 				},
	 				messages: {
	 					name: {
	 						required :  "用户名不能为空",
		 					minlength: "用户名必须超过4个字符",
		 					maxlength: "用户名不大于10个字符",
		 					test: "这个是什么东西咯"
	 					},
	 					password:"密码不能为空",
	 					verifyCode:{
	 						required: "验证码不能为空",
	 						minlength : "验证码必须为4位",
	 						maxlength : "验证码必须为4位"
	 					}
	 				}	
	 			});

	 		})
	}
	$(function(){
		validate();
	});
});