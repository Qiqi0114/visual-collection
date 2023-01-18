import axios from 'axios'

let url: any = import.meta.env // 配置不同环境的域名信息等
const service = axios.create({
  baseURL: url.VITE_APP_BASE_API, // url = base url + request url
  timeout: 40 * 1000, // 默认用40s超时时间
  headers: { // 配置OAuth 2.0的认证头
    'Content-Type': 'application/json;charset=utf-8'
  },
  withCredentials: true // send cookies when cross-domain requests
})

// 请求前置拦截器
service.interceptors.request.use((config) => {
  config.headers.token = 'xdclasseyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ4ZGNsYXNzIiwidXNlckpzb24iOiJ7XCJpZFwiOjEsXCJwYXNzV29yZFwiOlwiOUFDMDE3NzVDRTJDNjcwOTg2Q0NEQ0JBOTQ5REQzQzFcIixcInJvbGVJZFwiOjEsXCJyb2xlTmFtZVwiOlwi6LaF57qn566h55CG5ZGYXCIsXCJ1c2VyQWNjb3VudFwiOlwiYWRtaW5pc3RyYXRvclwiLFwidXNlck5hbWVcIjpcIui2hee6p-euoeeQhuWRmFwifSIsImlhdCI6MTY3NDA1Mzk4OCwiZXhwIjoxNjc0NjU4Nzg4fQ.WRyOe1iN7Rs9UE-0G3pwl64UqG0ZxOFe343o6cERKq0'
  if (config.method === 'post' && !config.data) {
    config.data = config.params
    config.params = null
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应前置拦截器
service.interceptors.response.use((res) => {
  return Promise.resolve(res)
}, (error) => {
  let errMsg = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        errMsg = '错误的请求'
        break
      case 500:
        errMsg = '服务器端出错'
        break
      case 401:
        errMsg = '权限校验错误'
        break
      default:
        errMsg = '网络错误'
    }
  }
  return Promise.reject(errMsg)
})

// 发起请求
export function request(config: any) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios({
        ...config
      })
      resolve(result)
    } catch (err) {
      reject(err)
    }
  })
}

export default service
