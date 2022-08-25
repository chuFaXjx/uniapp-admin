import {Rolelist} from '@/api/系统设置/系统设置里的角色管理'
export default {
  state: {
    UserList:JSON.parse(localStorage.getItem("VUE_USER_LIST"))||[],
    isAddClose:false,
    isEditClose:false,
  },

  mutations: {
    setUserList(state,data){
        state.UserList = data;
        localStorage.setItem("VUE_USER_LIST",JSON.stringify(data));
      },
    updataIsAddClose(state,flag){
      state.isAddClose = flag
    },
    updataIsEditClose(state,flag){
      state.isEditClose = flag
    }
  },
  actions:{
    async UserSet({commit}){
      // 获取系统设置里头的用户信息
        const UserListRes = await Rolelist();
        commit("setUserList",UserListRes.list);
    }
  }
};
