<form action="" method="post" enctype="multipart/form-data">
	<input name="u_file[]" type="file">
	<input name="u_file[]" type="file">
	<input name="u_file[]" type="file">
	<input name="u_file[]" type="file">
	<input type="submit" value="上传" />
</form>
<?php
if(!empty($_FILES['u_file']['name'])){
	$file_name = $_FILES['u_file']['name'];
	$file_tmp_name = $_FILES['u_file']['tmp_name'];
	for($i = 0; $i < count($file_name); $i++){
		if($file_name[$i] != ''){
			move_uploaded_file($file_tmp_name[$i],$i.$file_name[$i]);
			echo '文件'.$file_name[$i].'上传成功。更名为'.$i.$file_name[$i].'<br>';
		}
	}
}
?>