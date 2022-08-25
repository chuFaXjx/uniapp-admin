import request from '@/utils/request'
// 获取商品分类列表
export function goodslist(size,page){
    return request({
        method:"GET",
        params:{
            size:size,
            page:page,
        },
        url:'/goodslist'
    })
}
// 获取商品分类总条数
export function goodslisttotal(){
    return request({
        method:"GET",
        url:'/goodscount'
    })
}
// 添加商品
export function addgoods(data){
    return request({
        method:"POST",
        url:'/goodsadd',
        data,
    })
}
// 删除商品
export function delgoods(data){
    return request({
        method:"POST",
        url:'/goodsdelete',
        data,
    })
}