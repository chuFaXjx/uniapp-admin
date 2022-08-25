import axios from "axios";

import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  // 请求超时时间
  timeout: 1000 * 60 * 5,
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // console.log("请求拦截器", config);
    // 在发送请求之前给 header 设置 token
    if (!config.url.includes('/userlogin')) {
     config.headers.authorization = localStorage.getItem("VUE_ADMIN_TOKEN")
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么 
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log("response：", response);
    // 如果code不是200,就是失败了
    if (response.data.code !== 200) {
      ElMessage({
        showClose: true,
        message: response.data.msg,
        type: "error",
      });
      return Promise.reject(response.data.msg);
    } else {
      return response.data;
    }
  },
  (err) => Promise.reject(err)
);

export default service;
