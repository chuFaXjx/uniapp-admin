<template>
  <div>
    <el-form ref="ruleFormRef" :model="rolename" :rules="rules" label-width="120px" class="demo-ruleForm"
      :size="formSize" status-icon>

      <el-form-item label="角色名称">
        <el-select v-model="ruleForm.data.roleid" placeholder="请选择管理员">
          <el-option label="请选择" :value= 0 >
          </el-option>
          <el-option v-for="item in options" :key="item.id" :label="item.rolename" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="管理员名称" required>
        <el-input v-model="ruleForm.data.username" />
      </el-form-item>

        <el-form-item label="管理员密码">
        <el-input v-model="ruleForm.data.password" placeholder="留空为不修改密码"/>
      </el-form-item>

     <el-form-item label="状态">
        <el-radio-group v-model="ruleForm.data.status">
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
import {getAdminerOne,EditAdminer} from "@/api/系统设置/系统设置里的管理员设置"
let store = useStore();
let ruleFormRef = ref("");
let options = store.state.SetUseStore. UserList
console.log(store.state.SetUseStore. UserList);
const ruleForm = reactive({
  data:{
  uid:"",
  status: 1,
  roleid: 0,
  username:"",
  password:"",
  },

})
// 获取父元素数据
let props = defineProps({
  RowId: {
    type: Number,
    required: true,
  }
})
// console.log(props.RowId);
async function getadminone(){
    let res = await getAdminerOne(props.RowId)
    console.log("res=",res);
    ruleForm.data.uid=props.RowId;
    ruleForm.data.username=res.list.username;
    ruleForm.data.status = res.list.status;
    ruleForm.data.roleid = res.list.roleid;
}
getadminone();
async function editadminer(){
    let Res = await EditAdminer(ruleForm.data)
}
function submitForm(){
    store.commit("updataIsAdAddClose",false)
    editadminer();
    location.reload();
}

</script>

<style lang="scss" scoped>

</style>