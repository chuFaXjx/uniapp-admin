<template>
    <div class="MenuBox">
        <div>
            <el-button type="primary" class="addBtn" @click="openModles">添加</el-button>
        </div>
        <el-table :data="filterTableData" style="width: 100%" row-key="id">
            <el-table-column label="ID" prop="id" sortable />
            <el-table-column label="商品名称" prop="goodsname" />
            <el-table-column label="分类ID" prop="specsid">
            </el-table-column>
            <el-table-column label="是否是新品" prop="isnew">
                <template v-slot="scope">
                    <div>
                        <el-switch v-model="SwichValue1" v-if="scope.row.isnew == 1" :name="scope.row.goodsname" />
                        <el-switch v-model="SwichValue2" v-else="scope.row.isnew==0" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="是否是热卖" prop="ishot">
                <template v-slot="scope">
                    <div>
                        <el-switch v-model="SwichValue1" v-if="scope.row.ishot == 1" />
                        <el-switch v-model="SwichValue2" v-else="scope.row.ishot==0" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="展示图" prop="img">
                <template v-slot="scope">
                    <div>
                        <img v-if="scope.row.img !== ''" :src="'http://localhost:3000' + scope.row.img" alt=""
                            class="cateImg">
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="市场价格" prop="market_price">
            </el-table-column>
            <el-table-column label="售价" prop="price">
            </el-table-column>
            <el-table-column label="有多少存货" prop="second_cateid">
            </el-table-column>
            <el-table-column label="商品分类" prop="secondcatename">
            </el-table-column>
            <el-table-column label="商品样式" prop="specsattr">
                <template v-slot="scope">
                    <div>
                        <el-tag type="success">{{ scope.row.specsattr }}</el-tag>
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
                    <el-row style="display:flex;flex-wrap: nowrap;">
                        <el-button type="primary" :icon="Edit" circle />
                        <!-- <el-button type="success" icon="InfoFilled" circle /> -->
                        <el-button type="danger" :icon="Delete" circle @click="handleDelete(scope.row.id)" />
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <div class='pageBox'>
            <div class="demo-pagination-block">
                <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4" :page-sizes="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="Total"
                    @current-change="handleCurrentChange" pager-count='5' class='Page' />
            </div>
        </div>
        <el-dialog v-model="$store.state.GoodsStore.isAdGoodsClose" title="商品添加">
            <AddGoods />
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
import { computed, ref, reactive, } from 'vue'
import { useStore } from 'vuex';
import { AddGoods } from '@/layout/components/Main';
import { delgoods } from "@/api/商城管理/商品管理"
const store = useStore();
const search = ref('')
const pageSize = reactive([5, 10, 20, 30]);
const SwichValue1 = ref(true);
const SwichValue2 = ref(false);
// 获取分页栏里的总条数 
// store.dispatch("setGoodsListTotal")
let Total = store.state.GoodsStore.GoodslistTotal[0].total;
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
    store.dispatch("setGoodsList", getData);
};
function handleCurrentChange(page) {
    Page.value = page;
    let getData = ({
        page: Page.value,
        size: Size.value
    })
    // 参数发生变化时再次发送Ajax
    store.dispatch("setGoodsList", getData);
}
let data = {
    page: Page.value,
    size: Size.value
}
// 发送Ajax
store.dispatch("setGoodsList", data);


const filterTableData = computed(() =>
    store.state.GoodsStore.GoodsList
)
console.log("@@@@@@@@@@@@@@", store.state.GoodsStore.GoodsList);
const handleEdit = (index, row) => {
    console.log(index, row)
}
// 删除功能
async function DelGoodsList(data) {
    let res = await delgoods(data);
    console.log("res:", res);
    // store.commit("setCateList",res.list)
}
const handleDelete = (index) => {
    let List = {
        id: index
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
            DelGoodsList(List);
            //   location.reload();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '您已取消',
            })
        })
}
// 添加功能
function openModles() {
    store.commit("updataisAdGoodsClose", true)
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