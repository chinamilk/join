<?php
/**
 * Created by PhpStorm.
 * User: NULL
 * Date: 2017/9/2
 * Time: 0:33
 */
use think\Request;
namespace app\join\exception;

use think\exception\Handle;
use think\exception\HttpException;


class Http extends Handle
{
    public function render(\Exception $e) {
        if ($e instanceof HttpException) {
            $statusCode	= $e->getStatusCode();
        }
        if (!isset($statusCode)) {
            $statusCode	= 500;
        }
        $result = ['code' => $statusCode,
            'msg' => $e->getMessage(),
            'time' => $_SERVER['REQUEST_TIME'],
            'client_ip' => request()->ip()
            ];
        return json($result, $statusCode);
    }

}