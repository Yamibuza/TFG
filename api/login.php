<?php
session_start();

include 'cors.php';
include 'db.php';

// Decodificamos los datos recibidos del formulario login del front en formato json
$data = json_decode(file_get_contents("php://input"));

// Validamos que se hayan enviado datos
if (!isset($data->username) || !isset($data->password)) {
  echo json_encode(["success" => false, "message" => "Faltan datos"]);
  exit();
}

// nos conectamos a la BBDD con la funcion getDBConnection() que tenemos en db.php (archivo que incluimos en login.php)
$conn = getDBConnection();
$username = $data->username;
$password = $data->password;

// Realizamos la consulta sql para validar el usuario recibido
$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// Si no recibimos resultado de la consulta
if (!$user) {

  echo json_encode(["success" => false, "message" => "El usuario introducido no existe"]);

// Si recibimos de la consulta un usuario pero la contraseña no coincide con la de éste
} else if ($user['password'] !== $password) {

  echo json_encode(["success" => false, "message" => "Contraseña incorrecta, inténtelo de nuevo"]);

// En caso de que el usuario y su contraseña sean correctos
} else {

  // Almacenamos sus datos en variables de sesión
  $_SESSION['user_id'] = $user['id'];
  $_SESSION['username'] = $user['username'];
  $_SESSION['email'] = $user['email'];
  $_SESSION['rol'] = $user['rol'];

  // Devolvemos al back un mensaje positivo y el objeto usuario con el que se ha iniciado sesión con todas sus propiedadews
  echo json_encode([
    "success" => true,
    "message" => "Inicio de sesión exitoso",
    "user" => [
      "id" => $user['id'],
      "username" => $user['username'],
      "email" => $user['email'],
      "rol" => $user['rol'],
    ]
  ]);
}

$conn->close();

?>
