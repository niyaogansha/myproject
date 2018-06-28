//$(function(){
//			$("#btn").click(function(){
//				$.post("http://h6.duchengjiu.top/shop/api_user.php",{"status":"login","username":$("#txt").val(),"password":$("#psw").val()},function(data){
//					console.log(data);
//					if(data.code==0){
//						alert(data.message);
//						window.location.href="../index.html";
//					}else{
//						alert(data.message);
//						$.cookie("username",data.userID,{expires:7,path:"/"});
//					}
//				});
//				
//			});
//			
//		});
			$(function(){
				$("#btn").click(function(){
					$.get("http://datainfo.duapp.com/shopdata/userinfo.php",{status:"login",userID:$("#txt").val(),password:$("#psw").val()},function(data){
						data = JSON.parse(data);
						console.log(data);
						if(data == 0){
							alert("用户名不存在");
						}else if(data==2){
							alert("用户名或者密码错误")
						}else{
							$.cookie("username",data.userID,{expires:7,path:"/"});
							location.href = "../index.html";
						}
					})
				})

			})