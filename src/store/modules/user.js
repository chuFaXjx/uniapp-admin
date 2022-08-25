import { login } from "@/api/user";
import { DeletMenuList,AddMenuList } from "@/api/Aside";
import router from "@/router";
export default {
  state: {
    isLogin: localStorage.getItem("VUE_ADMIN_ISLOGIN") || false,
    token: localStorage.getItem("VUE_ADMIN_TOKEN") || "",
    MenuList: localStorage.getItem("VUE_ADMIN_MENU") || [],
    // 标识用户是否加载过动态路由了
    alreadLoad:false,
    userInfo:JSON.parse(localStorage.getItem(process.env.VUE_APP_USER_INFO)) || {},
    isclose:false,
    isEditClose:false,
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
  mutations: {
    // 设置token
    setTooken(state, data) {
      state.token = data;
      localStorage.setItem("VUE_ADMIN_TOKEN", data);
    },
    // 设置登录状态
    setLoginState(state, flag) {
      state.isLogin = flag;
      localStorage.setItem("VUE_ADMIN_ISLOGIN", flag);
    },
    // 设置侧边菜单栏 
    setMenuState(state, data) {

      state.MenuList = JSON.stringify(data);
      localStorage.setItem("VUE_ADMIN_MENU", JSON.stringify(data));
    },

    updataAlreadLoad(state){
      state.alreadLoad = true;
    },
    updateUserInfo(state, userInfoObj) {
      state.userInfo = userInfoObj;
      // 把token保存到localStorage
      localStorage.setItem(
        process.env.VUE_APP_USER_INFO,
        JSON.stringify(userInfoObj)
      );
    },
    updataIsclose(state,flag){
      state.isclose = flag
    },
    updataisEditClose(state,flag){
      state.isEditClose = flag
    },
  },
  actions: {
    // 处理登录的业务逻辑
    async handleLogin({ commit,dispatch}, data) {
      try {
        const res = await login(data);
        // 登录成功，设置 token
        commit("setTooken", res.list.token);
        commit("setLoginState", true);
        // 菜单网络请求
        commit("setMenuState", res.list.menus);
        // 获取信息
        commit("updateUserInfo", {
          menus: res.list.menus,
          menus_url: res.list.menus_url,
          username: res.list.username,
        });

        // 处理权限路由
        dispatch("addAsyncRoute")
        return true;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 加载权限路由,动态添加路由
    addAsyncRoute({state,commit}){
      // 保存系统中所有的权限路由
      const allRoutes = [];
      // 递归获取router/modules目录下所有以.js结尾的文件
      const routeFiles = require.context("@/router/modules",true,/\.js/);
      routeFiles.keys().forEach(item => {
        const routes = require("@/router/modules"+item.split(".")[1]);
        allRoutes.push(...routes.default);
      });
      console.log(allRoutes);
      // 获取后台返回的路由
      console.log(JSON.parse(state.MenuList));
      
      // 比对筛选出权限路由

      // 将筛选后的权限路由添加到系统中
      // allRoutes.forEach(route=>{
      //   router.addRoute("home",route);
      // })
      // // 标识该用户已经加载过权限路由
      // commit("updataAlreadLoad");
      const backRoutes = state.userInfo.menus_url;
      // 比对筛选出权限路由
      const asyncRoutes = allRoutes.filter((item) =>
        backRoutes.includes(item.path)
      );

      // console.log("筛选后的权限路由：", asyncRoutes);

      // 将筛选后的权限路由添加到系统中
      asyncRoutes.forEach((route) => {
        // 将权限路由，添加到 layout 的子路由中
        router.addRoute("home", route);
      });

      // 标识该用户已经加载过权限路由了
      commit("updataAlreadLoad");
    },
    // 删除菜单
    async DeleteMenulist({commit},data){
      const DelMenulistRes = await DeletMenuList(data);
      console.log(DelMenulistRes);
      commit("setMenuState",DelMenulistRes.list)
    },
  },

};
