import {catelist} from '@/api/商城管理/商品分类管理'
export default {
  state: {
    CateList:JSON.parse(localStorage.getItem("VUE_CATE_LIST"))||[],
    isEditClose:false,
    isAddClose:false
  },

  mutations: {
    setCateList(state,data){
        // console.log(data);
        state.CateList = data;
        localStorage.setItem("VUE_CATE_LIST",JSON.stringify(data));
      },
      updataIsEditClose(state,flag){
        state.isEditClose = flag
      },
      updataIsAddCloss(state,flag){
        state.isAddClose = flag
      }
  },
  actions:{
    async CateListSet({commit}){
        // 获取商城管理里头的商品信息
        const CateListRes = await catelist();
        console.log(CateListRes.list);
        commit("setCateList",CateListRes.list);
    }
  }
};
