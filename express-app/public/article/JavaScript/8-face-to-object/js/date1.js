// 1.创建日期对象
var date = new Date();

var y = date.getFullYear();
var m = date.getMonth() + 1;
var d = date.getDate();
var week = date.getDay();

var weeks = ['星期日','星期一' ,'星期二','星期三','星期四','星期五','星期六'];

// 2. 赋值
$('box_top').innerText = y + '年' + m + '月' + d + '日  ' + weeks[week];
$('box_bottom').innerText = d;

 