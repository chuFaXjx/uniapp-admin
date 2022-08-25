import {goodslist,goodslisttotal} from '@/api/商城管理/商品管理'
export default {
    state:{
        GoodsList:JSON.parse(localStorage.getItem("VUE_GOODS_LIST"))||[],
        GoodslistTotal:JSON.parse(localStorage.getItem("VUE_GOODS_LIST_TOTAL"))||[],
        isAdGoodsClose:false,
        isEditGoodsClose:false,
    },
    mutations:{
        updataGoodsList(state,data){
            state.GoodsList = data;
            localStorage.setItem("VUE_GOODS_LIST",JSON.stringify(data))
        },
        updataGoodsListTotal(state,data){
            state.GoodsList = data;
            localStorage.setItem("VUE_GOODS_LIST_TOTAL",JSON.stringify(data))
            // console.log("22222222222222222222222222",state.GoodsList);
        },
        updataisAdGoodsClose(state,flag){
            state.isAdGoodsClose = flag
        },
        updataisEditGoodsClose(state,flag){
            state.isEditGoodsClose = flag
        }
    },
    actions:{
       async setGoodsList({commit},data){
            const GoodsListRes = await goodslist(data.size,data.page);
            commit("updataGoodsList",GoodsListRes.list);
        },
        async setGoodsListTotal({commit}){
            const GoodsListTotalRes = await goodslisttotal();
            // console.log("@@@@@@@@@@@@@@@@@@@@@",GoodsListTotalRes);
            commit("updataGoodsListTotal",GoodsListTotalRes.list);
        }
    }
}