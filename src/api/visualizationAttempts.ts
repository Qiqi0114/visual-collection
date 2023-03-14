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
    url: '/totalService/total/getYearByZ',
    method: 'get',
    params:param
  })
}

//获取科研其他工作量
export function getScientificResearchOtherUserAPI(
  param:{
      //年限id
      yearId:string;
      //系id
      demtId:string;
  }
) {
return request({
  url: '/totalService/total/getScientificResearchOtherUser',
  method: 'get',
  params:param
})
}
//获取科研其他工作量合计
export function getScientificResearchOtherIntegralAPI(
  param:{
      //年限id
      yearId:string;
      //类别id
      cParentId:string;
  }
) {
return request({
  url: '/totalService/total/getScientificResearchOtherIntegral',
  method: 'get',
  params:param
})
}