function scroll() {
	if(window.pageYOffset !== null){//ie9+ 最新的浏览器
	    return {
	        top: window.pageYOffset,
	        left: window.pageXOffset
	    }
	}else if(document.compatMode === "CSS1Compat"){ // W3C
	    return {
	        top: document.documentElement.scrollTop,
	        left: document.documentElement.scrollLeft
	    }
	}
	return {
		top: document.body.scrollTop,
	   	left: document.body.scrollLeft
	}
}

function client() {
   	if(window.innerWidth){ // ie9+ 最新的浏览器
   	    return {
   	        width: window.innerWidth,
   	        height: window.innerHeight
   	    }
   	}else if(document.compatMode === "CSS1Compat"){ // W3C
   	    return {
   	        width: document.documentElement.clientWidth,
   	        height: document.documentElement.clientHeight
   	    }
   	}

   	return {
   	    width: document.body.clientWidth,
   	    height: document.body.clientHeight
	}
}
window.onload=function(){
	var h3s=document.getElementsByTagName("h3");
	var asidenav=document.getElementById("asidenav");
	var h3Text="";
	var navli=null;
	for(var h3Index=0;h3Index<h3s.length;h3Index++){
		h3s[h3Index].setAttribute("id","h3"+(h3Index+1));
		navli=document.createElement("li");
		navlia=document.createElement("a");
		
		navlia.innerText=h3s[h3Index].innerText;
		asidenav.appendChild(navli);
		navli.appendChild(navlia);
		navlia.setAttribute("href","#"+h3s[h3Index].getAttribute("id"));
		
	}
	
}




