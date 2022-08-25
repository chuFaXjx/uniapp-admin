<template>
    <div class="MenuBox">
        <div>
            <el-button type="primary" class="addBtn" @click="openModels">添加</el-button>
        </div>
        <el-table :data="filterTableData" style="width: 100%" row-key="id">
            <el-table-column label="ID" prop="id" sortable />
            <el-table-column label="轮播图" prop="title"  />
             <el-table-column label="图片" prop="img">
                <template v-slot="scope">
                    <div>
                        <img v-if="scope.row.img!==''" :src="'http://localhost:3000'+scope.row.img" alt="" class="cateImg">
                    </div>
                </template>
             </el-table-column>
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
                    <el-row>
                        <el-button type="primary" :icon="Edit" circle 
                        @click="handleEdit(scope.row.id)" 
                        />
                        <el-button type="success" icon="InfoFilled" circle />
                        <el-button type="danger" :icon="Delete" circle 
                        @click="handleDelete(scope.row.id)"
                        />
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
    <el-dialog v-model="$store.state.BannerStore.isAddBannerClose" title="轮播图添加" >
        <AddBanner  />
    </el-dialog>
    <el-dialog v-model="$store.state.BannerStore.isEditBannerClose" title="轮播图编辑" :destroy-on-close=true>
        <EditBanner :RowId="RowId" />
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
import { computed,ref} from 'vue'
import { useStore } from 'vuex';
import { AddBanner,EditBanner} from '@/layout/components/Main';
import {delbanner} from "@/api/商城管理/轮播图管理"
const store = useStore();
// 发送Ajax
store.dispatch("setBannerList");
const filterTableData = computed(() =>
    store.state.BannerStore.BannerList.list
)
// console.log("11111111111111111111111111111111",store.state.BannerStore.BannerList.list);
// 编辑功能
let RowId = ref(undefined)
const handleEdit = (index) => {
    console.log(index)
    RowId.value = index
}
// 删除功能
async function DelBannerList(data){
  let res =  await delbanner(data);
    console.log("res:",res);
    store.commit("updataBannerList",res.list)
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
      DelBannerList(List);
      location.reload();
    })
    .catch(() => {
        ElMessage({
        type: 'info',
        message: '您已取消',
      })
    })
}
// 打开新增功能的模态框
function openModels(){
    store.commit("updataisAddBannerClose",true)
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