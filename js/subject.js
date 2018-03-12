mui.plusReady(function() { //H5 plus事件处理
	console.log(plus.webview.currentWebview().id,'syyy')
	var examId = plus.webview.currentWebview().id;
	getSubjects(examId);
	
	var self = plus.webview.currentWebview();
	var examName = self.name;//获得参数
    console.log(examName,'name')
	mui('#subject_box').on('tap', '.itme', function(e) {
		var subject_id = this.getAttribute('data-id');
	  	console.log(subject_id,'subject_id')
	  	if(subject_id){
	  		mui.openWindow({
				id: subject_id+'_'+examId,
				url: 'grade.html',
				styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
					titleNView: { // 窗口的标题栏控件
						titleText: examName, // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
						titleColor: "#fff", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
						titleSize: "17px", // 字体大小,默认17px
						backgroundColor: "#2c94ff", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
						autoBackButton:true
					}
				},
				extras:{
			    		name: examName
			    },
			})
	  	}else{
	  		mui.toast('没有参加此科目考试')
	  	}
		
	})
})

function getSubjects(examId){
	mui.ajax({
	    url: ajaxIp+'/api/v2/app/exams/'+examId+'/subjects',
	    type: 'GET',
	    headers: {'Authorization': "Bearer " + isLogin},
	    success  : function(data){
	        console.log(JSON.stringify(data));
	        if(data.error){
	        		mui.toast(data.error)
	        }
	        showSubjects(data)
	    },
	    error    : function(xhr,type,errorThrown){
	        mui.toast(type);
	    }
	});
}

function showSubjects(info){
	console.log(info.length)
	var subject_box = document.getElementById('subject_box');
	var subject_item = subject_box.querySelectorAll("div.itme");
	console.log(subject_item.length)
	for (var i = 0;i<subject_item.length;i++) {
//		console.log('sunID-',subject_item[i].getAttribute("data-subId"))
		var subID=subject_item[i].getAttribute("data-subId");
		for (var j=0;j<info.length;j++) {
			var dataID = info[j].id;
			if(subID==dataID){
				subject_item[i].setAttribute('data-id',dataID);
				console.log('lastID-',dataID)
			}
			
		}
		
	}
	
}
