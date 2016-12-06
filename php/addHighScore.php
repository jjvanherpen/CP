<?php
    include('conn.php');
//    include('connLocal.php');   

    // set parameters from url
    $array = [$_GET['name'], $_GET['score']];

    // prepare and bind
    $stmt = $dbh->prepare("INSERT INTO highscores(name, score) VALUES (?, ?)");
    $stmt->execute($array);







