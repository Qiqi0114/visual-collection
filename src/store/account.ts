import { CancelToken } from 'axios';
import {AccountState, RootState} from "./types";
import {Module} from "vueX";
import { getLonginMenuApi, getTokenInfoApi, loginApi, UserInfoRes } from '../api/login';
import { getToken, setToken } from '../lib/util';
import { ElMessage } from 'element-plus';
import router, { resetRouter } from '../router';
const menu: Module<AccountState, RootState> = {
    state: {
        token: getToken(),
        asyncRoutes:JSON.parse(sessionStorage.getItem("SESSION_ROUTES")),
        id:JSON.parse(sessionStorage.getItem("id")),
        userAccount:JSON.parse(sessionStorage.getItem("userAccount")),
        userName:JSON.parse(sessionStorage.getItem("userName")),
        passWord:JSON.parse(sessionStorage.getItem("passWord")),
        userSex:JSON.parse(sessionStorage.getItem("userSex")),
        userEmail:JSON.parse(sessionStorage.getItem("userEmail")),
        userPhone:JSON.parse(sessionStorage.getItem("userPhone")),
        departmentId:JSON.parse(sessionStorage.getItem("departmentId")),
        roleId:JSON.parse(sessionStorage.getItem("roleId")),
    },
    getters: {
        gettoken: (state) => state.token,
        asyncRoutes: (state) => state.asyncRoutes,
        id: (state) => state.id,
        userAccount: (state) => state.userAccount,
        userName: (state) => state.userName,
        passWord: (state) => state.passWord,
        userSex: (state) => state.userSex,
        userEmail: (state) => state.userEmail,
        userPhone: (state) => state.userPhone,
        departmentId: (state) => state.departmentId,
        roleId: (state) => state.roleId,
    },
    mutations: {
        SET_TOKEN(state, {token}) {
            setToken(token);
            state.token = token;
        },
        CLEAR_LOGIN_INFO(state) {
            state.token = undefined;
            setToken();
        },
        SET_ROUTES(state, data){
            state.asyncRoutes = data;
            //刷新数据会丢失，需要sessionStorage会话存储，关闭会话数据清空
            sessionStorage.setItem("SESSION_ROUTES",JSON.stringify(data))
        },
        SAVE_USER_INFO(state, data: UserInfoRes) {
            const {id, userAccount, userName, passWord, userSex, userEmail,userPhone,departmentId,roleId} = data || {};
            state.id = id;
            state.userAccount = userAccount;
            state.userName = userName;
            state.passWord = passWord;
            state.userSex= userSex;
            state.userEmail = userEmail;
            state.userPhone = userPhone;
            state.departmentId = departmentId;
            state.roleId = roleId;
            sessionStorage.setItem("id",JSON.stringify(id));
            sessionStorage.setItem("userAccount",JSON.stringify(userAccount));
            sessionStorage.setItem("userName",JSON.stringify(userName));
            sessionStorage.setItem("passWord",JSON.stringify(passWord));
            sessionStorage.setItem("userSex",JSON.stringify(userSex));
            sessionStorage.setItem("userEmail",JSON.stringify(userEmail));
            sessionStorage.setItem("userPhone",JSON.stringify(userPhone));
            sessionStorage.setItem("departmentId",JSON.stringify(departmentId));
            sessionStorage.setItem("roleId",JSON.stringify(roleId));
        },
    },
    actions: {
        //登录
        async appLogin(
            {dispatch, commit},
            payload: {
                userAccount: string;
                passWord: string;
                type: string;
                cancelToken?: CancelToken;
            }
        ) {
            //登录获取token
            const userAccount = payload.userAccount.trim();
            const passWord = payload.passWord;
            const type = payload.type;
            const {data} = await loginApi(
                {userAccount, passWord},
                payload.cancelToken
            );
            if(data.code == '200'){
                router.push({ path: "/home/visualizationAttempts_1", query: {} })
                ElMessage.success({
                  message: '登陆成功',
                  type: 'success',
                })
              }else{
                await router.push({name: 'Login'});
                ElMessage.error('账号或密码错误')
              }
            commit("SET_TOKEN", {
                token: data.data ? data.data : 'test_token',
                remember: true,
            });
            //登录成功后获取菜单
            const res = await getLonginMenuApi();
            //添加动态菜单
            commit("SET_ROUTES",res.data.data)
            await dispatch("getUserInfo");
            return res;
        },
        //token获取个人信息
        async getUserInfo({commit}) {
            const {data} = await getTokenInfoApi();
            if (data === null) {
                await router.push({name: 'Login'});
            }
            commit("SAVE_USER_INFO", data.data);
            resetRouter();
            return data;
        },
        //退出清空
        async clearLoginInfo({commit}, redirect?: string): Promise<void> {
            commit("CLEAR_LOGIN_INFO");
                await router.push({
                    name: "Login",
                    query: {redirect},
                });
        },
    },
};

export default menu;
