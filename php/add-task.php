<?php
//header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");

require 'db.php';

file_put_contents('test.log', print_r($_POST, true));

$task = $_POST['task'];
$datetime = $_POST['datetime'];
if (!$task) {
  echo json_encode(array('id' => '9999', 'task' => '$task'));
  exit;
}


if ($task) {
  $stmt = $conn->prepare("INSERT INTO tasks (task, create_at) VALUES (?,?)");
  $stmt->bind_param("ss", $task, $datetime);
  $stmt->execute();
  
  $id = $stmt->insert_id;

  echo json_encode(array('id' => $id, 'task' => $task, 'create_at' => $datetime));

  $stmt->close();
}

$conn->close();
?>
