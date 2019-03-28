// 1. 获取标签
var box4 = document.getElementById("box4");
var pic = document.getElementById("pic");
var to_top = document.getElementById("to_top");
var to_bottom = document.getElementById("to_bottom");

var timer = null, num = 0;

// 2. 监听鼠标事件
to_top.onmouseover = function () {
    // 2.1 清除定时器
    clearInterval(timer);

    // 2.2 设置定时器
    timer = setInterval(function () {
         // 步长
         num -= 10;

         // 判断
         if(num >= -2466){
             pic.style.top = num + 'px';
         }else {
             clearInterval(timer);
         }
    }, 20);
};
to_bottom.onmouseover = function () {
    // 2.1 清除定时器
    clearInterval(timer);

    // 2.2 设置定时器
    timer = setInterval(function () {
        // 步长
        num += 10;

        // 判断
        if(num <= 0){
            pic.style.top = num + 'px';
        }else {
            clearInterval(timer);
        }
    }, 20);
};
box4.onmouseout = function () {
    // 清除定时器
    clearInterval(timer);
}