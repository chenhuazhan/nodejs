// JavaScript Document
	//图标切换
	var logo=document.getElementById("logo");
	logo.onmouseover=function(){
		this.src="imgs/tb2.png";
	}
	logo.onmouseout = function () {
        this.src = "imgs/tb1.png";
    };
	//关闭小广告
	var close = document.getElementById("close");
    close.onclick = function () {
        this.parentNode.style.display = "none";
    }
	//图片切换
	var icon2=document.getElementById("icon2");
	var prev=document.getElementById("prev");
	var next=document.getElementById("next");
	var maxIndex = 9, minIndex = 1, currentIndex = minIndex;
	prev.onclick=function(){
		if(currentIndex === minIndex){ // 边界值
                currentIndex = maxIndex;
            }else { // 正常情况
                currentIndex --;
            }

            icon2.setAttribute("src", "imgs/icon_0" + currentIndex + ".png");

     };
     next.onclick = function () {
         if (currentIndex === maxIndex){ // 边界值
                 currentIndex = minIndex;
         }else { // 正常情况
                 currentIndex ++;
             }

         icon2.setAttribute("src", "imgs/icon_0" + currentIndex + ".png");
    };
	//显示和隐藏图片
	var btn = document.getElementById("btn");
    var img = document.getElementById("displayimg");
    btn.onclick = function () {
        if(btn.innerText === "隐藏"){
            img.style.display = "none";
            btn.innerText = "显示";
        }else {
            img.style.display = "block";
            btn.innerText = "隐藏";
        }
    }
	//相册
    var ul = document.getElementById("fj");
    var aList = ul.getElementsByTagName("a");
    var des = document.getElementById("des");
    var big_img = document.getElementById("big_img");

    for(var i=0; i<aList.length; i++){
        aList[i].onclick = function () {
            big_img.src = this.href;
            des.innerHTML = this.title;
            return false;
        }
    }
	
	//电商多图切换
	/**
     * 获取标签根据id
     * @param {string}id
     * @returns {*}
     */
    function $(id) {
        return typeof id === "string" ? document.getElementById(id) : null;
    }
	
	var box2 = $("box2");
    var allLi = box2.getElementsByTagName("li");

    for(var i=0; i<allLi.length; i++){
        var sLi = allLi[i];
        sLi.index = i+1;
        sLi.onmouseover = function () {
            box2.style.background = 'url("imgs/0'+ this.index +'big.jpg") no-repeat';
        }
    }
	//二维码的显示和隐藏
	var e_coder = document.getElementById("e_coder");
    var e_app = document.getElementById("e_app");
    e_coder.onmouseover = function () {
        this.style.background = 'url("imgs/e_coder_selected.png") no-repeat';
        e_app.style.display = "block";
    };

    e_coder.onmouseout = function () {
        this.style.background = 'url("imgs/e_coder_normal.png") no-repeat';
        e_app.style.display = "none";
    }