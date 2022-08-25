import request from '@/utils/request'
// 获取商品分类管理表
export function catelist(){
    return request({
        method:"GET",
        params:{
            istree:1
        },
        url:'/catelist'
    })
}
// 获取商品分类管理表（一条）
export function catelistone(id){
    return request({
        method:"GET",
        params:{
            id:id
        },
        url:'/cateinfo'
    })
}
// 商品分类管理编辑功能
export function editcate(data){
    return request({
        method:"POST",
        url:'/cateedit',
        data,
    })
}
// 商品删除功能
export function delcate(data){
    return request({
        method:"POST",
        url:'/catedelete',
        data,
    })
}
// 商品新增功能
export function addcate(data){
    return request({
        method:"POST",
        url:'/cateadd',
        data,
    })
}