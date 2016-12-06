<?php
$dsn = 'mysql:host=localhost;dbname=duckhunt';
$username = 'duckhunt';
$password = 'LYmjDNjy3KvdrEc8d3MR';
$options = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
);

$dbh = new PDO($dsn, $username, $password);
