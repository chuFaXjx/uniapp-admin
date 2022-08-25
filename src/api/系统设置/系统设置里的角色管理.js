import request from '@/utils/request'
// 获取角色菜单列表
export function Rolelist(){
    return request({
        method:"GET",
        url:'/rolelist'
    })
}
// 角色添加
export function AddRole(data){
    return request({
        method:"POST",
        url:'/roleadd',
        data,
    })
}
// 删除角色
export function DelRole(data){
    return request({
        method:"POST",
        url:'/roledelete',
        data,
    })
}
// 获取角色信息一条
export function getRoleList(id){
    return request({
        method:"GET",
        url:'/roleinfo',
        params:{
            id:id
        }
    })
}
// 编辑角色
export function EditRole(data){
    return request({
        method:"POST",
        url:'/roleedit',
        data,
    })
}