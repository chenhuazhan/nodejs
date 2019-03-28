<?php
header('Content-Type: text/xml');
header("Cache-Control: no-cache, must-revalidate");
//A date in the past
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");

$q=$_GET["q"];

$conn = mysql_connect('localhost', 'root', 'root') or die('Could not connect: ' . mysql_error());

mysql_select_db("ajaxtest", $conn);

$sql="select * from users where id = ".$q."";

$result = mysql_query($sql);
echo '<?xml version="1.0" encoding="ISO-8859-1"?>';
echo '<person>';
while($row = mysql_fetch_array($result)){
	echo "<firstname>" . $row['FirstName'] . "</firstname>";
	echo "<lastname>" . $row['LastName'] . "</lastname>";
	echo "<age>" . $row['Age'] . "</age>";
	echo "<hometown>" . $row['Hometown'] . "</hometown>";
	echo "<job>" . $row['Job'] . "</job>";
}
echo '</person>';

mysql_close($conn);
?>