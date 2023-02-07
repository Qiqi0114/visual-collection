import request from "../utils/request";

// 获取收集表列表接口
export function getCollectionTableListList(
  param:{
    //id  1 科研  8 其他
    id:string,
    //收集表类别id
    collectionTableId:string,
    //系
    departmentId:string,
    //年限
    yearId:string,
    //状态
    staticZ:string,
    //分页参数
    pageNum:number,
    pageSize:number,
  }
) {
    return request({
      url: '/collectionTableService/collectionTable/collectionTableList',
      method: 'get',
      params:param,
    })
  }

//删除工作量收集表
export function deleteCollectionTableAPI(
  param:{
    //收集表id
    id:string,
  }
  ) {
  return request({
    url: '/collectionTableService/collectionTable',
    method: 'delete',
    params:param
  })
}

//修改工作量导入表状态
export function changedCollectionTableAPI(
    param:{
      //收集表id
      id:string,
      //收集表状态
      staticZ:string,
    }
    ) {
    return request({
      url: '/collectionTableService/collectionTable',
      method: 'put',
      params:param
    })
  }

//添加届,系,时间,类别下的工作量收集表接口
export function saveCollectionTableAPI(
    param:{
      //系id
      departmentId:string,
      //年
      numberYearId:string,
      //截至时间
      expirationTime:string,
      //收集表类型
      collectionTableId:string,
    }
    ) {
    return request({
      url: '/collectionTableService/collectionTable/saveCollectionTable',
      method: 'post',
      data:param
    })
  }
  
// 获取收集表类别接口
export function getTreeListCollection() {
    return request({
      url: '/collectionTableService/collectionTable/treeListCollection',
      method: 'get',
    })
  }

// 用户获取收集表列表接口
export function getUserCollectionTable(
  param:{
/*     //收集表类别id
    collectionTableId:string,
    //年限
    yearId:string,
    //状态
    staticZ:string, */
    //分页参数
    pageNum:number,
    pageSize:number,
  }) {
    return request({
      url: '/collectionTableService/collectionTable/userCollectionTable',
      method: 'get',
      params:param,
    })
  }
