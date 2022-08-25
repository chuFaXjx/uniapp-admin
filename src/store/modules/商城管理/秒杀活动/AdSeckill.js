import {speckill} from '@/api/商城管理/秒杀活动'
export default {
    state:{
        SpecKillList:JSON.parse(localStorage.getItem("VUE_SPECKILL_LIST"))||[],
        isAddSeckillClose:false,
        isEditSeckillClose:false,
    },
    mutations:{
        updataSpecKillList(state,data){
            state.SpecKillList = data;
            localStorage.setItem("VUE_SPECKILL_LIST",JSON.stringify(data))
            console.log(data);
        },
        updataIsAddSeckillClose(state,flag){
            state.isAddSeckillClose = flag
        },
        updataIsEditSeckillClose(state,flag){
            state.isEditSeckillClose = flag;
        }
    },
    actions:{
        async setSpecKillList({commit}){
            let SpecKillListRes = await speckill();
            commit("updataSpecKillList",SpecKillListRes)
        }
    },
}