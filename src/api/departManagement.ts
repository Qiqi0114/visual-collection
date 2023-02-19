import request from "../utils/request"

//系列表
export function getDepartmentListAPI() {
  return request({
    url: '/userService/user/departmentList',
    method: 'get',
  })
}


//添加系
export function addDepartmentAPI(
  param: {
    //系名称
    departmentName:string,
  }) {
  return request({
    url: '/userService/user/addDepartment',
    method: 'post',
    data:param
  })
}

//系下用户列表
export function getDepartmentUserListAPI(
  param: {
    //系id
    id:string,
  }) {
  return request({
    url: '/userService/user/departmentUserList',
    method: 'get',
    params:param
  })
}

//系下添加用户
export function addUserDepartmentAPI(
    param: {
      //系id
      departmentId:string,
      //用户id
      userIdList:string[],
    }) {
    return request({
      url: '/userService/user/addUserDepartment',
      method: 'post',
      data:param
    })
  }

//删除系
export function delDepartmentAPI(
  param: {
      id:string,
  }) {
  return request({
    url: '/userService/user/delDepartment',
    method: 'delete',
    params:param
  })
}
