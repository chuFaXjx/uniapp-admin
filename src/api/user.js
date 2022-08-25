// 专门出来用户相关的网络请求
import request from "@/utils/request";
// import shaJs from 'sha.js'

export function login(data) {
  // data.password=shaJs('sha256').update(data.password).digest('hex')
  return request({
    method: "post",
    url: "/userlogin",
    data,
  });
}
