<template>
    <div class="MenuBox">
        <div>
             <el-button type="primary" class="addBtn" @click="openModules">添加</el-button>
        </div>
        <el-table :data="filterTableData" style="width: 100%" row-key="id">
            <el-table-column label="ID" prop="id" sortable />
            <el-table-column label="菜单名字" prop="title" />
            <el-table-column label="状态" prop="status">
                <template v-slot="scope">
                    <div>
                        <el-tag v-if="scope.row.status">已启用</el-tag>
                        <el-tag class="ml-2" type="danger" v-else>已禁用</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="类型" prop="type">
                <template v-slot="scope">
                    <div>
                        <el-tag class="ml-2" type="success" v-if="scope.row.type == 1">多级菜单</el-tag>
                        <el-tag v-else-if="scope.row.type == 2">单级菜单</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="图标" prop="icon">
                <template v-slot="scope">
                    <div>
                        <el-icon v-if="scope.row.icon">
                            <component :is="setIcon(scope.row.icon)"></component>
                        </el-icon>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="地址" prop="url" />
            <el-table-column align="right">
                <template #default="scope">
                    <el-row>
                        <el-button type="primary" :icon="Edit" circle 
                        @click="handleEdit(scope.row.id, scope.row.pid)" 
                         />
                        <el-button type="success" icon="InfoFilled" circle />
                        <el-button type="danger" :icon="Delete" circle 
                        @click="handleDelete(scope.row.id)" />
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <div class = 'pageBox'>
        <div class="demo-pagination-block">
            <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4"
                :page-sizes="[5, 10, 20, 30]"
                layout="total, sizes, prev, pager, next, jumper" :total="idx" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" pager-count='5' class='Page'/>
        </div>

        </div>
    <el-dialog v-model="$store.state.userStore.isclose" title="添加菜单">
        <AddMenu />
  </el-dialog>
    <el-dialog v-model="$store.state.userStore.isEditClose" title="编辑菜单" :destroy-on-close=true>
       <EditMenu :RowId="RowId" />
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
// import {MessageBox} from "@/layout/components/Main/components"
import { computed, ref,reactive,} from 'vue'
import { useStore } from 'vuex';
import {useRouter} from "vue-router";
import {AddMenu,EditMenu} from '@/layout/components/Main' 
const router = useRouter()
const store = useStore();
const search = ref('')
const filterTableData = computed(() =>
    JSON.parse(store.state.userStore.MenuList)
)

// 菜单删除功能
const handleDelete = (index) => {
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
      store.dispatch("DeleteMenulist",{id:index});
    })
    .catch(() => {
        ElMessage({
        type: 'info',
        message: '您已取消',
      })
    })

}

function setIcon(icon) {
    return icon.slice(8);
}
// 获取分页栏里的总条数
// 定义一个计数器
let idx = 0;
for(let i =0;i<JSON.parse(store.state.userStore.MenuList).length;i++){
    idx++;
};
let pageSize4 = ref(10);
// 新增菜单功能
// 打开模态框
function openModules(){
    store.commit("updataIsclose",true)
}
// 编辑功能
let RowId = ref(undefined)
const handleEdit = (index, row) => {
    store.commit("updataisEditClose",true)
    console.log(index);
    RowId.value = index
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
.pageBox{
    position: relative;
    background-color: white;
    width: 786.6px;
    height: 36px;
}
.Page{
    width: 437.86px;
    height: 30px;
    position: relative;
    left: 100%;
    background-color: white;
}
</style>