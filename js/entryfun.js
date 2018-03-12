mui.plusReady(function() { //H5 plus事件处理
var queryBtn = document.getElementById("query")
queryBtn.addEventListener('tap', function(event) {
	mui.openWindow({
		id: 2,
		url: 'exam_list.html',
		styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
			titleNView: { // 窗口的标题栏控件
				titleText: "考试", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
				titleColor: "#000000", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
				titleSize: "17px", // 字体大小,默认17px
				backgroundColor: "#fafafa", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
				splitLine: { // 标题栏控件的底部分割线，类似borderBottom
					color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
					height: "1px" // 分割线高度,默认值为"2px"
				},
				autoBackButton: true //标题栏返回键
			}
		}
	})
}, false)
var settingBtn = document.getElementById("setting")
settingBtn.addEventListener('tap', function(event) {
	mui.openWindow({
		id: 'setting',
		url: 'setting.html',
		styles: { // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
			titleNView: { // 窗口的标题栏控件
				titleText: "设置", // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
				titleColor: "#fff", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
				titleSize: "17px", // 字体大小,默认17px
				backgroundColor: "#2c94ff", // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
				autoBackButton: true //标题栏返回键
			}
		}
	})
},false)
})