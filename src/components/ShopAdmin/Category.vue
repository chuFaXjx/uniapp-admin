<template>
   <div class="MenuBox">
        <div>
            <el-button type="primary" class="addBtn" @click="OpenModules">添加</el-button>
        </div>
        <el-table :data="filterTableData" style="width: 100%" row-key="id">
            <el-table-column label="ID" prop="id" sortable />
            <el-table-column label="商品分类" prop="catename" />
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
        <div class = 'pageBox'>
        <div class="demo-pagination-block">
            <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4"
                :page-sizes="[5, 10, 20, 30]"
                layout="total, sizes, prev, pager, next, jumper" :total="idx" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" pager-count='5' class='Page'/>
        </div>
        </div>
    <el-dialog v-model="$store.state.CateStore.isEditClose" title="商品分类编辑" :destroy-on-close=true>
        <EditCate :RowId="RowId" />
    </el-dialog>
    <el-dialog v-model="$store.state.CateStore.isAddClose" title="商品分类添加" >
        <AddCate  />
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
} from '@element-plus/icons-vue';
    import {useStore} from "vuex";
    import { computed, ref, toRaw } from 'vue'
    import {EditCate,AddCate} from "@/layout/components/Main"
    import {delcate} from "@/api/商城管理/商品分类管理";
    let store = useStore();
    store.dispatch("CateListSet");
    const search = ref('')
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@",store.state.CateStore.CateList);
 const filterTableData = computed(() =>
    store.state.CateStore.CateList
)
// 编辑功能
let RowId = ref(undefined)
const handleEdit = (index, row) => {
    console.log(index, row)
    store.commit("updataIsEditClose",true)
    RowId.value = index

}
// 删除功能
async function DelCateList(data){
  let res =  await delcate(data);
    console.log("res:",res);
    store.commit("GoodsList",res.list)
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
      DelCateList(List);
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
for (let i = 0; i < store.state.CateStore.CateList.length; i++) {
    idx++;
};
// 给分页栏设置初始显示条数；
let pageSize4 = ref(10);
// 新增功能
function OpenModules(){
    store.commit("updataIsAddCloss",true);
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
.cateImg{
    width: 100px;
    height: 100px;
}
</style>