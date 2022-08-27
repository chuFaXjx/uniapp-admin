import { login } from "@/api/user";
export default {
  state: {
    isLogin: localStorage.getItem("VUE_ADMIN_ISLOGIN") || false,
    token: localStorage.getItem("VUE_ADMIN_TOKEN") || "",
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
        commit("setTooken", res.token);
        commit("setLoginState", true);
        // 获取信息
        commit("updateUserInfo", {
          // menus: res.list.menus,
          // menus_url: res.list.menus_url,
          username: res.username,
        });

        // 处理权限路由
        // dispatch("addAsyncRoute")
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    }},

};
