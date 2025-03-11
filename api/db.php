<?php

function getDBConnection() {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "tfg_jvaybar";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    return $conn;
}

?>
