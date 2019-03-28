// JavaScript Document
var definedmenu=document.getElementById("definedmenu");
definedmenu.onclick=function(){
	window.location="https://www.baidu.com";
}


document.getElementById("changemenu").oncontextmenu=function(event){
	var e=event||window.event;
	definedmenu.style.display="block";
	definedmenu.style.left=e.clientX+"px";
	definedmenu.style.top=e.clientY+"px";
	return false;
}

document.onclick=function(){
	definedmenu.style.display="none";
}

document.getElementById("noBubble1").onclick=function(event){
	alert(this.style.background);
};
document.getElementById("noBubble2").onclick=cB;
document.getElementById("noBubble3").onclick=cB;
function cB(event){
	if(event && event.stopPropagation){ // w3c标准
        event.stopPropagation();
    }else{ // IE系列 IE 678
       	event.cancelBubble = true;
    }
	alert(this.style.background);
}