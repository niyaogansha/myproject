$(function(){				
	$.get("http://datainfo.duapp.com/shopdata/getclass.php",function(data){
		data = JSON.parse(data);
		console.log(data);
		var str = "";

		for(var i = 0; i < data.length; i++){
			str += `<p class="tit"><a href="html/list.html?classID=${data[i].classID}">${data[i].className}</a></p>
					`
		}
		$(".ap").append(str);
	})			
})
									