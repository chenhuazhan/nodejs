var box7=document.getElementById("box7");
var lis=box7.getElementsByTagName("li");
var imgs=box7.getElementsByTagName("img");

var loop=1;
setInterval(function(){
	if(loop==0){
		lis[17].className="";
		imgs[17].parentNode.style.display="none";
	}else{
		lis[loop-1].className="";
		imgs[loop-1].parentNode.style.display="none";
	}
	lis[loop].className="current";
	imgs[loop].parentNode.style.display="block";
	loop=(loop+1)%18;
	
},1000);