<?php
include 'cors.php';
include 'db.php';

$conn = getDBConnection();

$sql = "SELECT username, email, rol FROM users";
$result = $conn->query($sql);

$usuarios = [];

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $usuarios[] = $row;
  }
}

echo json_encode($usuarios);

$conn->close();
?>
