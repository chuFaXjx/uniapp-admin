import {Memberlist} from '@/api/商城管理/会员管理'
export default {
    state:{
        MemberList:JSON.parse(localStorage.getItem("VUE_MEMBER_LIST"))||[],
        isEditMemberClose:false,
    },
    mutations:{
        updataMemberList(state,data){
            state.MemberList = data;
            localStorage.setItem("VUE_MEMBER_LIST",JSON.stringify(data))
        },
        updataEditMemberClose(state,flag){
            state.isEditMemberClose = flag;
        }
    },
    actions:{
        async setMemberList({commit}){
            let MemberListRes = await Memberlist();
            commit("updataMemberList",MemberListRes)
        }
    },
}