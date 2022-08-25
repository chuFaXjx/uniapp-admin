//配置系统设置相关的路由
export default [
     // 菜单管理
      {
        path:'/menu',
        name:'menu',
        // 给路由添加一些自定义的属性,可以使用 mata 元数据
        meta:{
            title:"菜单管理",
            breadcrumb:["系统设置","菜单管理"]
        },
        component:()=>import(/* webpackChunkName: "menu" */ "@/views/系统设置/menu.vue"),
      },
      // 角色管理
      {
        path:'/role',
        name:'role',
        meta:{
            title:"角色管理",
            breadcrumb:["系统设置","角色管理"]
        },
        component:()=>import(/* webpackChunkName: "role" */ "@/views/系统设置/role.vue")
      },
      // 管理员管理
      {
        path:'/admin',
        name:'admin',
        meta:{
            title:"管理员管理",
            breadcrumb:["系统设置","管理员管理"]
        },
        component:()=>import(/* webpackChunkName: "admin" */ "@/views/系统设置/admin.vue")
      },
];