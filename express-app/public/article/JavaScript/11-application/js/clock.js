// 1. 获取需要的标签
var hour = document.getElementById("hour");
var min = document.getElementById("min");
var second = document.getElementById("second");

// 2.开启定时器
setInterval(function () {
     // 2.1 获取当前的时间戳
    var date = new Date();

     // 2.2 求出总毫秒数
    var millS = date.getMilliseconds();
    var s = date.getSeconds() + millS / 1000;
    var m = date.getMinutes() + s / 60;
    var h = date.getHours() % 12 + m / 60;

    // console.log(s);
    // console.log(m);
    // console.log(h);

    // 2.3 旋转
    hour.style.transform = 'rotate('+ h * 30 +'deg)';
    min.style.transform = 'rotate('+ m * 6 +'deg)';
    second.style.transform = 'rotate('+ s * 6 +'deg)';
}, 10);