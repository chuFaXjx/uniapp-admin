<template>
    <div class="MenuBox">
        <div>
            <el-button type="primary" class="addBtn" @click="OpenModules">添加</el-button>
        </div>
        <el-table :data="filterTableData" style="width: 100%" row-key="id">
            <el-table-column label="ID" prop="id" sortable />
            <el-table-column label="所拥有菜单权限" prop="menus" />
            <el-table-column label="角色名字" prop="rolename" />
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
                        <el-button type="primary" :icon="Edit" circle @click="handleEdit(scope.row.id, scope.row.pid)" />
                        <el-button type="success" icon="InfoFilled" circle />
                        <el-button type="danger" :icon="Delete" circle  @click="handleDelete(scope.row.id)" />
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <div class='pageBox'>
            <div class="demo-pagination-block">
                <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4"
                    :page-sizes="[5, 10, 20, 30]" layout="total, sizes, prev, pager, next, jumper" :total="idx"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" pager-count='5'
                    class='Page' />
            </div>
        </div>
    <el-dialog v-model="$store.state.SetUseStore.isAddClose" title="角色添加" >
        <AddRole  />
    </el-dialog>
    <el-dialog v-model="$store.state.SetUseStore.isEditClose" title="角色编辑" :destroy-on-close=true>
        <EditRole :RowId="RowId" />
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

import { computed, ref, toRaw } from 'vue'
import { useStore } from 'vuex';
import {AddRole ,EditRole} from "@/layout/components/Main"
import {DelRole} from '@/api/系统设置/系统设置里的角色管理'
const store = useStore();
const search = ref('')
store.dispatch("UserSet");
// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!",res);
const filterTableData = computed(() =>
    store.state.SetUseStore.UserList
)
//编辑事件
let RowId = ref(undefined)
const handleEdit = (index, row) => {
     store.commit("updataIsEditClose",true);
     RowId.value = index;
}
// 删除事件
async function DelRoleList(data){
  let res =  await DelRole(data);
    console.log("res:",res);
    store.commit("setCateList",res.list)
}
const handleDelete = (index, row) => {
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
      DelRoleList(List);
      location.reload();
    })
    .catch(() => {
        ElMessage({
        type: 'info',
        message: '您已取消',
      })
    })
}

// 获取分页栏里的总条数
// 定义一个计数器
let idx = 0;
for (let i = 0; i < JSON.parse(JSON.stringify(store.state.SetUseStore.UserList)).length; i++) {
    idx++;
};
// 给分页栏设置初始显示条数；
let pageSize4 = ref(10);
// 点击新增显示模态框
function OpenModules (){
    store.commit("updataIsAddClose",true)
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