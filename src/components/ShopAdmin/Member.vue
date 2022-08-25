<template>
    <div class="MenuBox">
        <el-table :data="filterTableData" style="width: 100%" row-key="id">
            <el-table-column label="ID" prop="id" sortable />
            <el-table-column label="有效时间" prop="addtime"  />
            <el-table-column label="会员账号" prop="nickname" />
            <el-table-column label="会员密码" prop="password" />
            <el-table-column label="会员电话" prop="phone" />
            <el-table-column label="randstr" prop="randstr" />
            <el-table-column label="会员卡号" prop="uid" />
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
                    <el-row style="flex-wrap: nowrap;">
                        <el-button type="primary" :icon="Edit" circle
                         @click="handleEdit(scope.row.uid)" 
                        />
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
    </div>
        <el-dialog v-model="$store.state.MemberStore.isEditMemberClose" title="会员编辑" :destroy-on-close=true>
        <EditMember :RowUid="RowUid" />
    </el-dialog>
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
import { EditMember } from '@/layout/components/Main';
const store = useStore();
// 发送Ajax
store.dispatch("setMemberList");
const filterTableData = computed(() =>
    store.state.MemberStore.MemberList.list
)
// 编辑会员信息
// 编辑功能
let RowUid = ref(undefined)
const handleEdit = (uid) => {
    console.log(uid);
    store.commit("updataEditMemberClose",true)
    RowUid.value = uid;
}
// const handleDelete = (index, row) => {
//     console.log(index, row)
// }

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