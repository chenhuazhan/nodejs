<?php 
header("content-type:text/html;charset:utf-8;");
$sfile=$_FILES['img']['tmp_name'];#上传的文件临时存放路径
$uploaddir='uploads';
$filesize=$_FILES['img']['size'];

//创建上传日期目录
$year=date('Y');
$month=date('m');
$day=date('d');
$datedir=$uploaddir.'/'.$year.'-'.$month.'-'.$day;
if(!file_exists($datedir)){
	mkdir($datedir);
}

// 获取文件后缀
$farr=explode('.',$_FILES['img']['name']);
$fext=array_pop($farr);

//加工文件名
$frand=time().mt_rand();

//最终上传路径和文件名
$dfile=$datedir.'/'.$frand.'.'.$fext;


//限制文件上传大小(1M)
$sizes=1*1024*1024;

//限制文件上传类型
$allows=array('jpg','png','gif');

//文件上传移动操作
if(in_array($fext,$allows)){
	if($filesize<=$sizes){
		move_uploaded_file($sfile,$dfile);
	}else{
		echo "<script>alert('文件大小超过1M!')</script>";
	}
}else{
	echo "<script>alert('文件类型不允许，只允许上传png|jpg|gif!')</script>";
}
 ?>
