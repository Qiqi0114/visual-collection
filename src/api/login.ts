import { CancelToken } from 'axios';
import  request  from "../utils/service";
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