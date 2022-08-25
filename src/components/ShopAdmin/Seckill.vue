<template>
    <div class="MenuBox">
        <div>
            <el-button type="primary" class="addBtn" @click="openModles">添加</el-button>
        </div>
        <el-table :data="filterTableData" style="width: 100%" row-key="id">
            <el-table-column label="ID" prop="id" sortable /> 
            <el-table-column label="标题" prop="title" />
            <el-table-column label="开始时间" prop="begintime">
                <template v-slot="scope">
                    <div>
                        {{Time(+scope.row.begintime,'{y}-{m}-{d} {h}:{i}:{s}')}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="结束时间" prop="endtime">
                <template v-slot="scope">
                    <div>
                        {{Time(+scope.row.endtime,'{y}-{m}-{d} {h}:{i}:{s}')}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="商品ID" prop="goodsid" />
            <el-table-column label="状态" prop="status">
                <template v-slot="scope">
                    <div>
                        <el-tag v-if="scope.row.status">已启用</el-tag>
                        <el-tag class="ml-2" type="danger" v-else>已禁用</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #default="scope">
                    <el-row style="flex-wrap:nowrap ;">
                        <el-button type="primary" :icon="Edit" circle
                        @click="handleEdit(scope.row.id, scope.row.pid)" 
                        />
                        <el-button type="success" icon="InfoFilled" circle />
                        <el-button type="danger" :icon="Delete" circle 
                        @click="handleDelete(scope.row.id)"
                        />
                    </el-row>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="$store.state.SeckillStore.isAddSeckillClose" title="秒杀活动添加" >
        <AddSeckill  />
    </el-dialog>
     <el-dialog v-model="$store.state.SeckillStore.isEditSeckillClose" title="秒杀活动编辑" :destroy-on-close=true>
        <EditSecekill :RowId="RowId" />
    </el-dialog>
    </div>
</template>

<script  setup>

import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'
import { computed,reactive,ref} from 'vue'
import { useStore } from 'vuex';
import { AddSeckill,EditSecekill } from '@/layout/components/Main';
import {delseckill} from "@/api/商城管理/秒杀活动"
import  Time from '@/hooks/Time';
const store = useStore();
// 发送Ajax
store.dispatch("setSpecKillList");
const filterTableData = computed(() =>
    store.state.SeckillStore.SpecKillList.list
)
console.log("11111111111111111111111111111111",store.state.SeckillStore.SpecKillList.list);

// 编辑功能
let RowId = ref(undefined)
const handleEdit = (index, row) => {
    console.log(index, row)
    store.commit("updataIsEditSeckillClose",true)
    RowId.value = index

}
// 删除功能
async function DelSeckill(data){
  let res =  await delseckill(data);
    console.log("res:",res);
}
const handleDelete = (index) => {
    let List = {
        id:index
    }
    // 
     ElMessageBox.confirm(
    '您确定要删除这一行吗',
    '警告',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      DelSeckill(List);
      location.reload();
    })
    .catch(() => {
        ElMessage({
        type: 'info',
        message: '您已取消',
      })
    })
}
let Goods = reactive({
  size:500,
  page:1,
})
store.dispatch("setGoodsList",Goods)
//打开添加模态框
function openModles(){
    store.commit("updataIsAddSeckillClose",true);
} 
</script>

<style lang="scss" scoped>
.MenuBox {
    width: 95%;
    height: 100%;
    position: relative;
    background-color: white;
    left: 30px;
    top: 25px;
}

.addBtn {
    height: 30px;
}

.pageBox {
    position: relative;
    background-color: white;
    width: 786.6px;
    height: 36px;
}

.Page {
    width: 437.86px;
    height: 30px;
    position: relative;
    left: 100%;
    background-color: white;
}
</style>