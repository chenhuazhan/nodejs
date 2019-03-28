// JavaScript Document
/*
  jpg png gif
*/
// 1. 获取标签
 var file = document.getElementById('file');
// 2. 监听作用域的变化
file.onchange = function () {
    // 2.1 获取上传图片的路径
    var path = this.value;
    // console.log(path);

    // 2.2 截取
    var suffix = path.substr(path.lastIndexOf('.'));
    // console.log(suffix);

    // 2.3 统一转成小写
    var lower_suffix = suffix.toLowerCase();
    // console.log(lower_suffix);

    // 2.4 判断
    if(lower_suffix === '.jpg' || lower_suffix === '.png' || lower_suffix === '.jpeg' || lower_suffix === '.gif'){
        alert('上传图片正确');
    }else {
        alert('上传图片不正确');
    }
}