// JavaScript Document
var box1=document.getElementById("box1");
var allLis=box1.children[0].children;

for(var i=0;i<allLis.length;i++){
	allLis[i].index=i+1;
	allLis[i].onclick=function(){
		document.body.style.backgroundImage="url('images/"+this.index+".jpg')";;
	}
}