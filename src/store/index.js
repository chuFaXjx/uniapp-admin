import { createStore } from "vuex";

// 用户相关的store
import userStore from "./modules/user";
import menuStore from "./modules/menu";
import headerStore from "./modules/header";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    userStore,
    menuStore,
    headerStore,
  },
});
