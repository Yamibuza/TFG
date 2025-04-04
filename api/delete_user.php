<?php
include 'cors.php';
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['username'])) {
  http_response_code(400);
  echo json_encode(["error" => "Username no proporcionado"]);
  exit();
}

$conn = getDBConnection();
$username = $data['username'];

$stmt = $conn->prepare("DELETE FROM users WHERE username = ?");
$stmt->bind_param("s", $username);

if ($stmt->execute()) {
  echo json_encode(["status" => "ok"]);
} else {
  echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
