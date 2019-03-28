// JavaScript Document

// 当输入框失去焦点
var score=document.getElementById("score");
var prompt=document.getElementById("prompt");
score.onblur = function () {
    // 1. 获取输入的内容
    var value = parseFloat(score.value);

    // 2.验证
    if(isNaN(value)){ // 不是一个数
        dealStyle('输入成绩不正确', 'error', 'red');
    }else if(value >= 0 && value <= 100){ // 合法的
        dealStyle('输入成绩正确', 'right', 'lightgreen');
    }else { // 超出
        dealStyle('成绩必须在0-100之间', 'error', 'red');
    }
};

// 当输入框获得焦点
score.onfocus = function () {
    score.style.outline = 'none';
    score.value = '';
    dealStyle("请输入您的成绩!", '', 'darkgray');
};

/**
 * 处理公共的样式
 * @param {string}msg
 * @param {string}className
 * @param {string}color
 */
function dealStyle(msg, className, color) {
    prompt.innerText = msg;
    prompt.className = className;
    score.style.borderColor = color;
}
