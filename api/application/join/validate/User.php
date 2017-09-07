<?php
/**
 * Created by PhpStorm.
 * User: NULL
 * Date: 2017/9/8
 * Time: 0:21
 */

namespace app\join\validate;

use think\Validate;

class User extends Validate
{
    //验证规则
    protected $rule = [
        'id' => 'require|min:12|max:12',
        'name' => 'require|chs',
        'sex' => 'require',
        'campus' => 'require',
        'institute' => 'require|chs',
        'major' => 'require',
        'phoneNumber' => 'require',
        'email' => 'require|email',
        'shortPhoneNumber' => 'number',
        'QQNumber' => 'alphaDash',
        'WeChatNumber' => 'alphaDash',
        'isStaff' => 'boolean',
    ];
}