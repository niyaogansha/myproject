$(function(){
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",function(data){
		console.log(data);
		var str = "";
		console.log(data[0].goodsID)
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
		
//		for(var i = 5; i < 10; i++){
//			str5 += `<li data-id="${data[i].goodsId}">
//					 <a href="">
//					 <img src="${data[i].goodsListImg}"/>									
//					 </a>
//					 <a href="" class="aq1">${data[i].goodsName}</a>
//					 <p>￥${data[i].price}</p>
//					 </li>`;
//		}
//		$(".list-le-bottom ul").html(str5);
	})
})
