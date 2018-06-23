var oScrollBanner = document.getElementById("scrollBanner");
var oScrollList = document.getElementById("scrollList");
var oBtn = document.getElementById("btns");
var oNums = document.getElementById("nums");
var oUl = oScrollList.children[0];
var aLi = oUl.children;
var perWidth = aLi[0].offsetWidth;
var count = 0;
aLi[0].style.opacity = 1;
oUl.style.width = aLi.length * perWidth + "px";
var aBtns = oBtn.children;
var aNums = oNums.children[0].children;
aNums[0].className = "hover";
var timer = setInterval(function(){
	move();
},3000);
			
function move(){
	count++;
	if(count == aLi.length){
		count = 0;
	}
	if(count == -1){
		count = aLi.length - 1;
	}
				
	//角标
				
	for(var j = 0; j < aNums.length; j++){
		aNums[j].className = "";
	}
	aNums[count].className = "hover";
					
	for(var i = 0; i < aLi.length; i++){
		startMove(aLi[i],{"opacity":0});
	}
	startMove(aLi[count],{"opacity":100});
}
			
aBtns[0].onclick = function(){
	count-=2;
	move();
}
			
aBtns[1].onclick = function(){
	move();
}
			
oScrollBanner.onmouseover = function(){
	clearInterval(timer);
}
oScrollBanner.onmouseout = function(){
	timer = setInterval(function(){
		move();
	},3000);
}
			
for(var j = 0; j < aNums.length; j++){
	aNums[j].index = j;
	aNums[j].onmouseover = function(){
		count = this.index-1;
		move();
	}
}