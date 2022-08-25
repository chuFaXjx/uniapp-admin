<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
      :size="formSize" status-icon>


      <el-form-item label="轮播图名字" required>
        <el-input v-model="ruleForm.title" />
      </el-form-item>

    <el-form-item label="轮播图图片" >
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
import {getBannertone,editbanner} from "@/api/商城管理/轮播图管理"
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
  img: "",
  title:"",
  id:0,
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

// 获取父元素数据
let props = defineProps({
  RowId: {
    type: Number,
    required: true,
  }
})
// 获取一条轮播图数据
async function getBannerListOne(){
    let res = await getBannertone(props.RowId);
    console.log("1111111",res);
    ruleForm.title = res.list.title;
    ruleForm.id = props.RowId;
    ruleForm.img = res.list.img
    ruleForm.status = res.list.status
    let url = ruleForm.img ? 'http://localhost:3000' + ruleForm.img : ""
    if(url){
      ImgList.push({ name: ruleForm.catename, url })
    }
}
getBannerListOne();
let ImgList = reactive([]);
// 调用添加的Ajax
async function EditBanner(){
    await editbanner(ruleForm);
}

function submitForm() {
    store.commit("updataisAddBannerClose",false);
    EditBanner();   
    //  location.reload();
}
</script>

<style lang="scss" scoped>
</style>
