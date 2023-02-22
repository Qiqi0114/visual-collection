import request from "../utils/request";

//获取教学工作量
export function workLoadListAPI(
    param:{
        //年限id
        yearId:string;
        //系id
        mentId:string;
    }
) {
  return request({
    url: '/totalService/total/workLoadList',
    method: 'get',
    params:param
  })
}
//获取教学工作量合计
export function getYearByZAPI(
    param:{
        //年限id
        yearId:string;
    }
) {
  return request({
    url: '127.0.0.1:8001/totalService/total/getYearByZ',
    method: 'get',
    params:param
  })
}
