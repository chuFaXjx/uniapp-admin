<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
      :size="formSize" status-icon>
      <el-form-item label="角色名称" required>
        <el-input v-model="ruleForm.rolename" />
      </el-form-item>
<!--  -->
    <el-form-item label="权限" >
    <el-tree
    :data="AsideMenus"
    :props="defaultProps"
    show-checkbox
    node-key="id"
    :default-checked-keys="ruleForm.menus"
    default-expand-all
    @check="handleCheck"
  />
      </el-form-item>

     <el-form-item label="状态">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1">
            正常
          </el-radio>
          <el-radio :label="2">
            禁用
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useStore } from "vuex";
import {getRoleList,EditRole} from "@/api/系统设置/系统设置里的角色管理"
let store = useStore();
let ruleFormRef = ref("");

const ruleForm = reactive({
  rolename:"",  
  menus:[],
  status:1,
  id:0,
});
// console.log(store.state.SetUseStore.UserList);
let AsideMenus= JSON.parse(store.state.userStore.MenuList)
const defaultProps = {
  children: AsideMenus.children,
  label: 'title',
}
// console.log(AsideMenus)
// 获取父元素数据
let props = defineProps({
  RowId: {
    type: Number,
    required: true,
  }
})
async function GetRoleList(){
    let res =await getRoleList(props.RowId)
    console.log(res.list);
    ruleForm.rolename = res.list.rolename;
    ruleForm.status = res.list.status;
    ruleForm.menus = res.list.menus.split(",");
    ruleForm.id = props.RowId
    console.log("111111111111111111111",ruleForm.menus);
}

GetRoleList();

// function handleCheck(data,Node){
//   ruleForm.menus = [...Node.halfCheckedKeys,...Node.checkedKeys]
// }
// async function addRole(){
//     let res = await AddRole(ruleForm);
//     console.log(res);
// }
async function editRole(){
    let res = EditRole(ruleForm);
}
function submitForm(){
    store.commit("updataIsEditClose",false)
    editRole();
    location.reload();
}
</script>

<style lang="scss" scoped>

</style>