// 1. 获取需要的标签
var t_mallnav = $("t_mallnav");
var t_mall = t_mallnav.children[0];
var ul = t_mallnav.children[1];
var allLis = ul.children;

// 记录鼠标点击的位置
var beginX = 0;

// 2. 遍历
for(var i=0; i<allLis.length; i++){
    var li = allLis[i];

    // 2.1 监听鼠标进入
    li.onmouseover = function () {
        end = this.offsetLeft;
    };

    // 2.2 监听鼠标按下事件
    li.onmousedown = function () {
        beginX = this.offsetLeft;
    };

    // 2.2 监听鼠标离开事件
    li.onmouseout = function () {
        end = beginX;
    }
}

// 3.缓动动画
var begin = 0, end =0;
setInterval(function () {
    begin = begin + (end - begin) * 0.1;
    t_mall.style.left = begin + "px";
}, 10);