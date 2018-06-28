$(function(){
	$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
		console.log(data);
		var str = "";
		for(var i = 0; i < data.length; i++){
			//购物车详细信息			
			str += `<div class="pro-h3">
					<div class="pro-h4">
					<input type="checkbox" class="cb1"/>
					</div>
					<div class="pro-h5">
					<a href = "../html/list.html"><img src="${data[i].goodsListImg}"/></a>
					<div class="pro-h5-t1">
					<div class="pro-h5-t2">
					<i></i>
					<span>${data[i].goodsName}</span>
					</div>
					<h5>${data[i].className}</h5>
					</div>
					</div>
					<div data-price="${data[i].goodsID}" class="pro-h6">￥${data[i].price}</div>
					<div class="pro-h7">
					<div class="pro-nums">
					<span data-ja='${data[i].goodsID}' class="s6">-</span>
					<input type="text" class="txt2" value = "${data[i].number}"/>
					<span data-jia='${data[i].goodsID}' class="s7">+</span>
					</div>
					</div>
					<p>￥0</p>
					<div class="pro-h8">￥:${data[i].price*data[i].number}</div>
					<div class="pro-h9" data-id="${data[i].goodsID}">删除</div>																																	
					</div>`	
		}			
		var ab =Number($.cookie("numcook"));
		
		//单独商品总数量
		$(".pro-h2").html(str);
		fn();
		foo();		
		//数量加减
		
		$(".s7").bind("click",function(){
			fn();
			foo();
			var nums = $(this).siblings(".txt2").val(); 
			var goodsId = $(this).attr("data-jia");
			nums++;
			$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:goodsId,number:nums},function(){})
			$(this).parent().children("input").val(nums);	
			$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
				for(var k = 0; k < data.length; k++){
					var a = data[k].price;
					var b = $(".txt2").eq(k).val();
//					console.log($(this))
					$(".pro-h8").eq(k).html(a*b);
				}
			})
			
		})
		$(".s6").bind("click",function(){
			fn();
			foo();
			var nums = $(this).siblings(".txt2").val();
			var goodsId = $(this).attr("data-ja");
			if(nums<=1){				
				nums==1;
				$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:goodsId,number:nums},function(){})				
			}else{
				nums--;
				$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:goodsId,number:nums},function(){})				
				$(this).parent().children("input").val(nums);
			}
			
			$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
				var numss = 0;
				for(var k = 0; k < data.length; k++){
					var a = data[k].price;
					var b = $(".txt2").eq(k).val();
					$(".pro-h8").eq(k).html(a*b);					
				}								
			})			
		})
		
		//总价加减
		function foo(){
			$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
				var fns = 0;
				for(var f = 0; f < data.length; f++){
					var dj = data[f].price;
					var sl = $(".txt2").eq(f).val();
					fns = Number(fns)+dj*sl
					$("#qian").html(fns);					
				}					
			})
		}
		
		//总数量
		function fn(){
			$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
				var aa = 0;
				for(var r = 0; r < data.length; r++){					
					var ss = $(".txt2").eq(r).val();
					aa += Number(ss)	
					$(".pro-list h6").find("span").html("("+aa+")");
				}					
			})
		}
		
		//删除
		console.log($(".pro-h4").find("input").prop("checked"))
		if($(".pro-h4").find("input").prop("checked")){
			$(".pro-h9").click(function(){
				$(this).parent().remove();
				var goodsId = $(this).attr("data-id");			
				$.get("http://datainfo.duapp.com/shopdata/updatecar.php",
					{userID:$.cookie("username"),goodsID:goodsId,number:0},function(data){
						
				})
				
			})
		}
	})	
	
	//全选
	$("#checkAll").click(function(){
		$(".cb1").prop("checked",$(this).prop("checked"));
	})
	for(var s = 0; s < $(".cb1:checked").length; s++){
		$(".cb1").click(function(){
			console.log($("aa"))
			if($(".cb1:checked").length == $(".cb1").length){
				$("#checkAll").prop("checked",true);
			}else{
				$("#checkAll").prop("checked",false);
			}
		})
	}
	
})
