import request from "../utils/request";

// 获取教学工作量
export function getTeachingWokingInfoList(
  param:{
    pageNum:number,
    pageSize:number,
    //名称
    userName:string,
    //系
    departmentId:string,
    //年
    yearId:string,
  }
) {
    return request({
      url: '/workloadService/workload/workloadList',
      method: 'post',
      data:param,
    })
  }

//删除用户
export function deleteUserWokingAPI(
  param:{
    //用户id
    id:string,
  }
  ) {
  return request({
    url: '/workloadService/workload/deleteworkload',
    method: 'delete',
    params:param
  })
}

//批量删除当前所在年限下的 所在系下的所有工作量
export function deleteXYWokingAPI(
  param:any) {
  return request({
    url: '/workloadService/workload/deleteworkloadList',
    method: 'delete',
    params:param
  })
}
//导入excel
export function importWorkloadAPI(
  param:any) {
  return request({
    url: '/workloadService/workload/importWorkload',
    method: 'post',
    headers:{'Content-type': 'multipart/form-data'},
    data:param,
  })
}


//获取年限列表
export function getYearListAPI() {
  return request({
    url: '/workloadService/workload/getYearList',
    method: 'get',
  })
}
