//配置商城管理相关的路由
export default [
  // 商品分类页
  {
    path: '/category',
    name: 'category',
    meta: {
      title: "商品分类",
      breadcrumb: ["商城管理", "商品分类"]
    },
    component: () => import(/* webpackChunkName: "category" */ "@/views/商城管理/category.vue")
  },
  // 商品规格页面
  {
    path: '/specs',
    name: 'specs',
    meta: {
      title: "商品规格",
      breadcrumb: ["商城管理", "商品规格"]
    },
    component: () => import(/* webpackChunkName: "specs" */ "@/views/商城管理/specs.vue")
  },
  // 商品管理页面
  {
    path: '/goods',
    name: 'goods',
    meta: {
      title: "商品管理",
      breadcrumb: ["商城管理", "商品管理"]
    },
    component: () => import(/* webpackChunkName: "goods" */ "@/views/商城管理/goods.vue")
  },


  // 会员管理页面
  {
    path: '/member',
    name: 'member',
    meta: {
      title: "会员管理",
      breadcrumb: ["商城管理", "会员管理"]
    },
    component: () => import(/* webpackChunkName: "member" */ "@/views/商城管理/member.vue")
  },
  // 轮播图管理
  {
    path: '/banner',
    name: 'banner',
    meta: {
      title: "轮播图管理",
      breadcrumb: ["商城管理", "轮播图管理"]
    },
    component: () => import(/* webpackChunkName: "banner" */ "@/views/商城管理/banner.vue")
  },
  // 限时秒杀页面
  {
    path: '/seckill',
    name: 'seckill',
    meta: {
      title: "限时秒杀",
      breadcrumb: ["商城管理", "秒杀活动"]
    },
    component: () => import(/* webpackChunkName: "seckill" */ "@/views/商城管理/seckill.vue")
  },

];