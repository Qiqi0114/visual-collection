import axios from 'axios'

/**
 * 请求拦截
 */
axios.interceptors.request.use(
    config => {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  if (sessionStorage.getItem("TOKEN_KEY")) {
    config.headers.common['Authorization'] = sessionStorage.getItem("TOKEN_KEY");
  }
  return config
    },
    error => {
        console.log('error in request');
        return Promise.reject(error);
    }
);



// 导出给 main.js 挂载
export default axios;
