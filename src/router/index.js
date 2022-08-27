import { createRouter, createWebHistory } from "vue-router";

import store from "@/store/index";
// 导入进度条插件
import useNProgress from "@/hooks/useNProgress";
const NProgress = useNProgress();
const routes = [
  {
    path: "/",
    name: "home",
    redirect:'/index',
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    children:[
      { 
        path:"/index",
        name:"index",
        component:()=>import(/* webpackChunkName: "index" */ "@/views/index.vue"),
        meta:{
          title:"首页",
          breadcrumb:["首页"],
        },
      },
      { 
        path:"/user",
        name:"user",
        component:()=>import(/* webpackChunkName: "user" */ "@/views/user.vue"),
        meta:{
          title:"角色管理",
          breadcrumb:["角色管理"],
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
    // 404路由
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () =>
        import(/* webpackChunkName: "notFound" */ "@/views/NotFound.vue"),
    },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 导航前置守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();

  const token = store.state.userStore.token;
  if (to.name !== "login") {
    if (!token) {
      // 返回到登录页
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

// 导航后置守卫
router.afterEach(() => {
  // 关闭进度条
  NProgress.done();
});


export default router;
