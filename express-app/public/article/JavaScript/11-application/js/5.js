// 1. 获取标签
var begin = document.getElementById("begin");
var end = document.getElementById("end");
var name1 = document.getElementById("name1");

// 2. 定义变量
var timer = null;
var nameArr = ["牛一","柳儿", "张三", "李四", "王五", "物流", "林奇", "羊吧"];
name.innerText = nameArr[0];

// 3. 监听点击
begin.onclick = function () {
    // 3.1 清除定时器
    clearInterval(timer);
	
    // 3.2 设置定时器
    timer = setInterval(function () {
        // 3.3 随机数
        var s_index = parseInt(Math.random() * nameArr.length);
        var s_name = nameArr[s_index];
        name1.innerText = s_name;
    }, 20);
};

end.onclick = function () {
     clearInterval(timer);
}