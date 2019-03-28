// JavaScript Document
// 1. 获取需要的标签
var topBtns = document.getElementById("top").children;
var bottom = document.getElementById("bottom");

// 2.监听按钮的点击
topBtns[0].onclick = function () {
    j_flex(3, bottom);
};

topBtns[1].onclick = function () {
    j_flex(4, bottom);
};

topBtns[2].onclick = function () {
    j_flex(5, bottom);
};

function j_flex(allCols, parentNode) {
    // 2.1 定义变量
    var boxW = 220, boxH = 360, marginXY = 15;

    // 2.2 遍历
    for(var i=0; i<parentNode.children.length; i++){
        // 2.2.1 求出当前盒子所在的行和列
        var row = parseInt(i / allCols);
        var col = parseInt(i % allCols);
        // console.log("当前盒子在第" + row  + " ,第" + col);

        // 2.2.2 盒子的定位
        var currentBox = parentNode.children[i];
        currentBox.style.position = 'absolute';
        currentBox.style.left = col * (boxW + marginXY) + 'px';
        currentBox.style.top = row * (boxH + marginXY) + 'px';
    }
}