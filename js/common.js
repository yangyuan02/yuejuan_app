var verify = {
	isEmpty: function(value) { //是否为空
		if(value == '' || value == undefined || value == null) {
			return true
		}
	},
	isIphone: function(value) { //是否为手机号
		if(!(/^1[34578]\d{9}$/.test(value))) {
			return true;
		}
	},
	isEquel: function(valueF,valueL) { //密码是否一致
		if(valueF!=valueL) {
			return true;
		}
	}
}

var ajaxIp = 'http://118.190.44.204:7777';

var isLogin;
var isPhone;
mui.plusReady(function () {
	isLogin = plus.storage.getItem("token"); //获取token
	isPhone = plus.storage.getItem("phone"); //获取phone
	console.log(isLogin,isPhone,'common');
})
