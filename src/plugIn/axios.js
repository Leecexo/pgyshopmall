const HttpServer = {};
import axios from 'axios'
HttpServer.install = function (Vue) {
  // 插件要封装的功能
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 请求拦截器的代码
  axios.interceptors.request.use(function (config) {
    // 如果请求是login, 直接发送请求
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    }
    // 当请求不是login, 先加头部,然后继续发送请求
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  Vue.prototype.$axios = axios

}
export default HttpServer;
