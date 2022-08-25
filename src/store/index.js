import { createStore } from "vuex";

// 用户相关的store
import userStore from "./modules/user";
import menuStore from "./modules/menu";
import headerStore from "./modules/header";
import SetUseStore from "@/store/modules/系统设置/角色管理/userAdmin";
import AdminerStore from "@/store/modules/系统设置/管理员管理/Adminer"
import CateStore from "@/store/modules/商城管理/商品分类管理/cate"
import SpecsStore from "@/store/modules/商城管理/商品规格/Specs"
import GoodsStore from "@/store/modules/商城管理/商品管理/Adgoods"
import MemberStore from "@/store/modules/商城管理/会员管理/AdMember"
import BannerStore from "@/store/modules/商城管理/轮播图管理/AdBanner";
import SeckillStore from "@/store/modules/商城管理/秒杀活动/AdSeckill"
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    userStore,
    menuStore,
    headerStore,
    SetUseStore,
    AdminerStore,
    CateStore,
    SpecsStore,
    GoodsStore,
    MemberStore,
    BannerStore,
    SeckillStore,
  },
});
