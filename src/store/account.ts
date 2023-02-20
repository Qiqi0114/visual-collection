import { CancelToken } from 'axios';
import {AccountState, RootState} from "./types";
import {Module} from "vueX";
import { getLonginMenuApi, loginApi } from '../api/login';
import { getToken, setToken } from '../lib/util';
import { ElMessage } from 'element-plus';
import router from '../router';
const menu: Module<AccountState, RootState> = {
    state: {
        token: getToken(),
    },
    getters: {
        gettoken: (state) => state.token,
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
            const userAccount = payload.userAccount.trim();
            const passWord = payload.passWord;
            const type = payload.type;
            const {data} = await loginApi(
                {userAccount, passWord},
                payload.cancelToken
            );
            
            if(data.code == '200'){
                router.push({ path: "/home", query: {} })
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
/*             commit("SET_ROUTES",data.data.orgBusionessListDTOS) */
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
