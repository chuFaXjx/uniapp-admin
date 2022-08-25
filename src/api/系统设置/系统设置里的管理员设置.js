import request from '@/utils/request'
export function Adminlist(size,page){
    return request({
        method:"GET",
        url:'/userlist',
        params:{
            size:size,
            page:page,
        },
    })
};
// 获取管理员列表总条数
export function Adminlisttotal(){
    return request({
        method:"GET",
        url:'/usercount'
    })
}
// 管理员添加
export function AddAdminer(data){
    return request({
        method:"POST",
        url:'/useradd',
        data,
    })
}
// 管理员删除
export function DelAdminer(data){
    return request({
        method:"POST",
        url:'/userdelete',
        data,
    })
}
// 获取管理员一条信息
export function getAdminerOne(uid){
    return request({
        method:"GET",
        url:'/userinfo',
        params:{
            uid:uid
        }
    })
}
// 编辑管理员
export function EditAdminer(data){
    return request({
        method:"POST",
        url:'/useredit',
        data,
    })
}