// JavaScript Document
var comment=document.getElementById("comment");
var txt=comment.querySelector("textarea");
var btn1=document.getElementById("btn1");
var content=document.getElementById("content");


btn1.onclick=function(){
	var text=txt.value;
	if(text.length === 0){
        alert("请输入评论的内容~");
        return;
    }
	
	var li=document.createElement("li");
	var liContent=text+"<button>删除</button>"
	li.innerHTML=liContent;
	content.insertBefore(li,content.children[0]);
	txt.value="";
	var btn=li.querySelector("button");
	btn.onclick=function(){
		btn.parentNode.remove();
	}
	
}