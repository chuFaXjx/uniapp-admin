<template>
    <el-form :model="form" label-width="120px">
        <el-form-item label="用户名">
            <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password" placeholder="密码为空为原密码" />
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
import { getuserone, edituserone } from "@/api/user"

const store = useStore();
let form = reactive({
    username: '',
    password: "",
    id: ''
})
// async function AddUser (data){
//     await adduser(data)
// }
let props = defineProps({
    RowId: {
        type: Number,
        required: true,
    },  
})
let emit = defineEmits(['getAlluser'])
// console.log("1111111111111111111111111111",emit);
// console.log(props.RowId);
async function getUserOne() {
    let res = await getuserone(props.RowId);
    form.username = res[0].username
    form.id = res[0].id
    console.log(res);
}
getUserOne();

// 调用编辑接口
async function EditUser() {
    await edituserone(form);
}
// console.log(form);
const onSubmit = () => {
    EditUser()
    emit.getAlluser;
    store.commit("updataisEditClose", false)
}
const onCancel = () => {
    store.commit("updataisEditClose", false)
}
</script>
