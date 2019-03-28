function max(){
    // 1.定义3个变量, 接收用户输入的值
    var num1, num2, num3, max;
    // 2.利用prompt()接收用户输入的值
    num1 = Number(prompt('请输入第一个数:'));
    num2 = Number(prompt('请输入第二个数:'));
    num3 = Number(prompt('请输入第三个数:'));
	if(isNaN(num1)||isNaN(num2)||isNaN(num3)){
		alert("您输入了一个无效数字，请重新开始");
		return;
	}
    // 3. 定义变量保存最大值
    var max;
    // 4. 利用三目运算符进行两两比较
    max = (num1 > num2 ? num1 : num2) > num3 ? (num1 > num2 ? num1 : num2) : num3;
    // 5. 输出结果
    alert('最大值为'+max);
}