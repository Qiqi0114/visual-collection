import axios from 'axios'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // 外网更新
  // baseURL: 'http://xxxxx',
  baseURL: 'http://43.143.214.146:8001',  
  timeout: 5000 // request timeout
})

export default service
