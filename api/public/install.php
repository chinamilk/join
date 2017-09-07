<?php
/**
 * Created by PhpStorm.
 * User: NULL
 * Date: 2017/9/8
 * Time: 0:46
 */

define('DB_HOST','');
define('DB_USER','');
define('DB_PASS','');
define('DB_NAME','join');

$_sql = file_get_contents('member.sql');

$_arr = explode(';', $_sql);
$_mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS);
$_mysqli->query("USE ".DB_NAME);
if (mysqli_connect_errno()) {
    exit('连接数据库出错');
}

foreach ($_arr as $_value) {
    $_mysqli->query($_value.';');
}
$_mysqli->close();
$_mysqli = null;