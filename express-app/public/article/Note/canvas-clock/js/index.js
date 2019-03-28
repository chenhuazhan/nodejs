window.onload=function(){
	var h3s=document.getElementsByTagName("h3");
	var asidenav=document.getElementById("asidenav");
	var h3Text="";
	var navli=null;
	for(var h3Index=0;h3Index<h3s.length;h3Index++){
		h3s[h3Index].setAttribute("id","h3"+(h3Index+1));
		navli=document.createElement("li");
		var navlia=document.createElement("a");
		
		navlia.innerText=h3s[h3Index].innerText;
		asidenav.appendChild(navli);
		navli.appendChild(navlia);
		navlia.setAttribute("href","#"+h3s[h3Index].getAttribute("id"));
		
	}
	var canvas1=document.getElementById("canvas1");
	var ctx1=canvas1.getContext("2d");
	
	//画刻度的函数
	function drawScale(count){
		ctx1.beginPath()
		for(var i=0; i<count; i++){
			ctx1.moveTo(150,150)
			ctx1.arc(150,150,100,i*2*Math.PI/count,(i+1)*2*Math.PI/count)
		}
		ctx1.stroke()
		ctx1.closePath()
	}
	//画实心圆的函数
	function drawDisk(radius,fillStyle){
		ctx1.beginPath()
		ctx1.arc(150,150,radius,0,2*Math.PI)
		ctx1.fillStyle=fillStyle
		ctx1.fill()
		ctx1.closePath()
	}
	drawDisk(100,"#ccc")	//画一个灰色的底盘
	drawScale(60)			//画60个细的刻度
	drawDisk(90,"white")	//画一个白色的圆盘盖住细刻度的多余部分
	drawScale(12)			//画12个粗的刻度
	drawDisk(80,"white")	//画一个白色的圆盘盖住粗刻度的多余部分
	drawDisk(5,"black")		//画一个黑色的小圆点作为钟表的中心
	
	var canvas2=document.getElementById("canvas2");
	var ctx2=canvas2.getContext("2d");
	
	
	//画针的函数
	function drawHand(radius,deg,lineWidth){
		ctx2.beginPath()
		ctx2.moveTo(150,150)
		ctx2.arc(150,150,radius,deg,deg)
		ctx2.lineWidth=lineWidth
		ctx2.lineCap= "round"
		ctx2.stroke()
		ctx2.closePath()
	}
	//开启定时器实时刷新钟表指针
	setInterval(function(){
		var d=new Date();
		var h=d.getHours();
		var m=d.getMinutes();
		var s=d.getSeconds();
		//console.log(h,m,s)
		ctx2.clearRect(0,0,300,300)
		drawHand(50,h*30*Math.PI/180+m*0.5*Math.PI/180-0.5*Math.PI,5)	//时针
		drawHand(68,m*6*Math.PI/180-0.5*Math.PI,3)	//分针
		drawHand(80,s*6*Math.PI/180-0.5*Math.PI,2)	//秒针
	},1000)

	for(let i = 1; i < 13; i++){
		ctx1.fillText(i+"",150+70*Math.sin(i*Math.PI/6)-4,150-70*Math.cos(i*Math.PI/6))
	}

	var canvas3=document.getElementById("canvas3");
	var ctx3=canvas3.getContext("2d");
	var canvas4=document.getElementById("canvas4");
	var ctx4=canvas4.getContext("2d");
	var clock = new Clock(ctx3,ctx4,150,150,100);
	clock.drawClock();

}




