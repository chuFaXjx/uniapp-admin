import {Adminlist,Adminlisttotal} from '@/api/系统设置/系统设置里的管理员设置'
export default {
  state: {
    AdminList:JSON.parse(localStorage.getItem("VUE_ADMIN_LIST"))||[],
    AdminListTotal:JSON.parse(localStorage.getItem("VUE_ADMIN_LIST_TOTAL"))||[],
    isAddAdClose:false,
    isEditAdClose:false,
  },

  mutations: {
    setAdminList(state,data){
        console.log(data);
        state.AdminList = data;
        localStorage.setItem("VUE_ADMIN_LIST",JSON.stringify(data));
      },
      updataAdminListTotal(state,data){
        state.AdminListTotal = data;
        localStorage.setItem("VUE_ADMIN_LIST_TOTAL",JSON.stringify(data))
        // console.log("22222222222222222222222222",state.GoodsList);
    },
    updataIsAdAddClose(state,flag){
      state.isAddAdClose = flag
    },
    updataIsAdEditClose(state,flag){
      state.isEditAdClose = flag
    }
  },
  actions:{
    async AdminSet({commit},data){
        // 获取系统设置里头的用户信息
       
        const AdminListRes = await Adminlist(data.size,data.page);
        commit("setAdminList",AdminListRes.list);
        console.log(data);
    },
    async setAdminListTotal({commit}){
      const AdminsListTotalRes = await Adminlisttotal();
      // console.log("@@@@@@@@@@@@@@@@@@@@@",GoodsListTotalRes);
      commit("updataAdminListTotal",AdminsListTotalRes.list);
  }
  }
};
