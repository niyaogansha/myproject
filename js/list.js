$(function(){
	
	var classid = location.search.split("=")[1];
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{classID:classid},function(data){
		console.log(data);
		var str = "";
//		console.log(data[0].goodsID)
		for(var i = 0; i < 4; i++){
			str += `<li data-id="${data[i].goodsID}">
					<div class="m-b-a">
					<a href="" class="a-left">
					<img src="${data[i].goodsListImg}"/>
					</a>
					<div class="a-right">
					<a href="">
					<em>${data[i].goodsName}</em>
					<i class="ico">¥${data[i].price}</i>
					<i class = "ico2">立即抢购</i>
					</a>
					</div>
					</div>
					</li>`						
		}
		$(".main-box1 ul").html(str);
		var str1 = "";
		var str2 = "";
		var str3 = "";
		for(var i = 0; i < data.length; i++){
			str1 += `<li data-id="${data[i].goodsID}">
					 <a href = "">${data[i].className}</a>
					 </li>`
			str2 += `<li data-id="${data[i].goodsID}">
					 <a href = "">${data[i].price}元起</a>
					 </li>`
			str3 += `<li data-id="${data[i].goodsID}">
					 <a href = "">${data[i].discount}&nbsp;折</a>
					 </li>`
		}
		$(".ys ul").html(str1);
		$(".m-f-t2 ul").html(str1);
		$(".m-f-t3 ul").html(str2);
		$(".m-f-t4 ul").html(str3);
		
		var str4 = "";
		var str5 = "";
		
		for(var i = 0; i < data.length; i++){
			str4 += `<li data-id="${data[i].goodsID}">
					 <a href="">
					 <img src="${data[i].goodsListImg}"/>									
					 </a>
					 <a href="" class="aq1">${data[i].goodsName}</a>
					 <p>￥${data[i].price}</p>
					 </li>`;
					 
			
		}
		$(".list-le-top ul").html(str4);
		
		//列表详细信息
		var str6 = "";
		for(var i = 0; i < data.length; i++){
			str6 =  `<li data-id="${data[i].goodsID}">
					<div class="ss">
					<img src="${data[i].goodsListImg}"/>
					</div>
					<div class="sm-pic">
					<span class="sn1"></span>
					<div class="sm-box">
						 
						 
					</div>
					<span class="sn2"></span>
					</div>
					<em>
					￥${data[i].price}
					<span>${data[i].discount}&nbsp;折优惠</span>
					</em>
					<a href="">
					<i></i>
					${data[i].goodsName}
					</a>
					</li>`
		$(".list-ri-bottom ul").append(str6);
			
			var arr = JSON.parse(data[i].imgsUrl);
			var str7 = "";
			for(let j = 0; j < arr.length; j++){
				str7 = `<img src = "${arr[j]}"/>`;
				$(".sm-box").eq(i).append(str7);
			}		
			
			
		}
//		console.log($(".list-ri-bottom ul li").length)
		
		//小图滑动切换大图
		$(".sn1").next().find("img").hover(function(){			
			var oImg_src = $(this)[0].src;
			var aImg = $(this).parent().parent().parent().children(".ss").children("img")[0];
			aImg.src=oImg_src;
		})
		
		//点击列表跳详情
		var $li = $(".list-ri-bottom ul li");		
		for(var i = 0; i<$li.length;i++ ){
			$li[i].index= i;
			$li[i].onclick=function(){
				var detailId = $($li[this.index]).attr("data-id");
				console.log(detailId);
//				setCookie("detail",detailId,7);
				
				window.location.href="../html/detail.html?id="+detailId;
			}
		}
		
		
		
	})
})