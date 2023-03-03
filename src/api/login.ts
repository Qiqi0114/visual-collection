import { CancelToken } from 'axios';
import request from '../utils/request';
// 登录
export function loginApi(    
    param: {
        //账号
        userAccount: string;
        //密码
        passWord:string;
},
 cancelToken?: CancelToken
) {
    return request({
      url: '/login/login',
      method: 'post',
      data:param,
    })
  }
  // 登录后获取菜单列表
export function getLonginMenuApi() {
  return request({
    url: '/menuServer/menu/getLonginMenu',
    method: 'get',
  })
}
export interface ApiRes {
  msg: string;
  code: string;
}

export interface UserInfoRes extends ApiRes {
  id: string;
  userName: string;
  userAccount: string;
  passWord: string;
  userSex: string;
  userEmail:string;
  userPhone:string;
  departmentId:string;
  roleId:string;
}
  // token获取个人信息
  export function getTokenInfoApi() {
    return request({
      url: '/menuServer/menu/getToken',
      method: 'get',
    })
  }