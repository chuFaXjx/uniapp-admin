import {specslist,specslisttotal} from '@/api/商城管理/商品规格'
export default {
    state:{
        SpecsList:JSON.parse(localStorage.getItem("VUE_SPECS_LIST"))||[],
        SpecsListTotal:JSON.parse(localStorage.getItem("VUE_SPECS_LIST_TOTAL"))||[],
        isAddSpecsClose:false,
        isEditSpecsClose:false,
    },
    mutations:{
        updataSpecsList(state,data){
            state.SpecsList = data;
            localStorage.setItem("VUE_SPECS_LIST",JSON.stringify(data));
        },
        updataSpecsListTotal(state,data){
           state.SpecsListTotal = data;
            localStorage.setItem("VUE_SPECS_LIST_TOTAL",JSON.stringify(data))
            // console.log("22222222222222222222222222",state.GoodsList);
        },
        updataAddSpecsClose(state,flag){
            state.isAddSpecsClose = flag
        },
        updataEditSpecsClose(state,flag){
            state.isEditSpecsClose = flag
        }
    },
    actions:{
        async setSpecsList({commit},data){
           const specsListRes = await specslist(data.size,data.page); 
           commit("updataSpecsList",specsListRes.list);
        },
        async setSpecsListTotal({commit}){
            const SpecsListTotalRes = await specslisttotal();
            // console.log("@@@@@@@@@@@@@@@@@@@@@",GoodsListTotalRes);
            commit("updataSpecsListTotal",SpecsListTotalRes.list);
        }
    },

}