<template>
    <div class="MenuBox">
        <div>
            <el-button type="primary" class="addBtn" @click="openModules">添加</el-button>
        </div>
        <el-table :data="filterTableData" style="width: 100%" row-key="id">
            <el-table-column label="ID" prop="id" sortable />
            <el-table-column label="属性名" prop="specsname"  />
            <el-table-column label="属性值" prop="attrs">
                 <template v-slot="scope">
                    <div>
                        <el-tag v-for="item in scope.row.attrs" type="success">{{item}}</el-tag>
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
                         @click="handleEdit(scope.row.id, scope.row.pid)" 
                        />
                        <el-button type="success" icon="InfoFilled" circle />
                        <el-button type="danger" :icon="Delete" circle
                         @click="handleDelete(scope.row.id)" />
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
    <el-dialog v-model="$store.state.SpecsStore.isAddSpecsClose" title="商品规格添加" >
    <AddSpecs  />
    </el-dialog>
    <el-dialog v-model="$store.state.SpecsStore.isEditSpecsClose" title="商品规格编辑" :destroy-on-close=true>
        <EditSpecs :RowId="RowId" />
    </el-dialog>
    </div>
</template>

<script setup>
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
import { AddSpecs,EditSpecs }from "@/layout/components/Main"
import {delspecs} from "@/api/商城管理/商品规格"
const store = useStore();
const search = ref('')
const pageSize = [5, 10, 20, 30];
// 获取分页栏里的总条数
// store.dispatch("setSpecsListTotal")
let Total = store.state.SpecsStore.SpecsListTotal[0].total;
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
    store.dispatch("setSpecsList", getData);
};
function handleCurrentChange(page) {
    Page.value = page;
   let getData = ({
        page: Page.value,
        size: Size.value
    })
    // 参数发生变化时再次发送Ajax
    store.dispatch("setSpecsList", getData);
}
let data = {
    page: Page.value,
    size: Size.value
}
// 发送Ajax
store.dispatch("setSpecsList", data);
const filterTableData = computed(() =>
    store.state.SpecsStore.SpecsList
)
//编辑功能
let RowId = ref(undefined)
const handleEdit = (index, row) => {
    console.log(index, row)
    RowId.value = index;
    store.commit("updataEditSpecsClose",true)
}
// 删除功能
async function DelSpecsList(data){
  let res =  await delspecs(data);
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
      DelSpecsList(List);
      location.reload();
    })
    .catch(() => {
        ElMessage({
        type: 'info',
        message: '您已取消',
      })
    })
}
// 打开商品规格添加模态框
function openModules(){
    store.commit("updataAddSpecsClose",true);
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