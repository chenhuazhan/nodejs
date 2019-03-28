// JavaScript Document
var name1 = document.getElementById("name1");

// 获得焦点
name1.onfocus = function () {
	this.style.width = '600px';
	this.style.height = '40px';
	this.style.outline = 'none';
	this.style.fontSize = '20px';
	console.log(111);
	
};
// 失去焦点
name1.onblur = function () {
    this.style.border = '2px solid green';
    this.style.color = 'green';
	this.style.width = '';
	this.style.height = '';
};
