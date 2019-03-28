var keyBox=document.getElementById("keybox");

document.onkeydown=function (event){
	var e=window.event||event;
	
	if(e.keyCode==37){
		keyBox.style.left=keyBox.offsetLeft-10+'px';
	}
	if(e.keyCode==39){
		keyBox.style.left=keyBox.offsetLeft+10+'px';
	}
};

var panels=document.getElementsByClassName("panel");
	
panels[0].children[0].onkeydown=function (ev){
	if(this.value==="")return false;
	var oEvent=ev||event;
	if(oEvent.keyCode==13){
		panels[0].children[2].value+=this.value+'\n';
		this.value='';
	}
};
	
panels[1].children[0].onkeydown=function (ev){
	if(this.value==="")return false;
	var oEvent=ev||event;
	if(oEvent.keyCode==13 && oEvent.ctrlKey){
		panels[1].children[2].value+=this.value+'\n';
		this.value='';
	}
};
	
	
panels[2].children[0].onkeydown=function (ev){
	if(this.value==="")return false;
	var oEvent=ev||event;
	if(oEvent.keyCode==13){
		panels[2].children[3].value+=this.value+'\n';
		this.value='';
	}
};
panels[2].children[1].onclick=function (){
	if(panels[2].children[0].value==="")return false;
	panels[2].children[3].value+=panels[2].children[0].value+'\n';
	panels[2].children[0].value='';
};
