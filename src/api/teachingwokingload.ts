import request from "../utils/request";

// 获取教学工作量
export function getTeachingWokingInfoList(
  param:{
    pageNum:number,
    pageSize:number,
    //名称
    userName:string,
    //系
    xId:string,
    //年
    yId:string,
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
  param:{
    //系
    xId:string,
    //年
    yId:string,
  }) {
  return request({
    url: '/workloadService/workload/deleteworkloadList?xId=1&yId=1',
    method: 'delete',
    params:param
  })
}