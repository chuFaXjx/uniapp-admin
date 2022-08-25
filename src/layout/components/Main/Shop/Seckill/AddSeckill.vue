<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
      :size="formSize" status-icon>

      <el-form-item label="活动名称" required>
        <el-input v-model="ruleForm.title" />
      </el-form-item>

     <el-form-item label="活动时间" required>
      <el-date-picker
      v-model="value1"
      type="datetimerange"
      :shortcuts="shortcuts"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
    />
      </el-form-item>
      
        <el-form-item label="一级目录">
        <el-select v-model="ruleForm.first_cateid" placeholder="请选择父级菜单">
          <el-option label="请选择" :value= '0' >
          </el-option>
          <el-option v-for="(item,index) in options" :key="index" :label="item.catename" :value="item.id" @click="GetOneIdx(index)" />
        </el-select>
      </el-form-item>


     <el-form-item label="二级目录">
        <el-select v-model="ruleForm.second_cateid" placeholder="请选择父级菜单">
          <el-option label="请选择" :value= '0' >
          </el-option>
          <el-option v-for="(item,index) in options[OneIdx].children" :key="index" :label="item.catename" :value="item.id"  />
        </el-select>
      </el-form-item>

     <el-form-item label="选择商品">
        <el-select v-model="ruleForm.goodsid" placeholder="请选择父级菜单">
          <el-option label="请选择" :value= '0' >
          </el-option>
          <el-option v-for="(item,index) in Goods " :key="item.id" :label="item.goodsname" :value="item.id"  />
        </el-select>
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
import {addseckill} from "@/api/商城管理/秒杀活动"
let store = useStore();
let ruleFormRef = ref("");
let options = store.state.CateStore.CateList
const value1 = ref(["",""])
// console.log(value1);

// 表单前带红色星号
const ruleForm = reactive({
  status: 1,
  endtime: "",
  begintime: "",
  first_cateid:0,
  second_cateid:0,
  title:"",
  goodsid:0,
})
console.log("1111111111111111111",options);
let Goods = store.state.GoodsStore.GoodsList
console.log("2222222222222222222222",store.state.GoodsStore.GoodsList);


let OneIdx = ref(0);
function GetOneIdx(idx){
    OneIdx.value = idx;
}
// 调用添加的Ajax
async function AddSeckill(){
 ruleForm.begintime = value1.value[0].getTime();
ruleForm.endtime = value1.value[1].getTime()
    let res =  await addseckill(ruleForm)
    console.log("res:",res);

}

function submitForm() {
    AddSeckill();
    store.commit("updataIsAddSeckillClose",false);
    location.reload();
}
</script>

<style lang="scss" scoped>
</style>
