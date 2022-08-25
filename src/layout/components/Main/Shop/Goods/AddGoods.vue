<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
      :size="formSize" status-icon>

      <el-form-item label="一级目录">
        <el-select v-model="ruleForm.first_cateid" placeholder="请选择父级菜单">
          <el-option v-for="(item,index) in options" :key="item.id" :label="item.catename" :value="index" @click="getIdx(index)"  />
        </el-select>
      </el-form-item>

        <el-form-item label="二级目录">
        <el-select v-model="ruleForm.second_cateid" placeholder="请选择父级菜单">
          <!--[curidx].children  -->
          <el-option v-for="(item,index) in options[curidx].children" :key="item.id" :label="item.catename" :value="index" />
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称" required>
        <el-input v-model="ruleForm.goodsname" />
      </el-form-item>

       <el-form-item label="商品价格" required>
        <el-input v-model="ruleForm.price" />
      </el-form-item>

      <el-form-item label="市场价格" required>
        <el-input v-model="ruleForm.market_price" />
      </el-form-item>

    <el-form-item label="商品图片" >
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

<el-form-item label="商品规格">
        <el-select v-model="ruleForm.specsid" placeholder="请选择父级菜单">
          <el-option label="请选择" :value= '0' >
          </el-option>
          <el-option v-for="(item,index) in optionsspecs" :key="item.id" :label="item.specsname" :value="item.id"  @click='getspecsidx(index)' />
        </el-select>
 </el-form-item>
<!-- spcesIdx -->
 <el-form-item label="规格属性值">
        <el-select v-model="ruleForm.specsattr" placeholder="请选择父级菜单" multiple>
          <el-option v-for="(item,index) in optionsspecs[goodsIdx].attrs" :key="index" :label="item" :value="item"  />
        </el-select>
 </el-form-item>
    
     <el-form-item label="是否是新品">
        <el-radio-group v-model="ruleForm.isnew">
          <el-radio :label="1">
            是
          </el-radio>
          <el-radio :label="0">
            否
          </el-radio>
        </el-radio-group>
      </el-form-item>

         <el-form-item label="是否热卖">
        <el-radio-group v-model="ruleForm.ishot">
          <el-radio :label="1">
            是
          </el-radio>
          <el-radio :label="0">
            否
          </el-radio>
        </el-radio-group>
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

import { reactive, ref} from 'vue'
import { useStore } from "vuex";
import { ElMessage } from 'element-plus'
import { Plus} from '@element-plus/icons-vue'
import {addgoods} from "@/api/商城管理/商品管理"
import { UploadFile } from 'element-plus'
import { keyBy } from 'lodash';
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
let store = useStore();
let ruleFormRef = ref("");
// 表单前带红色星号
const ruleForm = reactive({
  status: 1,
  img: "",
  goodsname:"",
  first_cateid:0,
  second_cateid:0,
  price:"",
  market_price:"",
  description:"",
  specsid:0,
  specsattr:[],
  isnew:1,
  ishot:1,
})
// console.log(store.state.GoodsStore.GoodsList);

let options =store.state.CateStore.CateList;

console.log(options);
let optionsspecs =  store.state.SpecsStore.SpecsList;

console.log(optionsspecs);
// 存储一级目录的索引值
let curidx = ref(0);
function getIdx(idx){
    curidx.value = idx
    console.log(curidx.value);
}
let goodsIdx = ref(0);
function getspecsidx(idx){
    goodsIdx.value = idx 
}
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
async function AddGood(){
    let fromdata = new FormData();
    for(var k in ruleForm ){
        console.log(k);
        fromdata.append(k,ruleForm[k])
    }
     console.log(fromdata);
    
    let res =  await addgoods(fromdata)
    console.log("res:",res);
}

function submitForm() {
    AddGood();
    store.commit("updataisAdGoodsClose",false);
    // location.reload();
}
</script>

<style lang="scss" scoped>
</style>
