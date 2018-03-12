mui.init();
mui.plusReady(function() { //H5 plus事件处理
	/**
	 * 获取本地存储中launchFlag的值
	 * 若存在，说明不是首次启动，直接进入首页；
	 * 若不存在，说明是首次启动，进入引导页；
	 */
//	plus.storage.clear();
	var launchFlag = plus.storage.getItem("launchFlag"); //获取本地存储
	var isLogin = plus.storage.getItem("token"); //获取token
	var isPhone = plus.storage.getItem("phone"); //获取phone
	
	console.log(isLogin,isPhone,'index')
	if(launchFlag) {
		mui.openWindow({
			url: "./views/login.html",
			id: "login"
		});
	} else {
		mui.openWindow({ //引导页
			url: "./views/guide.html",
			id: "guide"
		});
	}
	if(launchFlag&&isLogin&&isPhone){
		console.log(3333)
		mui.openWindow({
			url: "./views/entryfun.html",
			id: "entryfun"
		});
	}
	if(launchFlag&&isLogin&&!isPhone){
		console.log(444)
		mui.openWindow({
			url: "./views/person.html",
			id: "person"
		});
	}
})