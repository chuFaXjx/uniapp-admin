import {bannerlist} from '@/api/商城管理/轮播图管理'
export default {
    state:{
        BannerList:JSON.parse(localStorage.getItem("VUE_BANNER_LIST"))||[],
        isAddBannerClose:false,
        isEditBannerClose:false,
    },
    mutations:{
        updataBannerList(state,data){
            state.BannerList = data;
            localStorage.setItem("VUE_BANNER_LIST",JSON.stringify(data))
            console.log(data);
        },
        updataisAddBannerClose(state,flag){
            state.isAddBannerClose = flag;
        },
        updataisEditBannerClose(state,flag){
            state.isEditBannerClose = flag;
        }
    },
    actions:{
        async setBannerList({commit}){
            let BannerListRes = await bannerlist();
            commit("updataBannerList",BannerListRes)
        }
    },
}