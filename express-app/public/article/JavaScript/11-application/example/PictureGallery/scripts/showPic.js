// JavaScript Document
window.onload=function(){
	//alert();
	/*Ajax('1.txt?t='+new Date().getTime(),function(str){
		alert(str);
	},function(str1,str2){
		alert(str2);
		var oNewWind=window.open();
		oNewWind.document.write(str2);
		
	});
	if(!document.getElementsByTagName||!document.getElementById)return false;*/
	creatP();
	var oA=document.getElementsByTagName("a");
	//alert(oA.length);
	for(var i=0;i<oA.length;i++){
		oA[i].onclick=function(){
			return !showPic(this);
		}
		//oA[i].setAttribute("onclick","showPic(this);return false;");//功能与上一句等价
		//alert(oA[i].onclick);
	}
	var oLiImg=document.getElementsByTagName("img");
	//alert(oLiImg.length);
	for(i=0;i<oLiImg.length-1;i++){
		oLiImg[i].onclick=function(){
			fillOut(this);
		}
	}
};
function showPic(_this){
	var oImg=document.getElementById("showP");
	oImg.setAttribute("src",_this.getAttribute("href"));
	var oText=document.getElementById("description");
	//oText.innerHTML=_this.getAttribute("title");
	oText.firstChild.nodeValue=_this.getAttribute("title");
	return true;
}

function fillOut(_this){
	var oImg=document.getElementById("showP");
	oImg.setAttribute("src",_this.getAttribute("src"));
	var oText=document.getElementById("description");
	//oText.innerHTML=_this.getAttribute("title");
	oText.firstChild.nodeValue=_this.getAttribute("title");
	return true;
}

function creatP(){
	var description=document.createElement("p");
	var dtext=document.createTextNode("this a picture.");
	description.appendChild(dtext);
	description.setAttribute("id","description");
	var oImg=document.getElementById("showP");
	insertAfter(description,oImg);
}

function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload!='function'){
		window.onload=func;
	}
	else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}
	else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}


