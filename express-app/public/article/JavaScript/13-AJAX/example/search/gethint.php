<?php
// Fill up array with names
$a=["Anna","Brittany","Cinderella","Diana","Eva","Fiona","Gunda",
	"Hege","Inga","Johanna","Kitty","Linda","Nina","Ophelia",
	"Petunia","Amanda","Raquel","Cindy","Doris","Eve","Evita",
	"Sunniva","Tove","Unni","Violet","Liza","Elizabeth","Ellen",
	"Wenche","Vicky"];
//get the q parameter from URL
$q=$_GET["q"];
//lookup all hints from array if length of q>0
if (strlen($q) > 0){
$hint="";
for($i=0; $i<count($a); $i++){
	if (strtolower($q)==strtolower(substr($a[$i],0,strlen($q)))){
		if ($hint==""){
			$hint=$a[$i];
		}else{
			$hint=$hint." , ".$a[$i];
		}
    }
  }
}
//Set output to "no suggestion" if no hint were found
//or to the correct values
if ($hint == ""){
	$response="no suggestion";
}else{
	$response=$hint;
}
echo $response;  //output the response
?>