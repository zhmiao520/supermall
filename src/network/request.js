import axios from 'axios'

/**
 * 关于函数调用的变量作用域：
 *    函数调用->将函数压入函数栈(保存函数调用过程中的所有变量)
 *    调用结束-》弹出函数栈(释放函数所有变量)
 */

/**
 * 应对一个应用中，如果出现多个请求实例--》比如：请求url不同，不同服务器中的数据请求
 * 因此将请求作为一个函数返回：对应实例的请求，响应拦截器也都是实例的，并不是全局的
 * @param config
 * @returns {AxiosPromise}
 */
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/mn',
    timeout: 5000,
  })

  instance.interceptors.request.use(config => {
    return config
  }, error => {
    Promise.reject(error)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, error => {
    Promise.reject(error)
  })

  return instance(config)
}
