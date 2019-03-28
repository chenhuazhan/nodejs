<?php 
//文件下载

$file=$_GET['file'];

$downfile='img/'.$file;

$filesize=filesize($downfile);

header('content-type:application/octet-stream');

header("content-disposition:attachment;filename={$file}");

header("content-length:{$filesize}");

readfile($downfile);

 ?>