// 专门出来用户相关的网络请求
import request from "@/utils/request";
// 获取轮播图数据
export function getBanner() {
  return request({
    method: "get",
    url: "/api/getdoctorbanner",
    msg:'获取成功'
  });
}
// 添加轮播图数据
export function addBanner(data) {
    return request({
      method: "post",
      url: "/api/doctorbanner",
      data,
    });
  }
  // 编辑轮播图数据
export function editBanner(data) {
    return request({
      method: "post",
      url: "/api/editbanner",
      data,
    });
  }
 // 删除一条轮播图数据
export function deleBanner(id) {
    return request({
      method: "delete",
      url: "/api/delebanner",
      data:{
        id
      }
    });
  }

