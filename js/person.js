mui.plusReady(function() { //H5 plus事件处理
	
//	获取当前学生的基本信息
	mui.ajax({
    		url: ajaxIp+'/api/v2/app/student_infos/base_info',
        type: 'GET',
        headers: {'Authorization': "Bearer " + isLogin},
        success  : function(data){
//			console.log(JSON.stringify(data))
			var finalData=JSON.stringify(data);
			personInfo(data);//显示学生基本信息
        },
        error    : function(xhr,type,errorThrown){
            mui.toast(type);
        }
    });
	var isYbtn = document.getElementById("isYes")
	isYbtn.addEventListener('tap', function(event) {
		mui.openWindow({
			id: 2,
			url: 'bindtel.html',
			styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
				titleNView: { // 窗口的标题栏控件
					titleText: "绑定手机号", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
					titleColor: "#000000", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
					titleSize: "17px", // 字体大小,默认17px
					backgroundColor: "#fafafa", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
					splitLine: { // 标题栏控件的底部分割线，类似borderBottom
						color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
						height: "1px" // 分割线高度,默认值为"2px"
					},
					autoBackButton:true,//标题栏返回键
				}
			}
		})
	}, false)
	var noBtn = document.getElementById("no")
	noBtn.addEventListener('tap',function(event){
		mui.back()
	},false)
})
//显示当前学生基本信息
function personInfo(info){
	console.log(JSON.stringify(info))
	//	名字
	var name = document.getElementsByClassName('name')[0];
	name.innerHTML='';
	name.innerHTML= info.name;
	//	星号
	var account = document.getElementsByClassName('account')[0];
	account.innerHTML='';
	account.innerHTML= info.account;
	//	学校
	var school = document.getElementsByClassName('school')[0];
	school.innerHTML='';
	school.innerHTML= info.school_name;
	//	年级
	var grade = document.getElementsByClassName('grade')[0];
	grade.innerHTML='';
	grade.innerHTML= info.grade_name;
	//	班级
	var classroom = document.getElementsByClassName('classroom')[0];
	classroom.innerHTML='';
	classroom.innerHTML=info.classroom_name;
}
