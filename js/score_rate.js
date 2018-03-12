mui.plusReady(function(){
	//	获取当前页面id
	console.log(plus.webview.currentWebview().id,'grade')
	var exam_sub_Id = plus.webview.currentWebview().id;
	console.log(exam_sub_Id,exam_sub_Id.length);
	
	//	分别获取科目id和考试id
	var num = exam_sub_Id.indexOf('_');
	var subject_id = exam_sub_Id.substring(0,num);
	var exam_id = exam_sub_Id.substring(num+1,exam_sub_Id.length-1);
	console.log('subject_id',subject_id,'exam_id',exam_id)
	getPersonRate(exam_id,subject_id);
	var goDetailQuestion = document.getElementById("detail_question")
	goDetailQuestion.addEventListener('tap',_goDetailQuestion,false)
})

function getPersonRate(exam_id,subject_id){
	mui.ajax({
	    url: ajaxIp+'/api/v2/app/exams/'+exam_id+'/item_correct_rate',
	    type: 'GET',
	    headers: {'Authorization': "Bearer " + isLogin},
	    data: {'subject_id':subject_id},
	    success  : function(data){
	        console.log(JSON.stringify(data));
	        if(data.error){
	        		mui.toast(data.error)
	        }
	        showPersonRate(data);
	    },
	    error    : function(xhr,type,errorThrown){
	        mui.toast(type);
	    }
	});	
}

function showPersonRate(info){
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
	
}

function _goDetailQuestion(){
	mui.toast("正在开发中")
}
