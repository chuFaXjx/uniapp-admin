<template>
    <div class="MenuBox">
        <div>
            <el-button type="primary" class="addBtn" @click="openModules">添加</el-button>
        </div>
        <el-table :data="filterTableData" style="width: 100%" row-key="id">
            <el-table-column label="角色ID" prop="roleid" sortable />
            <el-table-column label="角色账号" prop="username" />
            <el-table-column label="角色密码" prop="password" />
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
                <!-- <el-icon><InfoFilled /></el-icon> -->
                    <el-row>
                        <el-button type="primary" icon="Edit" circle 
                        @click="handleEdit(scope.row.uid)"
                        />
                        <el-button type="success" icon="InfoFilled" circle />
                        <el-button type="danger" icon="Delete" circle 
                        @click="handleDelete(scope.row.uid)"
                        />
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <div class='pageBox'>
            <div class="demo-pagination-block">
                <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4" :page-sizes="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="Total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" pager-count='5' class='Page' />
            </div>
        </div>
    <el-dialog v-model="$store.state.AdminerStore.isAddAdClose" title="管理员添加" >
        <AddAdminer  />
    </el-dialog>
    <el-dialog v-model="$store.state.AdminerStore.isEditAdClose" title="管理员编辑" :destroy-on-close=true>
    <EditAdminer :RowId="RowId" />
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
import { computed, ref } from 'vue'
import { useStore } from 'vuex';
import {AddAdminer,EditAdminer} from '@/layout/components/Main';
import {DelAdminer} from "@/api/系统设置/系统设置里的管理员设置"
const store = useStore();
const search = ref('')
const pageSize = [5, 10, 20, 30];
// 获取分页栏里的总条数
// store.dispatch("setAdminListTotal")
let Total = store.state.AdminerStore.AdminListTotal[0].total;
// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!", Total);
// 给分页栏设置初始显示条数；
let pageSize4 = ref(10);
// 定义两个响应式数据用来传递Ajax参数
var Size = ref("10");
var Page = ref("1");
function handleSizeChange(size) {
    Size.value = size
    let getData = ({
        page: Page.value,
        size: Size.value
    })
    // 参数发生变化时再次发送Ajax
    store.dispatch("AdminSet", getData);
};
function handleCurrentChange(page) {
    Page.value = page;
   let getData = ({
        page: Page.value,
        size: Size.value
    })
    // 参数发生变化时再次发送Ajax
    store.dispatch("AdminSet", getData);
}
let data = {
    page: Page.value,
    size: Size.value
}
// 发送Ajax
store.dispatch("AdminSet", data);
const filterTableData = computed(() =>
    store.state.AdminerStore.AdminList
)
// 编辑功能
let RowId = ref(undefined)
const handleEdit = (index, row) => {
    store.commit("updataIsAdEditClose",true)
    RowId.value = index
    console.log(RowId.value);
}
//删除功能
async function DelAdminerList(data){
  let res =  await DelAdminer(data);
    console.log("res:",res);
}
const handleDelete = (index, row) => {
     let List = {
        uid:index
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
      DelAdminerList(List);
      location.reload();
    })
    .catch(() => {
        ElMessage({
        type: 'info',
        message: '您已取消',
      })
    })
}
// 打开添加模态框
function openModules(){
    store.commit("updataIsAdAddClose",true)
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