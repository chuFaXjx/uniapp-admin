// 专门出来用户相关的网络请求
import request from "@/utils/request";
// import shaJs from 'sha.js'

export function login(data) {
  // data.password=shaJs('sha256').update(data.password).digest('hex')
  return request({
    method: "post",
    url: "/api/login",
    data,
  });
}
// 获取所有用户
export function getuserAll() {
  return request({              
    method: "get",
    url: "/api/getuser",
  });
}

// 添加用户
export function adduser(data) {
  return request({
    method: "post",
    url: "/api/register",
    data,
  });
}
// 删除用户
export function deluser(id) {
  return request({
    method: "delete",
    url: "/api/deluser",
    params:{
      id,
    },
  });
}
// 获取一条用户信息
export function getuserone(id){
  return request({
    method: "get",
    url: "/api/getuserone",
    params:{
      id,
    },
  });
}
// 编辑用户信息
export function edituserone(data){
  return request({
    method: "post",
    url: "/api/edituser",
   data,
  });
}
