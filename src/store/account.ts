import { CancelToken } from 'axios';
import {AccountState, RootState} from "./types";
import {Module} from "vueX";
import { loginApi } from '../api/login';
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
    },
    actions: {
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
            console.log(data.data);
            
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
            
            //添加动态菜单
/*             commit("SET_ROUTES",data.data.orgBusionessListDTOS) */
            return data;
        },
        CLEAR_LOGIN_INFO(state) {
            state.token = undefined;
            setToken();
        },
    },
};

export default menu;
