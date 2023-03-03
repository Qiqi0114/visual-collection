export interface RootState {
    version: string;
  }
  // 登录信息
export interface AccountState {
    token?: string;
    asyncRoutes?:string[];
    id?:string,
    userAccount?:string,
    userName?:string,
    passWord?:string,
    userSex?:string,
    userEmail?:string,
    userPhone?:string,
    departmentId?:string,
    roleId?:string,
  }