<?php

namespace app\join\controller;

use app\join\model\User as Users;
use think\Controller;
use think\Request;

class User extends Controller
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        $list = Users::all();
        return json($list);
    }

    /**
     * 保存新建的资源
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function save(Request $request)
    {
        $data = $request->param();

        if(!$data)
            abort('400',"INVALID REQUEST");

        $result = Users::create($data);
       
        if(!$result)
            abort('400',"INVALID REQUEST");
            
        return  json($result);
    }

    /**
     * 显示指定的资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function read($id)
    {
        $data = Users::where('id', $id) -> find();
        if($data)
            return json($data);
        else
            abort('404',"用户不存在");
    }

    /**
     * 保存更新的资源
     *
     * @param  \think\Request  $request
     * @param  int  $id
     * @return \think\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->param();
        if(!$data)
            abort('400',"操作幂等");
        $data = Users::where('id', $id) -> find();
            if(!$data)
                abort('404',"用户不存在");

        $result = Users::update($data, ['id' => $id]);
        return json($result);
    }

    /**
     * 删除指定资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function delete($id)
    {
        $data = Users::where('id', $id) -> find();
        if(!$data)
            abort('404',"用户不存在");

        $result = Users::destroy(['id' => $id]);
        return json($result);
    }
}
