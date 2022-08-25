<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
      :size="formSize" status-icon>
      <el-form-item label="类型">
        <el-radio-group v-model="ruleForm.type">
          <el-radio :label='1'>
            目录
          </el-radio>
          <el-radio :label="2">
            菜单
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="上级" v-show="ruleForm.type==2">
        <el-select v-model="ruleForm.pid" placeholder="请选择父级菜单">
          <el-option label="顶级目录" value="0">
          </el-option>
          <el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="标题" >
        <el-input v-model="ruleForm.title" />
      </el-form-item>

      <el-form-item label="网址" v-show="ruleForm.type==2">
        <el-input v-model="ruleForm.url" />
      </el-form-item>

      <el-form-item label="图标" v-show="ruleForm.type == 1">
        <el-input v-model="ruleForm.icon" />
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
        <el-button type="primary" @click="submitForm">立即添加</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>

import { reactive, ref, computed,toRefs } from 'vue'
import { useStore } from "vuex";
import { AddMenuList,getMenuListone } from "@/api/Aside";
let store = useStore();
let ruleFormRef = ref("");
// 表单前带红色星号
const ruleForm = reactive({
  type: 1,
  title: '',
  icon: "",
  status: 1,
  pid: "0",
  url:"",
})

// console.log(ruleForm.type);
let options = JSON.parse(store.state.userStore.MenuList)
// console.log("11111111111111111111", options);
// 表单校验
const rules = reactive({
  // title: [
  //   { required: true, message: '请输入标题', trigger: 'blur' },
  //   { min: 2, max: 10, message: '输入的长度应该是不能小于2且大于10', trigger: 'blur' },
  // ],
})

async function AddMenu(data){
  console.log(data);
  await AddMenuList(data);
}
function  submitForm () {
  store.commit("updataIsclose",false)
  AddMenu(ruleForm);
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
</style>