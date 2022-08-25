<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
      :size="formSize" status-icon>

      <el-form-item label="昵称" required>
        <el-input v-model="ruleForm.nickname" />
      </el-form-item>

        <el-form-item label="手机号" required>
        <el-input v-model="ruleForm.phone" />
      </el-form-item>

      <el-form-item label="密码" required>
        <el-input v-model="ruleForm.password" placeholder="留空密码为默认" />
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
import { ElMessage } from 'element-plus'
import { Plus} from '@element-plus/icons-vue'
import {getMemberone , editmember} from "@/api/商城管理/会员管理"
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
let store = useStore();
let ruleFormRef = ref("");
let options = store.state.CateStore.CateList
// 表单前带红色星号
const ruleForm = reactive({
  status: 1,
  uid:0,
  nickname:"",
  phone:"",
  password:"",
})
// 获取父元素数据
let props = defineProps({
  RowUid: {
    type: Number,
    required: true,
  }
})
async function getCateListOne(){
    let res = await getMemberone(props.RowUid);
    console.log("1111111",res);
    ruleForm.nickname = res.list.nickname;
    ruleForm.uid = props.RowUid;
    ruleForm.phone = res.list.phone;
    ruleForm.status = res.list.status;
    ruleForm.password = res.list.password
}
getCateListOne();
// 调用编辑的Ajax
async function EditMember(){
    await editmember(ruleForm)
}
function submitForm() {
    store.commit("updataEditMemberClose",false)
    EditMember();
    location.reload();
}
</script>

<style lang="scss" scoped>
</style>
