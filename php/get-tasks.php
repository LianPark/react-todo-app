<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

require 'db.php';

$sql = "SELECT * FROM tasks ORDER BY create_at desc";
$result = $conn->query($sql);

$tasks = array();
while($row = $result->fetch_assoc()) {
  $tasks[] = $row;
}

echo json_encode($tasks);

$conn->close();
?>
