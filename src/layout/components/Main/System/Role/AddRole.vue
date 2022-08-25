<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
      :size="formSize" status-icon>
      <el-form-item label="角色名称" required>
        <el-input v-model="ruleForm.rolename" />
      </el-form-item>

    <el-form-item label="权限" >
    <el-tree
    :data="AsideMenus"
    show-checkbox
    node-key="id"
    default-expand-all
    :props="defaultProps"
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
import {AddRole} from "@/api/系统设置/系统设置里的角色管理"
let store = useStore();
let ruleFormRef = ref("");

const defaultProps = {
  children: 'children',
  label: 'title',
}

const ruleForm = reactive({
  rolename:"",  
  menus:[],
  status:1,
});
let AsideMenus= JSON.parse(store.state.userStore.MenuList)
// console.log("111111111111111111111",ruleForm.menus);
function handleCheck(data,Node){
    console.log("11111111111111",Node);
    // newMenus.push(data);
    ruleForm.menus = [...Node.halfCheckedKeys,...Node.checkedKeys]
}
async function addRole(){
    let res = await AddRole(ruleForm);
    console.log(res);
}
function submitForm(){
    store.commit("updataIsAddClose",false)
    addRole();
    location.reload();
}
</script>

<style lang="scss" scoped>

</style>