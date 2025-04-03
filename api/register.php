<?php

include 'cors.php';
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !is_array($data)) {
  http_response_code(400);
  echo json_encode(["error" => "Entrada inválida. Se esperaba un array de usuarios."]);
  exit();
}

$conn = getDBConnection();
$response = [];

foreach ($data as $usuario) {

  $username = $usuario['username'];
  $email = $usuario['email'];
  $password = $usuario['password'];
  $rol = $usuario['rol'];

  $stmt = $conn->prepare("INSERT INTO users (username, email, password, rol) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("ssss", $username, $email, $password, $rol);

  if ($stmt->execute()) {
    $response[] = ["email" => $email, "status" => "ok"];
  } else {
    $response[] = ["email" => $email, "status" => "error", "message" => $stmt->error];
  }

  $stmt->close();
}

echo json_encode($response);
$conn->close();
?>
