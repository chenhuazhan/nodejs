var btn1=document.getElementById("btn1");
var d=document.body||document.documentElement;
var textString="Maked by chenhuazhan.";
btn1.onclick=function(event){
	var e=event||window.event;
	
	if(btn1.innerText=="开启鼠标跟随效果"){
		btn1.innerText="关闭鼠标跟随效果";
		var mouseDivs=[];
		for(var textStringIndex=0;textStringIndex<textString.length;textStringIndex++){
			var mouseDiv=document.createElement("div");
			d.appendChild(mouseDiv);
			mouseDiv.innerText=textString[textStringIndex];
			mouseDiv.className="mouseDiv";
			mouseDiv.style.left=(e.clientX+15*textStringIndex+40)+"px";
			mouseDiv.style.top=(e.clientY+40)+"px";
			mouseDivs[textStringIndex]=mouseDiv;
		}
		
		d.onmousemove=function(e){
			for(var textStringIndex=textString.length-1;textStringIndex>0;textStringIndex--){
					
				mouseDivs[textStringIndex].style.left=mouseDivs[textStringIndex-1].offsetLeft+20+"px";
				mouseDivs[textStringIndex].style.top=mouseDivs[textStringIndex-1].offsetTop+"px";
			}
			mouseDivs[0].style.left=(e.clientX+15*textStringIndex+40)+"px";
			mouseDivs[0].style.top=(e.clientY+40)+"px";
		};
	}else{
		btn1.innerText="开启鼠标跟随效果";
		var mouseDivs=document.getElementsByClassName("mouseDiv");
		while(mouseDivs.length>0){
			mouseDivs[0].remove();
			
		}
	}
	
	
	
};