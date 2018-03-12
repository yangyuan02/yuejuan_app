mui.plusReady(function() { //H5 plus事件处理
	getExams();
	//添加列表项的点击事件
	mui('#examList').on('tap', 'li', function(e) {
	  var examId = this.getAttribute('examId');
	  console.log(examId,'ooo')
	  var examName = this.innerHTML;
	  console.log(examName,'examName');
	//打开详情页面          
	  mui.openWindow({
	    id:examId,
	    url:'subject.html',
	    styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
			titleNView: { // 窗口的标题栏控件
				titleText: "科目", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
				titleColor: "#fff", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
				titleSize: "17px", // 字体大小,默认17px
				backgroundColor: "#2c94ff", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
				autoBackButton:true
			}
		},
		extras:{
	    		name: examName
	    },
	  });
	});  
})

function getExams(){
	mui.ajax({
	    url: ajaxIp+'/api/v2/app/exams',
	    type: 'GET',
	    headers: {'Authorization': "Bearer " + isLogin},
	    success  : function(data){
	        console.log(JSON.stringify(data));
	        if(data.error){
	        		mui.toast(data.error)
	        }
	        showExams(data)
	    },
	    error    : function(xhr,type,errorThrown){
//	        mui.toast(type);
	        if(xhr.status==401){
	        		plus.storage.clear();
	        		mui.toast('登录已过期，请重新登录');
		        	mui.openWindow({
					url: "./views/login.html",
					id: "login"
				});
	        }
	    }
	});
}

function showExams(info){
	console.log(info.length)
	var listUl = document.getElementById('examList');
	listUl.innerHTML='';
	for (var i=0;i<info.length;i++) {
//		console.log(99)
		var listLi = document.createElement('li');
		listLi.innerHTML=info[i].name;
		listLi.setAttribute('examId',info[i].id);
		listUl.appendChild(listLi)
	}
}
