<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
      :size="formSize" status-icon>

      <el-form-item label="属性名" required>
        <el-input v-model="ruleForm.specsname" />
      </el-form-item>

        <el-form-item label="属性值" >
            <el-input  style='width: 150px;' v-model="FirstInputValue"></el-input>
            <el-button type="success" style="margin-left: 30px;" @click="AddInput">添加属性</el-button>
        </el-form-item>
        <div style="margin-left: 120px; margin-top: 20px;" v-for="(item,index) in idx" :key="index">
            <el-input style='width: 150px;' v-model="keyValue[index]"></el-input>
            <el-button type="danger" style="margin-left: 30px;" @click="DelInput">删除属性</el-button>
        </div>
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
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { Plus} from '@element-plus/icons-vue'
import {addspecs} from "@/api/商城管理/商品规格"
let store = useStore();
let ruleFormRef = ref("");
let options = store.state.CateStore.CateList
// 表单前带红色星号
const ruleForm = reactive({
  status: 1,
  specsname:"",
  attrs:'',
})

let idx = ref(0);
// 点击添加添加Input框
let FirstInputValue = ref("")
let keyValue= reactive([]);
function AddInput(){
    idx.value++;
}
function DelInput(){
    idx.value--
}
console.log(store.state.SpecsStore.SpecsList);
// 调用添加的Ajax
async function AddSpecsList(data){
    keyValue.push(FirstInputValue.value);
    ruleForm.attrs=String(keyValue);
    await addspecs(data);
}

function submitForm() {
    store.commit("updataIsAddCloss",false);
    AddSpecsList(ruleForm);
    console.log(ruleForm);
    
}
</script>

<style lang="scss" scoped>
</style>
