function operator(){
	var num1=document.getElementById("num1");
	var num2=document.getElementById("num2");
	var op=document.getElementById("operator");
	var outp=document.getElementById("outp");
	if(isNaN(Number(num1.value))||isNaN(Number(num2.value))){
		alert("不能运算无效数值！");
		return;
	}
	switch(op.value){
		case "+":
			outp.innerText=Number(num1.value)+Number(num2.value);
			break;
		case "-":
			outp.innerText=Number(num1.value)-Number(num2.value);
			break;
		case "*":
			outp.innerText=Number(num1.value)*Number(num2.value);
			break;
		case "/":
			outp.innerText=Number(num1.value)/Number(num2.value);
			break;
		case "%":
			outp.innerText=Number(num1.value)%Number(num2.value);
			break;
		default:
			alert("本程序暂不支持此类运算！");
	}
}