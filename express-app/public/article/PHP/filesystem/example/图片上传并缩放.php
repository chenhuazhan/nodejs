<?php 
include 'thumb.php';

$sfile=$_FILES['img']['tmp_name'];
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

if(move_uploaded_file($sfile,$dfile)){
	//图片缩放
	thumb($dfile,500,500);
	thumb($dfile,200,200);
	thumb($dfile,50,50);
}
 ?>
