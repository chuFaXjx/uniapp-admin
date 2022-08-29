<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="onCancel">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex';
import { adduser } from "@/api/user"

const store = useStore();
let  form = reactive({
  username: '',
  password:""
})
let emit = defineEmits(['getAlluser'])

async function AddUser (data){
    await adduser(data)
}
// console.log(form);
const onSubmit = () => {
  AddUser(form)
  emit.getAlluser;
  store.commit("updataIsclose",false)
}
const onCancel = () =>{
    store.commit("updataIsclose",false)
}
</script>
