var timer=null;

var interval=$("interval");
var btns=interval.getElementsByTagName("button");

btns[0].onclick=function(){
	clearInterval(timer);
	var colors=["red","yellow","blue"];
	var i=0;
	timer=setInterval(function(){
		interval.style.backgroundColor=colors[i++%3];
	},1000);
};
btns[1].onclick=function(){
	clearInterval(timer);
	interval.style.backgroundColor="";
};

