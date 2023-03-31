import request from "../utils/request"

//用户分页查询
export function getGroupListPageAPI(
  param: {
    //分页参数
    pageNum:number,
    pageSize:number,
    //用户组名称
    groupName:string,
  }) {
  return request({
    url: '/UserGroupService/UserGroup/getGroupListPage',
    method: 'get',
    params:param
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

//用户组下用户列表
export function getGroupByListAPI(
  param: {
    //用户组id
    id:string,
  }) {
  return request({
    url: '/UserGroupService/UserGroup/getGroupByList',
    method: 'get',
    params:param
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

//删除用户组
export function deleteGroupAPI(
  param: {
      id:string,
  }) {
  return request({
    url: '/UserGroupService/UserGroup/deleteUserGroupGp',
    method: 'delete',
    params:param
  })
}

//用户组删除用户
export function deleteUserGroupAPI(
    param: {
        id:string,
        userId:string[],
    }) {
    return request({
      url: '/UserGroupService/UserGroup/deleteUserGroup',
      method: 'delete',
      data:param
    })
  }