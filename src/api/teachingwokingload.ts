import request from "../utils/request";

// 获取教学工作量
export function getTeachingWokingInfoList(
  param:{
    pageNum:number,
    pageSize:number,
    userName:string,
    xId:string,
    yId:string,
  }
) {
    return request({
      url: '/workloadService/workload/workloadList',
      method: 'post',
      params:param,
    })
  }