<?php
    include('conn.php');
//    include('connLocal.php');

    $sth = $dbh->prepare(/** @lang text */
        "SELECT * FROM highscores ORDER BY score DESC LIMIT 10");
    $sth->execute();

    /* Fetch all of the remaining rows in the result set */
    $result = $sth->fetchAll();
    echo json_encode($result);
