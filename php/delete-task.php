<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");


require 'db.php';

$id = $_POST['id'];

if ($id) {
  $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
  $stmt->bind_param("i", $id);
  $stmt->execute();

  echo json_encode(array('id' => $id));

  $stmt->close();
}

$conn->close();
?>
