var btn=document.getElementById("btn");
btn.onclick=function(){
	alert("页内式使用javascript");
};
var btn1=document.getElementById("btn1");
btn1.onclick=function(){
	alert("弹窗输出");
};
var btn2=document.getElementById("btn2");
btn2.onclick=function(){
	prompt("输入弹框:");
};
var btn3=document.getElementById("btn3");
btn3.onclick=function(){
	confirm("确认弹框！");
};
var btn4=document.getElementById("btn4");
btn4.onclick=function(){
	console.log('控制台输出!');
};
var btn5=document.getElementById("btn5");
btn5.onclick=function(){
	console.warn("警告输出！");
};
var btn6=document.getElementById("btn6");
btn6.onclick=function(){
	console.error("错误输出！");
};