
<?php
include 'cors.php';
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['username'])) {
  http_response_code(400);
  echo json_encode(["error" => "Datos inválidos"]);
  exit();
}

$conn = getDBConnection();

$username = $data['username'];
$email = $data['email'];
$rol = $data['rol'];
$usernameOriginal = $data['usernameOriginal'];


if (!empty($data['password'])) {

  $password = $data['password'];
  $stmt = $conn->prepare("UPDATE users SET username = ?, password = ?, email = ?, rol = ? WHERE username = ?");
  $stmt->bind_param("sssss", $username, $password, $email, $rol, $usernameOriginal);

} else {

  $stmt = $conn->prepare("UPDATE users SET username = ?, rol = ?, email = ? WHERE username = ?");
  $stmt->bind_param("ssss", $username, $rol, $email, $usernameOriginal);
}

if ($stmt->execute()) {
  echo json_encode(["status" => "ok"]);
} else {
  echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
