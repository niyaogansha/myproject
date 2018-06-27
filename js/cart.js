$(function(){
	$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
		console.log(data);
		var str = "";
		for(var i = 0; i < data.length; i++){
			//购物车详细信息
			
			str += `<div class="pro-h3">
					<div class="pro-h4">
					<input type="checkbox" class="cb1" checked="checked"/>
					</div>
					<div class="pro-h5">
					<img src="${data[i].goodsListImg}"/>
					<div class="pro-h5-t1">
					<div class="pro-h5-t2">
					<i></i>
					<span>${data[i].goodsName}</span>
					</div>
					<h5>${data[i].className}</h5>
					</div>
					</div>
					<div class="pro-h6">￥${data[i].price}</div>
					<div class="pro-h7">
					<div class="pro-nums">
					<span class="s6">-</span>
					<input type="text" class="txt2" value = "${data[i].number}"/>
					<span class="s7">+</span>
					</div>
					</div>
					<p>￥0</p>
					<div class="pro-h8">￥8888</div>
					<div class="pro-h9">删除</div>																																	
					</div>`
			
		}
		
		$(".pro-h2").html(str);
		
	})					
})
