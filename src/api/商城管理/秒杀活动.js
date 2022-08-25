import request from '@/utils/request'
// 获取秒杀活动
export function speckill(){
    return request({
        method:"GET",
        url:'/secklist'
    })
}
//添加秒杀活动 /seckadd
export function addseckill(data){
    return request({
        method:"POST",
        url:'/seckadd',
        data,
    })
}
// 限时秒杀删除 /seckdelete
export function delseckill(data){
    return request({
        method:"POST",
        url:'/seckdelete',
        data,
    })
}
// 获取限时秒杀一条
export function getseckillone(id){
    return request({
        method:"GET",
        params:{
            id:id
        },
        url:'/seckinfo'
    })
}
// 编辑秒杀活动
export function editseckill(data){
    return request({
        method:"POST",
        url:'/seckedit',
        data,
    })
}