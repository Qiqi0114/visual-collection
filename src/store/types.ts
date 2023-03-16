export interface RootState {
    version: string;
  }
  // 登录信息
export interface AccountState {
    token?: string;
    asyncRoutes?:string | null;
    id?:string| null,
    userAccount?:string| null,
    userName?:string| null,
    passWord?:string| null,
    userSex?:string| null,
    userEmail?:string| null,
    userPhone?:string| null,
    departmentId?:string| null,
    roleId?:string| null,
  }