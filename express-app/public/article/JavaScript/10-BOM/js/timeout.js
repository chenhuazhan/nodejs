var eat = document.getElementById("eat");
var canceleat = document.getElementById("canceleat");
var timer = null;

// 2. 监听按钮的点击
eat.onclick = function () {

    clearTimeout(timer);

   // 一次定时器
   timer = setTimeout(function () {
       alert('请你去吃饭');
   }, 2000);
};

canceleat.onclick = function () {
    clearTimeout(timer);
}