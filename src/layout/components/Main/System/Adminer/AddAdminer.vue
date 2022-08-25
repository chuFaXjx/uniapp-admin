<template>
  <div>
    <el-form ref="ruleFormRef" :model="rolename" :rules="rules" label-width="120px" class="demo-ruleForm"
      :size="formSize" status-icon>

      <el-form-item label="角色名称">
        <el-select v-model="ruleForm.roleid" placeholder="请选择角色">
          <el-option label="请选择" :value= 0 >
          </el-option>
          <el-option v-for="item in options" :key="item.id" :label="item.rolename" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="管理员名称" required>
        <el-input v-model="ruleForm.username" />
      </el-form-item>

        <el-form-item label="管理员密码" required>
        <el-input v-model="ruleForm.password" />
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
import {AddAdminer} from "@/api/系统设置/系统设置里的管理员设置"
let store = useStore();
let ruleFormRef = ref("");
let options = store.state.SetUseStore. UserList
console.log(store.state.SetUseStore. UserList);
const ruleForm = reactive({
  status: 1,
  roleid: 0,
  username:"",
  password:"",

})
async function addadminer(){
    let res = await AddAdminer(ruleForm);
    console.log(res);
}
function submitForm(){
    store.commit("updataIsAdAddClose",false)
    addadminer();
    location.reload();
}

</script>

<style lang="scss" scoped>

</style>