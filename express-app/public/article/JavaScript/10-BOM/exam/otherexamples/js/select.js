// JavaScript Document
var panel=document.getElementById("panel");
var allInputs=panel.children[1].children;
var allBtns=panel.children[2].querySelectorAll("button");

allBtns[0].onclick=function(){
	for(var i=0;i<allInputs.length;i++){
		allInputs[i].checked=true;
	}
}
allBtns[1].onclick=function(){
	for(var i=0;i<allInputs.length;i++){
		allInputs[i].checked=false;
	}
}
allBtns[2].onclick=function(){
	for(var i=0;i<allInputs.length;i++){
		allInputs[i].checked=!allInputs[i].checked;
	}
}