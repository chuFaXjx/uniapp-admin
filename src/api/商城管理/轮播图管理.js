import request from '@/utils/request'
// 获取轮播图列表
export function bannerlist(){
    return request({
        method:"GET",
        url:'/bannerlist'
    })
}
// 轮播图添加
export function addbanner(data){
    return request({
        method:"POST",
        url:'/banneradd',
        data,
    })
}
// 获取当前轮播图数据
export function getBannertone(id){
    return request({
        method:"GET",
        url:'/bannerinfo',
        params:{
            id:id,
        }
    })
}
// 修改当前轮播图数据
export function editbanner(data){
    return request({
        method:"POST",
        url:'/banneredit',
        data,
    })
}
// 删除当前轮播图
export function delbanner(data){
    return request({
        method:"POST",
        url:'/bannerdelete',
        data,
    })
}