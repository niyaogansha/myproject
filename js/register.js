$(function(){
	//账号
	$("#txt").focus(function(){
		$(".ap0").css("display","block");		
		$(".ap1").css("display","none");		
		$(".ap2").css("display","none");		
		$(".ap3").css("display","none");		
	})
	$("#txt").blur(function(){
		$(".ap0").css("display","none");
		if($("#txt").val() == ""){
			$(".ap1").css({"display":"block","color":"red"});		
			$(".ap2").css("display","none");		
			$(".ap3").css("display","none");
		}else if($("#txt").val() && /^1[3|4|5|8]\d{9}$/.test($("#txt").val())){
			$(".ap3").css({"display":"block","color":"black"});		
			$(".ap2").css("display","none");		
			$(".ap1").css("display","none");
		}else{
			$(".ap2").css({"display":"block","color":"red"});		
			$(".ap1").css("display","none");		
			$(".ap3").css("display","none");
		}
	})
	//密码
	$("#psw").focus(function(){
		$(".bp0").css("display","block");
		$(".bp1").css("display","none");
		$(".bp2").css("display","none");
		$(".bp3").css("display","none");
	})
	$("#psw").blur(function(){
		$(".bp0").css("display","none");		
		//判断密码格式
		if($("#psw").val() == ""){
			$(".bp2").css({"display":"block","color":"red"});
			$(".bp1").css({"display":"none"});
			$(".bp3").css("display","none");
			
		}
		if(!isNaN($("#psw").val()) && $("#psw").val() != ""){
			$(".bp1").css({"display":"block","color":"red"});
			$(".bp2").css("display","none");
			$(".bp3").css("display","none");			
		}else{
			$(".bp3").css({"display":"block","color":"black"});
			$(".bp2").css("display","none");
			$(".bp1").css("display","none");
		}
		
	})
	//确认密码
	$("#psw2").focus(function(){
		$(".sp0").css("display","block");
		$(".sp1").css("display","none");
		$(".sp2").css("display","none");
	})
	$("#psw2").blur(function(){
		$(".sp0").css("display","none");
		//判断两次密码是否相同
		if($("#psw").val() !== $("#psw2").val()){
			$(".sp2").css({"display":"block","color":"red"});
			$(".sp1").css("display","none");
		}else{
			$(".sp1").css({"display":"block","color":"black"});
			$(".sp2").css("display","none");
		}
	})

	//验证码
	$("#txt2").focus(function(){
		$(".cp0").css("display","block");
		$(".cp1").css("display","none");
		$(".cp2").css("display","none");
		$(".cp3").css("display","none");
	})		
	//随机验证码
	$(".l2").text("2316");
		$(".l2").click(function(){					
		var str = "";
		var num =parseInt(Math.random()*10000);
		if(Number(num)<1000){
			num = str+0+num;
		}
		$(".l2").text(num);
	})
				
	//判断验证码是否正确	
	$("#txt2").blur(function(){
		$(".cp0").css("display","none");
		if($("#txt2").val() === $(".l2").text()){
			$(".cp2").css({"display":"block","color":"red"});
			$(".cp1").css("display","none");
			$(".cp3").css("display","none");
		}else if($("#txt").val() == ""){
			$(".cp3").css({"display":"block","color":"red"});
			$(".cp2").css("display","none");
			$(".cp1").css("display","none");
		}else{
			$(".cp1").css({"display":"block","color":"red"});
			$(".cp2").css("display","none");
			$(".cp3").css("display","none");
		}
	})
	
	//注册按钮
//	$("#btn").click(function(){
//		$.post("http://h6.duchengjiu.top/shop/api_user.php",{"status":"register","username":$("#txt").val(),"password":$("#psw").val()},function(data){
//			console.log(data);
//			if(data.code == 0){			
//				alert(data.message);
//				window.location.href="../html/logon.html";
//			}else{
//				alert(data.message);
//			}
//		});
//	})

	$("#btn").click(function(){
		$.get("http://datainfo.duapp.com/shopdata/userinfo.php",{status:"register",userID:$("#txt").val(),password:$("#psw").val()},function(data){
			data = JSON.parse(data);
			console.log(data);
						if(data == 0){
							alert("用户名重名");
						}else if(data==1){
							window.location.href = "../html/logon.html";
						}else{
							alert("注册失败，请重试");
						}
					})
				})
})