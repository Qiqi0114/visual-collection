import request from "../utils/request"

//获取账号管理信息列表
export function AccountManagementAPI(
  param: {
    //分页参数
    pageNum:number,
    pageSize:number,
    //用户名称
    userName:string,
    //用户账号
    userAccount:string
  }) {
  return request({
    url: '/userService/getUserPageList',
    method: 'post',
    data:param
  })
}
//根据id查询账号信息
export function getUserManagementAPI(
  param: {
    //用户id
    id:string,
  }) {
  return request({
    url: '/userService/'+ param.id,
    method: 'get',
  })
}
//修改用户信息
export function updateUserManagementAPI(
  param: {
    //用户id
    id:string,
    //用户名称
    userName:string,
    //用户账号
    userAccount:string,
    //电话
    userPhone:string,
    //邮箱
    userEmail:string,
    //用户状态
    userStatic:boolean,
  }) {
  return request({
    url: '/user_service/server/user',
    method: 'put',
    data:param
  })
}
//修改密码
export function PasswordResetAPI(
    param: {
      //用户id
      id:string,
    }) {
    return request({
      url: '/userService/passwordReset',
      method: 'put',
      data:param
    })
  }
//删除用户
export function deleteUserManagementAPI(
  param: any
  ) {
  return request({
    url: '/user_service/server/user/',
    method: 'delete',
    params:param
  })
}
//添加用户
export function addUserManagementAPI(
  param: {
    //用户名称
    userName:string,
    //性别
    userSex:string,
    //电话
    userPhone:string,
    //邮箱
    userEmail:string,
    //用户状态
    userStatic:boolean,
  }) {
  return request({
    url: '/user_service/server/user/',
    method: 'post',
    params:param
  })
}
