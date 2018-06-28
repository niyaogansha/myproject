$(function(){
	var st = location.search;
	var id = st.split("=")[1];
//	console.log(id)
	$.getJSON(
		"http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",
		{goodsID:id},
		function(data){
			console.log(data);
			var str = "";	
			var str3 = "";
			var str4 = "";
			var str6 = "";
			//添加大图片
			str = `<div id="midArea">
					<img src="${data[0].goodsListImg}"/>
					<div id="zoom"></div>
					</div>
					<div id="bigArea">
					<img src="${data[0].goodsListImg}"/>
					</div>`
			str2 = `<p>[支持自提]${data[0].goodsName}</p>`
			str3 = `<em>￥${data[0].price}</em>`
			str4 = `<a href = "../list.html">${data[0].className}　></a><a href = "../list.html">${data[0].goodsName}　></a>`
			str6 = `<input type="button" data-id="${data[0].goodsID}" id="btn" value="加入购物车" />
					<input type="button" id="btn2" value="查看购物车" />`
			$("#zoomBox").html(str);
			$(".top").append(str2);
			$(".an1").html(str3);
			$(".detail-top").append(str4);
			$(".de-bottom").append(str6);
//			$(".pp1").html("品牌:");
			//添加侧边小图片
			var str1 = "";			
			var arr = data[0].imgsUrl;
			arr = JSON.parse(arr);
			console.log(arr.length)
			for(var i = 0; i < arr.length; i++){
				str1 += `<img src="${arr[i]}"/>`				
			}
			$(".left-1").html(str1);
			
			//滑动小图片替换大图片
			$(".left-1").children("img").hover(function(){			
				var oImg_src = $(this)[0].src;
				var aImg = $("#midArea").children("img")[0];
				var bImg = $("#bigArea").children("img")[0];
				aImg.src=oImg_src;
				bImg.src=aImg.src;
			})
			
			
			//点击加减
			var num = 0;
			$(".m1").click(function(){
				num++;
				$(".t1").val(num);				
			})
			$(".m2").click(function(){
				if(num <= 1){
					num == 1;
				}else{
					num--;
					$(".t1").val(num);
				}			
			})
			//购物车
			$("#btn").click(function(){
				var goodsId = $(this).attr("data-id");
				$.cookie("numcook",$(".t1").val(),{expires:7,path:"/"});
				
				$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
					console.log(data);
					if(data == 0){
						$.get(
							"http://datainfo.duapp.com/shopdata/updatecar.php",
							{userID:$.cookie("username"),
							goodsID:goodsId},
							function(data){
							console.log("aa");
								
								if(data==0){
									alert("添加失败");
								}
								if(data == 1){
//									Number($(".list5 li").eq(1).find("span").val())=Number($(".t1").val());						
								}															
							})
					}else{
						for(var i=0;i<data.length;i++) {
						if(goodsId==data[i].goodsID){
							console.log(data)
							var goodsNumber = Number(data[i].number);
							goodsNumber+=Number($(".t1").val());
							$.get(
								"http://datainfo.duapp.com/shopdata/updatecar.php",
								{userID:$.cookie("username"),
								goodsID:goodsId,number:goodsNumber},
								function(data){
									
				
									if(data==0){
										alert("添加失败");
									}
									if(data == 1){
										alert("添加成功");
										Number($(".list5 li").eq(1).find("span").val())+Number($(".t1").val());						
									}
								})
						}else{
							$.get(
								"http://datainfo.duapp.com/shopdata/updatecar.php",
							{userID:$.cookie("username"),
							goodsID:goodsId,number:$(".t1").val()},
							function(data){
//							console.log("aa");								
								if(data==0){
									alert("添加失败");
								}
								if(data == 1){
									Number($(".list5 li").eq(1).find("span").val())+Number($(".t1").val());						
								}															
							})
						}
					}
					}
					
				})
				
			})
			
			$("#btn2").click(function(){
				location.href = "../html/cart.html";
			})
			
			//放大镜
		var oZoomBox = document.getElementById("zoomBox");
		var oMidArea = document.getElementById("midArea");
		var oZoom = document.getElementById("zoom");
		var oBigArea = document.getElementById("bigArea");
		var oBigImg = oBigArea.children[0];
				
		oMidArea.onmouseover = function(){
			oZoom.style.display = "block";
			oBigArea.style.display = "block";
		}
		oMidArea.onmouseout = function(){
			oZoom.style.display = "none";
			oBigArea.style.display = "none";
		}
		oMidArea.onmousemove = function(e){
			var evt = e || event;
			var _left = evt.pageX -oZoomBox.offsetLeft - oZoom.offsetWidth/2;
			var _top = evt.pageY - oZoomBox.offsetTop -oZoom.offsetHeight/2;
//				console.log(oZoomBox.offsetTop)		
					
			if(_left<=0){
				_left = 0;
			}
			if(_left >= oMidArea.offsetWidth-oZoom.offsetWidth){
				_left = oMidArea.offsetWidth-oZoom.offsetWidth;
			}
					
			if(_top<=0){
				_top = 0;
			}
//			console.log(_top)		
			if(_top>=oMidArea.offsetHeight-oZoom.offsetHeight){
				_top=oMidArea.offsetHeight-oZoom.offsetHeight;
				
			}
			oZoom.style.left = _left + "px";
			oZoom.style.top = _top + "px";
				
				//大图移动
			oBigImg.style.left = -oZoom.offsetLeft/oMidArea.offsetWidth*oBigImg.offsetWidth + "px";
			oBigImg.style.top = -oZoom.offsetTop/oMidArea.offsetHeight*oBigImg.offsetHeight + "px";
				
		}
			
		}
	)
	
								
})
