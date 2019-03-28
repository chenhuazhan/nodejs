var box3=$("box3");

var futureDate=new Date("2019/06/25 00:00:00");
var futureTime=futureDate.getTime();
setInterval(function(){
	var currentDate=new Date();
	var currentTime=currentDate.getTime();
	var subTime=parseInt((futureTime-currentTime)/1000);
	var d=size(parseInt(subTime/(60*60*24)));
	var h=size(parseInt(subTime/(60*60)%24));
	var m=size(parseInt(subTime/60%60));
	var s=size(parseInt(subTime%60));
	
	var text="距离毕业还有："+d+"天"+h+"小时"+m+"分钟"+s+"秒";
	box3.innerText=text;
	
},1000);

function size(num) {
    return num >= 10 ? ''+num : '0' + num;
}