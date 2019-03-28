// 1. 获取需要的标签
var animate1 = document.getElementById("animate1");
var animate2 = document.getElementById("animate2");
var box = document.getElementById("box6");

// 2. 定义变量
var timer = null, begin, step = 30, target1 = 459, target2 = 900;
// 3. 监听按钮的点击
animate1.onclick = function () {
    // 3.1 清除定时器
    clearInterval(timer);
	begin=box6.offsetLeft;
	var dir=target1>begin?step:-step;
    // 3.2 设置定时器
    timer = setInterval(function () {
          // 相加
         begin += dir;
         // 判断
         if(Math.abs(begin - target1)<step){
             begin = target1;
             clearInterval(timer);
         }
         // 动起来
         box6.style.marginLeft = begin + 'px';
    }, 100);
};

animate2.onclick = function () {
    // 2.1 清除定时器
    clearInterval(timer);
	begin=box6.offsetLeft;
    // 2.2 设置定时器
    /* 起始值 += (结束值 - 起始值) * 缓动系数 */
    timer = setInterval(function () {
        begin += (target2 - begin) * 0.2;

        // 判断
        if(Math.round(begin) >= target2){
            begin = target2;
            clearInterval(timer);
        }
       // 动起来
        box6.style.marginLeft = begin + 'px';
    }, 100);
};