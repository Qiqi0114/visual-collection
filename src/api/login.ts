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