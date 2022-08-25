import request from '@/utils/request'
export function specslist(size,page){
    return request({
        method:"GET",
        params:{
            size:size,
            page:page,
        },
        url:'/specslist'
    })
};
// 获取商品规格总条数
export function specslisttotal(){
    return request({
        method:"GET",
        url:'/specscount'
    })
}
// 添加商品规格 specsadd
export function addspecs(data){
    return request({
        method:"POST",
        url:'/specsadd',
        data,
    })
}
//删除商品规格
export function delspecs(data){
    return request({
        method:"POST",
        url:'/specsdelete',
        data,
    })
}
// 获取商品规格一条 specsinfo
export function specslistone(id){
    return request({
        method:"GET",
        url:'/specsinfo',
        params:{
            id:id,
        }
    })
}
// 调用修改商品接口
export function Editspecs(data){
    return request({
        method:"POST",
        url:'/specsedit',
        data,
    })
}