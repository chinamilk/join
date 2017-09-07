<?php
/**
 * Created by PhpStorm.
 * User: NULL
 * Date: 2017/9/1
 * Time: 1:15
 */

namespace app\join\model;
use think\Model;

class User extends Model
{
    protected $table = 'member';

    protected $autoWriteTimestamp = true;
    protected $insert = [ 'status' => 0, ];
    protected $field = [ 'id',
        'create_time'	=>	'int',
        'update_time' => 'int',
        'shortPhoneNumber' => 'int',
        'name', 'institute', 'major', 'phoneNumber', 'email', 'QQNumber', 'WeChatNumber',
        'sex', 'campus', 'status',
        ];
}