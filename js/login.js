mui.plusReady(function() { //H5 plus事件处理
	plus.webview.currentWebview().setStyle({ //去掉登录页面左滑
		'popGesture': 'none'
	});
	
	var isLogin = plus.storage.getItem("token");
//	var isPhone = plus.storage.getItem("phone");
//	if(isLogin&&!isPhone){
//		mui.openWindow({
//			url: "./views/person.html",
//			id: "person"
//		});
//	}
//	if(isLogin&&isPhone){
//		mui.openWindow({
//			url: "./views/entryfun.html",
//			id: "entryfun"
//		});
//		
//	}
	console.log(isLogin);
	var logBtn = document.getElementById("login")
	logBtn.addEventListener('tap', function(event) {
		var account = document.getElementById("account")
		var password = document.getElementById("password")
		if(verify.isEmpty(account.value)) {
			plus.nativeUI.toast("账号不能为空");
			return false
		}
		if(verify.isEmpty(password.value)) {
			plus.nativeUI.toast("密码不能为空");
			return false
		}
		
		//		登录
		if(account.value&&password.value){
			mui.ajax({
		        url: ajaxIp+'/api/v2/app/login',
		        type: 'POST',
		        data: {
		        		'account': account.value,
		            'password': password.value
		        },
//		        dataType: "JSON",
		        success  : function(data){
//		            mui.toast(data);
//		            console.log(data);
					console.log(JSON.stringify(data));
		            showInfo(data);
		        },
		        error    : function(xhr,type,errorThrown){
		            mui.toast(type,xhr.status);
		        }
		    });
		}
	}, false)
	var helpBtn = document.getElementById("help");
	helpBtn.addEventListener('tap', function() {
		mui.openWindow({
			id: 'help',
			url: 'help.html',
			styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
				titleNView: { // 窗口的标题栏控件
					titleText: "帮助", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
					titleColor: "#fff", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
					titleSize: "17px", // 字体大小,默认17px
					backgroundColor: "#2c94ff", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
					autoBackButton: true
				}
			}
		})
	}, false)
	var forgetPass = document.getElementById("forgetPass")
	forgetPass.addEventListener('tap', function(event) {
		mui.openWindow({
			id: 1,
			url: 'findtel.html',
			styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
				titleNView: { // 窗口的标题栏控件
					titleText: "密码找回", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
					titleColor: "#fff", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
					titleSize: "17px", // 字体大小,默认17px
					backgroundColor: "#2c94ff", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
					autoBackButton: true
				}
			}
		})
	}, false)


})

function showInfo(info){
	if(info.error){
		console.log(info.error);
		mui.toast(info.error);
	}
	if(info.token){
		console.log(info.token);
		plus.storage.setItem("token",info.token);
		if(info.bind_phone){
			mui.openWindow({
				id: 'entryfun',
				url: 'entryfun.html',
				styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
					titleNView: { // 窗口的标题栏控件
						titleText: "考试详情", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
						titleColor: "#fff", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
						titleSize: "17px", // 字体大小,默认17px
						backgroundColor: "#2c94ff", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
						autoBackButton: true
					}
				}
			})
		}else{
			mui.openWindow({
				id: 'person',
				url: 'person.html',
				styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
					titleNView: { // 窗口的标题栏控件
						titleText: "核对个人信息", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
						titleColor: "#fff", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
						titleSize: "17px", // 字体大小,默认17px
						backgroundColor: "#2c94ff", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
						autoBackButton: true
					}
				}
			})
		}
		
	}
}