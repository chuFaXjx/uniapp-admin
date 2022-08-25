import request from '@/utils/request'
// 获取菜单列表
export function menulist(){
    return request({
        method:"GET",
        params:{
            istree:1
        },
        url:'/menulist'
    })
}
// 菜单删除
export function DeletMenuList(data){
    return request({
        method:"POST",
        url:'/menudelete',
        data,
    })
}
// 新增菜单
export function AddMenuList(data){
    return request({
        method:"POST",
        url:'/menuadd',
        data,
    })
}
// 获取菜单一条信息
export function getMenuListone(id){
    return request({
        method:"GET",
        url:'/menuinfo',
        params:{
            id:id
        }
    })
}
// 编辑菜单
export function EditMenu(data){
    return request({
        method:"POST",
        url:'/menuedit',
        data,
    })
}