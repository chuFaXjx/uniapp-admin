import request from '@/utils/request'
export function Memberlist(){
    return request({
        method:"GET",
        url:'/memberlist',
    })
};
// 会员获取
export function getMemberone(uid){
    return request({
        method:"GET",
        url:'/memberinfo',
        params:{
            uid,
        }
    })
};
// 会员修改
export function editmember(data){
    return request({
        method:"POST",
        url:'/memberedit',
        data,
    })
}