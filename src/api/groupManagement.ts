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


//添加用户组
export function addGroupAPI(
  param: {
    //用户组名称
    groupName:string,
  }) {
  return request({
    url: '/UserGroupService/UserGroup/saveGroup',
    method: 'post',
    data:param
  })
}


//用户组添加用户
export function addUserGroupAPI(
    param: {
      //用户组id
      id:string,
      //用户id
      userId:string[],
    }) {
    return request({
      url: '/UserGroupService/UserGroup/saveUserGroup',
      method: 'post',
      data:param
    })
  }

//用户组删除用户
export function deleteUserGroupAPI(
    param: {
        id:string,
        userId:string[],
    }) {
    return request({
      url: '/UserGroupService/UserGroup/saveUserGroup',
      method: 'delete',
      data:param
    })
  }