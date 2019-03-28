<?php
$conn=mysql_connect("localhost","root","root") or die("Fail to connect:". mysql_error());
mysql_query("drop DATABASE ajaxtest",$conn);
mysql_query("CREATE DATABASE ajaxtest ",$conn)||die("Error creating database: " . mysql_error());

mysql_select_db("ajaxtest", $conn);
//创建表
$sql = "CREATE TABLE users 
(
id int NOT NULL,
FirstName varchar(15) NOT NULL ,
LastName varchar(15) NOT NULL,
Age int,
Hometown varchar(15),
Job varchar(15),
PRIMARY KEY(id)
)";
mysql_query($sql,$conn)||die("Error creating table: " . mysql_error());
//插入数据
$sql1="INSERT INTO users VALUES ";
$sql2=$sql1."(1,'Peter ','Griffin',41,'Quahog','Brewery')";
mysql_query($sql2,$conn)||die('Error: ' . mysql_error());
$sql2=$sql1."(2,'Lois ','Griffin',40,'Newport','Piano Teacher')";
mysql_query($sql2,$conn)||die('Error: ' . mysql_error());
$sql2=$sql1."(3,'Joseph','Swanson',39,'Quahog','Police Officer')";
mysql_query($sql2,$conn)||die('Error: ' . mysql_error());
$sql2=$sql1."(4,'Glenn ','Quagmire',41,'Quahog','Pilot')";
mysql_query($sql2,$conn)||die('Error: ' . mysql_error());
echo 'Be ready!';
mysql_close($conn);