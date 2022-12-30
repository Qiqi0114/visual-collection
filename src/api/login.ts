import  request  from "../utils/request";
// 登录
export function loginApi(    
    param: {
        //账号
        userAccount: string;
        //密码
        passWord:string;
}
) {
    return request({
      url: '/login/login',
      method: 'post',
      data:param,
    })
  }