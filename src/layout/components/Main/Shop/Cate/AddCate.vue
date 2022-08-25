<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
      :size="formSize" status-icon>

      <el-form-item label="上级">
        <el-select v-model="ruleForm.pid" placeholder="请选择父级菜单">
          <el-option label="顶级目录" value= '0' >
          </el-option>
          <el-option v-for="item in options" :key="item.id" :label="item.catename" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="家电名称" required>
        <el-input v-model="ruleForm.catename" />
      </el-form-item>

    <el-form-item label="上传图片" >
   <el-upload action="#" list-type="picture-card" :auto-upload="false" :file-list="ImgList" :on-change="ChangeImg">
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
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
import {addcate} from "@/api/商城管理/商品分类管理"
import { UploadFile } from 'element-plus'
import { keyBy } from 'lodash';
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
let store = useStore();
let ruleFormRef = ref("");
let options = store.state.CateStore.CateList
// 表单前带红色星号
const ruleForm = reactive({
  status: 1,
  pid: "0",
  img: "",
  id:0,
  catename:"",
})

function ChangeImg (file){
    ruleForm.img = file.raw
}

const handleRemove = (file) => {
     file.url = "";
     dialogVisible.value = false
}

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const handleDownload = (file) => {
  console.log(file)
}

// 调用添加的Ajax
async function AddCate(){
    let fromdata = new FormData();
    for(var k in ruleForm ){
        // console.log(k);
        fromdata.append(k,ruleForm[k])
      
    }
 
    let res =  await addcate(fromdata)
    console.log("res:",res);

}

function submitForm() {
    AddCate();
    store.commit("updataIsAddCloss",false);
    // location.reload();
}
</script>

<style lang="scss" scoped>
</style>
