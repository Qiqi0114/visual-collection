import  request  from "../utils/service";
// 获取教学工作量
export function getTeachingWokingInfoList() {
    return request({
      url: 'workloadAccount/getWorkloadExcel',
      method: 'get',
    })
  }