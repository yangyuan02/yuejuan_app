mui.plusReady(function() { //H5 plus事件处理
	
	//	获取当前页面id
	console.log(plus.webview.currentWebview().id,'grade')
	var exam_sub_Id = plus.webview.currentWebview().id;
	console.log(exam_sub_Id,exam_sub_Id.length);
	
	var self = plus.webview.currentWebview();
    var examName= self.name;//获得参数
    console.log(examName,'examName')
	
	//	分别获取科目id和考试id
	var num = exam_sub_Id.indexOf('_');
	var subject_id = exam_sub_Id.substring(0,num);
	var exam_id = exam_sub_Id.substring(num+1,exam_sub_Id.length);
	console.log('subject_id',subject_id,'exam_id',exam_id)
	getPersonGrade(exam_id,subject_id);
	
	
	var logBtn = document.getElementById("go_little_questions")
	logBtn.addEventListener('tap', function(event) {
		mui.openWindow({
			id: exam_sub_Id+'s',
			url: 'score_rate.html',
			styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
				titleNView: { // 窗口的标题栏控件
					titleText: examName, // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
					titleColor: "#fff", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
					titleSize: "17px", // 字体大小,默认17px
					backgroundColor: "#2c94ff", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
					autoBackButton:true
				}
			}
		})
	}, false)
})
//获取个人考试成绩
function getPersonGrade(exam_id,subject_id){
	mui.ajax({
	    url: ajaxIp+'/api/v2/app/exams/'+exam_id+'/student_score',
	    type: 'GET',
	    headers: {'Authorization': "Bearer " + isLogin},
	    data: {'subject_id':subject_id},
	    success  : function(data){
	        console.log(JSON.stringify(data));
	        if(data.error){
	        		mui.toast(data.error)
	        }
	        showPersonGrade(data);
	    },
	    error    : function(xhr,type,errorThrown){
	        mui.toast(type);
	    }
	});
}
//显示个人成绩
function showPersonGrade(info){
	//	科目
	var subject_name = document.getElementById('person_sub');
	subject_name.innerHTML='';
	subject_name.innerHTML=info.subject_name;
	
	//	参考人数
	var student_total = document.getElementById('total_student');
	student_total.innerHTML='';
	student_total.innerHTML=info.student_total;
	
	//	分数
	var score = document.getElementById('person_grade');
	score.innerHTML='';
	score.innerHTML=info.score;
	
	//	总分
	var total_score = document.getElementById('total_grade');
	total_score.innerHTML='';
	total_score.innerHTML=info.total_score;
	
	//	等级
	var person_level = document.getElementById('person_level');
	person_level.innerHTML='';
	person_level.innerHTML=info.level;
	
	//	班级平均分
	var total_score = document.getElementById('class_avg_score');
	class_avg_score.innerHTML='';
	class_avg_score.innerHTML=info.class_avg_score;
	
	//	年级平均分
	var total_score = document.getElementById('grade_avg_score');
	grade_avg_score.innerHTML='';
	grade_avg_score.innerHTML=info.grade_avg_score;
	
	//	班级排名
	var total_score = document.getElementById('class_rank');
	class_rank.innerHTML='';
	class_rank.innerHTML=info.class_rank;
	
	//	年级排名
	var total_score = document.getElementById('grade_rank');
	grade_rank.innerHTML='';
	grade_rank.innerHTML=info.grade_rank;
	
}
