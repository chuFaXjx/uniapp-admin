<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
      :size="formSize" status-icon>
      <el-form-item label="类型">
        <el-radio-group v-model="ruleForm.type" disabled>
          <el-radio :label='1'>
            目录
          </el-radio>
          <el-radio :label="2">
            菜单
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="上级" v-show="ruleForm.type == 2">
        <el-select v-model="ruleForm.pid" placeholder="请选择父级菜单">
          <el-option label="顶级目录" value="0">
          </el-option>
          <el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="标题" required>
        <el-input v-model="ruleForm.title" />
      </el-form-item>

      <el-form-item label="网址" v-show="ruleForm.type == 2">
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
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>

import { reactive, ref } from 'vue'
import { useStore } from "vuex";
import { getMenuListone,EditMenu,} from "@/api/Aside";
let store = useStore();
let ruleFormRef = ref("");
// 表单前带红色星号
const ruleForm = reactive({
  type: 1,
  title: '',
  icon: "",
  status: 1,
  pid: "0",
  url: "",
  id:0,
})

// console.log(ruleForm.type);
let options = JSON.parse(store.state.userStore.MenuList)
// console.log("11111111111111111111", options);
// 获取一条菜单信息
let props = defineProps({
  RowId: {
    type: Number,
    required: true,
  }
})
async function getMenulist(){
  let res = await getMenuListone(props.RowId);
  // console.log("11111111111111111111111111",res);
  ruleForm.type = res.list.type;
  ruleForm.pid = res.list.pid;
  ruleForm.status = res.list.status;
  ruleForm.url = res.list.url;
  ruleForm.icon = res.list.icon;
  ruleForm.title = res.list.title;
  ruleForm.id = props.RowId
}
getMenulist()
async function EditMenuList(data){
  let resEdit =  await EditMenu(data);
}
async function submitForm() {
  store.commit("updataisEditClose", false);
  // console.log("111111111111111111111",AllMenulistRes);
  EditMenuList(ruleForm);
}
</script>

<style lang="scss" scoped>
</style>