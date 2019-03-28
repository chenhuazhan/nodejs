<?php
$q=$_GET["q"];

$conn = mysql_connect('localhost', 'root', 'root') or die('Could not connnect: ' . mysql_error());
mysql_select_db("ajaxtest", $conn);

$sql="SELECT * FROM users WHERE id = '".$q."'";

$result = mysql_query($sql);
echo "<table border='1'>
<tr><th>Firstname</th><th>Lastname</th><th>Age</th><th>Hometown</th><th>Job</th></tr>";
while($row = mysql_fetch_array($result)){
	echo "<tr>";
	echo "<td>" . $row['FirstName'] . "</td>";
	echo "<td>" . $row['LastName'] . "</td>";
	echo "<td>" . $row['Age'] . "</td>";
	echo "<td>" . $row['Hometown'] . "</td>";
	echo "<td>" . $row['Job'] . "</td>";
	echo "</tr>";
}echo "</table>";

mysql_close($conn);
?>