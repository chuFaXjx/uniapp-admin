<template>
  <div>
    <el-button type="primary" class="addBtn" @click="openModules">添加</el-button>
  </div>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="ID" prop="id" />
    <el-table-column label="用户名" prop="username" />
    <el-table-column align="right">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row.id)" type="success">Edit</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="$store.state.userStore.isclose" title="角色管理">
    <AddUser />
  </el-dialog>

    <el-dialog v-model="$store.state.userStore.isEditClose" title="角色管理" :destroy-on-close=true>
    <EditUser :RowId = "RowId" />
  </el-dialog>
</template>

<script setup>
import { computed, ref, reactive, watch } from 'vue'
import { getuserAll, deluser } from "@/api/user"
import { AddUser,EditUser} from "@/layout/USERADMIN/index"
import { useStore } from 'vuex';

const store = useStore();
// 编辑角色功能
const RowId = ref(undefined)
const handleEdit = (id) => {
  store.commit("updataisEditClose", true)
  RowId.value = id;
}
console.log(RowId);
// 删除角色功能
async function deleUser(data) {
  await deluser(data);
}
const handleDelete = (id) => {
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
      deleUser(id);
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '您已取消',
      })
    })
}
let tableData = reactive([])
// watch(()=>tableData,()=>{
//   console.log(tableData);
// })
async function getAlluser() {
  let res = await getuserAll();
  // console.log(res);
  tableData.value = res;
}
console.log(tableData);
const filterTableData = computed(() =>
  tableData.value
)



getAlluser();

// 添加功能
function openModules() {
  store.commit("updataIsclose", true)
}
</script>

<style lang="scss" scoped>
</style>