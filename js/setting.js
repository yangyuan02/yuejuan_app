mui.plusReady(function() {
	//	获取个人信息
	getPerson();
	var revisePass = document.getElementById("revisePass")
	revisePass.addEventListener('tap', function() {
		mui.openWindow({
			url: 'revisePass.html',
			id: 1,
			styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
				titleNView: { // 窗口的标题栏控件
					titleText: "修改密码", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
					titleColor: "#fff", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
					titleSize: "17px", // 字体大小,默认17px
					backgroundColor: "#2c94ff", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
					autoBackButton: true
				}
			}
		})
	}, false)
	var reviseIphone = document.getElementById("reviseBindIphone")
	reviseIphone.addEventListener('tap', function() {
		mui.openWindow({
			url: 'reviseIphone.html',
			id: 1,
			styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
				titleNView: { // 窗口的标题栏控件
					titleText: "更改绑定手机号", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
					titleColor: "#fff", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
					titleSize: "17px", // 字体大小,默认17px
					backgroundColor: "#2c94ff", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
					autoBackButton: true
				}
			}
		})
	}, false)
	//	修改昵称
	var reviseNickname = document.getElementById("reviseNickname");
	reviseNickname.addEventListener('tap', function() {
		mui.openWindow({
			url: 'revisenickname.html',
			id: 'revisenickname',
			styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
				titleNView: { // 窗口的标题栏控件
					titleText: "修改昵称", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
					titleColor: "#fff", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
					titleSize: "17px", // 字体大小,默认17px
					backgroundColor: "#2c94ff", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
					autoBackButton: true,
//					buttons:[
//						{
//							color:'#fff',
//							float:'right',
//							fontSize:'14px',
////							onclick:onClicked,
//							text:'保存'
//							
//						}
//					]
					
				}
			}
		})
	}, false)
	//	清除缓存
	var clearCache = document.getElementById("clearCache") //清除缓存
	clearCache.addEventListener('tap', function() {
		var CacheData =  document.getElementById("CacheData")
		plus.nativeUI.confirm("确定清楚缓存吗?", function(e) {
			console.log("Close confirm: " + e.index);
			if(e.index==0){
				CacheData.innerText = '0M'
			}
		});
	}, false)
	
	//	修改图片
	var avatar = document.getElementById("avatar")
	avatar.addEventListener('tap', function() { //修改图片
	          
	}, false)
	var fileInput =document.getElementById('inPath');
	fileInput.addEventListener('change',function(){
		var fileData =fileInput.files[0];
		console.log(JSON.stringify(fileData));
		var formData = new FormData();
		formData.append("avatar",fileData);
			mui.ajax({
			    url: ajaxIp+'/api/v2/app/student_infos/upload_avatar',
			    type: 'POST',
			    headers: {'Authorization': "Bearer " + isLogin},
			    data: formData,
			    processData : false,
				contentType : false,
			    success  : function(data){
			        console.log(JSON.stringify(data),JSON.stringify(fileData));
			        if(data.error){
			        		mui.toast(data.error)
			        }
			        showImage(data);
			    },
			    error    : function(xhr,type,errorThrown){
			        mui.toast(type);
			    }
			});
		
	})
	//	退出登录
	var logout = document.getElementById("logout")
	logout.addEventListener('tap',function(){//退出登录
		plus.storage.clear();
		console.log(99)
		mui.openWindow({
			url: 'login.html',
			id: 'login'
		})
	},false)
//	plus.key.addEventListener("backbutton",function(){  
//	});  
//	mui.fire(targetWebviewObj,'event',{
//		id:id
//	})
})

//获取个人信息
function getPerson(){
	mui.ajax({
        url: ajaxIp+'/api/v2/app/student_infos/student_info',
        type: 'GET',
        headers: {'Authorization': "Bearer " + isLogin},
//		dataType: "JSON",
        success  : function(data){
			if(data.error){
				mui.toast(data.error)
			}
            console.log(JSON.stringify(data));
            showPerson(data)
        },
        error    : function(xhr,type,errorThrown){
			console.log(type,xhr.status);
 			if(xhr.status==401){
 				plus.storage.clear();
	        		mui.toast('登录已过期，请重新登录');
		        	mui.openWindow({
					url: "./views/login.html",
					id: "login"
				});
	        }
//          mui.toast(type);
        }
    });
}
//显示个人信息
function showPerson(info){	
	//	头像
	var avatarBox = document.getElementById('avatar');
	var avatar =avatarBox.getElementsByClassName('people')[0];
	avatar.innerHTML='';
	var img=document.createElement("img");
	if(info.avatar!=null){
		img.src= ajaxIp+info.avatar;
	}else{
		img.src= "../img/avatar.png";
	}
	
	avatar.appendChild(img);
	//	昵称
	var reviseNickname = document.getElementById("reviseNickname");
	reviseNickname.getElementsByClassName('people')[0].innerHTML='';
	reviseNickname.getElementsByClassName('people')[0].innerHTML=info.name;	nickName=info.name;
	var nickName=info.name;
	plus.storage.setItem("nickName",nickName);
	console.log(nickName);
	//	手机号
	var reviseIphone = document.getElementById("reviseBindIphone");
	reviseIphone.getElementsByClassName('people')[0].innerHTML='';
	reviseIphone.getElementsByClassName('people')[0].innerHTML=info.phone;
	//	星号
	var accountNum = document.getElementById('account');
	accountNum.getElementsByClassName('people')[0].innerHTML='';
	accountNum.getElementsByClassName('people')[0].innerHTML=info.account;
	
}
function showImage(imgInfo){
	console.log(imgInfo.avatar);
	var avatar = ajaxIp+ imgInfo.avatar;
	console.log(avatar);
	var avatarBox = document.getElementById('avatar');
	var imgBox = avatarBox.getElementsByClassName('people')[0];
	imgBox.innerHTML='';
	var img=document.createElement("img");
	img.src = avatar;
	imgBox.appendChild(img);
}