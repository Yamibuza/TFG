
<?php
// Permitir cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir los métodos que va a usar Angular
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Permitir los headers que necesita Angular (como Content-Type)
header("Access-Control-Allow-Headers: Content-Type");

// Tipo de contenido
header("Content-Type: application/json; charset=UTF-8");

// Manejar preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

?>
