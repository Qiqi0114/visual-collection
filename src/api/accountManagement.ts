import request from "../utils/request"

//获取账号管理信息列表
export function AccountManagementAPI(
  param: {
    //分页参数
    pageNum:number,
    pageSize:number,
    //用户名称
    userName:string,
  }) {
  return request({
    url: '/userService/user/getUserPageList',
    method: 'post',
    data:param
  })
}
//根据id查询账号信息
export function getUserManagementByIdAPI(
  param: {
    //用户id
    id:string,
  }) {
  return request({
    url: '/userService/user/getUserById',
    method: 'get',
    params:param
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
    user_account:string,
    //性别
    userSex:string,
    //电话
    userPhone:string,
    //邮箱
    userEmail:string,
    //系
    departmentId:string,
  }) {
  return request({
    url: '/userService/user/',
    method: 'put',
    data:param
  })
}

//获取系列表
export function DepartmentListAPI() {
  return request({
    url: '/userService/user/departmentList',
    method: 'get',
  })
}

//重置密码
export function PasswordResetAPI(
    param: {
      //用户id
      id:string,
    }) {
    return request({
      url: '/userService/user/passWordCZ',
      method: 'get',
      params:param
    })
}


//删除用户
export function deleteUserManagementAPI(
  param: any
  ) {
  return request({
    url: '/userService/user/',
    method: 'delete',
    params:param
  })
}
//添加用户
export function addUserManagementAPI(
  param: {
    //用户名称
    userName:string,
    //用户账号
    userAccount:string,
    //性别
    userSex:string,
    //电话
    userPhone:string,
    //邮箱
    userEmail:string,
    //系
    departmentId:string,
  }) {
  return request({
    url: '/userService/user/',
    method: 'post',
    params:param
  })
}
