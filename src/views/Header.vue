<template>
    <div class="Header">
        <div class="HeaderLeft">
            <el-icon class="ArrowLeft" @click="HideMenu" v-show="isActive">
                <ArrowLeftBold />
            </el-icon>
            <el-icon class="ArrowRight" @click="ShowMenu" v-show="!isActive">
                <ArrowRightBold />
            </el-icon>
            <!-- <span class="HeaderText">数据概览</span> -->
            <!-- 面包屑 -->
            <el-breadcrumb separator="/" class="HeaderText" >
                <el-breadcrumb-item v-for="item in $route.meta.breadcrumb" :key="item">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="HeaderRight">
            <el-icon class="HeaderSearch" @click="ShowSearch">
                <Search />
            </el-icon>
                <input type="text" class="Search" placeholder="搜索菜单" :style="{width:isSearch?'166.4px':'0px' }" @blur="InputBlur" v-focus>
            <el-icon class="HeaderFull" @click="toggle">
                <FullScreen />
            </el-icon>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link UserName">
                    超级管理员<el-icon class="el-icon--right ArrowDown">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="a">
                            <router-link to="/" class="FontStyle">首页</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item command="b" @click="HandleExit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref,watchEffect,reactive,toRefs} from 'vue';
import { is } from '@babel/types';
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useFullscreen } from "@vueuse/core";
import { Search } from '@element-plus/icons-vue';
const store = useStore();
//   const Hide = store.state.menuStore.isCollapse;


const router = useRouter();
const obj = reactive();
let isActive = ref(true)
// 隐藏菜单函数
function HideMenu() {
    // console.log(store.state.menuStore.isCollapse);
    store.commit("handleChange", false);
    isActive.value = !isActive.value;
};
// 显示菜单函数
function ShowMenu() {
    // console.log(store.state.menuStore.isCollapse);
    store.commit("handleChange", true);
    isActive.value = !isActive.value;
};
// 退出登录函数
function HandleExit() {
    // console.log(store.state.userStore.token);
    localStorage.removeItem("VUE_ADMIN_TOKEN")
    localStorage.removeItem("VUE_ADMIN_ISLOGIN")
    localStorage.removeItem("VUE_ADMIN_MENU")
    localStorage.removeItem("VUE_ADMIN_LIST")
    localStorage.removeItem("VUE_USER_LIST")
    localStorage.removeItem("VUE_CATE_LIST")
    localStorage.removeItem("VUE_SHOP_ADMIN_USER_INFO")
    localStorage.removeItem("VUE_SPECKILL_LIST")
    localStorage.removeItem("VUE_SPECS_LIST")
    localStorage.removeItem("VUE_BANNER_LIST")
    localStorage.removeItem("VUE_ADMIN_LIST_TOTAL")
    localStorage.removeItem("VUE_SPECS_LIST_TOTAL")
    localStorage.removeItem("VUE_GOODS_LIST_TOTAL")
    router.push({ name: "login" });
    ElMessage({
        showClose: true,
        message: "退出登录",
        type: 'success',
    });
}
// 全屏模式
let {toggle} = useFullscreen(store.state.headerStore.full);
// 显示隐藏搜索框
let isSearch = ref(false)
function ShowSearch(){
    isSearch.value = !isSearch.value;
}
// 失去焦点时隐藏input框
function InputBlur(){
    isSearch.value=false;
}
</script>
<style lang="scss" scoped>
.Header {
    display: flex;
    position: relative;
    color: white;
}

.HeaderLeft {
    position: absolute;
    left: 0;
}

.HeaderRight {
    position: absolute;
    right: 0;
}

.HeaderLogo {
    // width: 30px;
    position: relative;
    top: 10px;
}

.ArrowLeft {
    position: relative;
    top: 5px;
    left: 10px;
    cursor: pointer;
}

.ArrowRight {
    position: relative;
    top: 5px;
    left: 10px;
    cursor: pointer;
}

.HeaderText {
    position: relative;
    top: -40px;
    left: 40px;
    // color: white !important;
    // z-index: 9999;
}

::v-deep(.el-breadcrumb__inner) {
    color: white !important;
}

.HeaderSearch {
    position: relative;
    font-size: 22px;
    top: 5px;
    left: -40px;
    cursor: pointer;
}

.HeaderFull {
    position: relative;
    font-size: 22px;
    top: 5px;
    left: -25px;
    cursor: pointer;
}

.UserName {
    font-size: 17px;
    position: relative;
    left: -10px;
    top: 22px;
    color: white;
}

.ArrowDown {
    position: relative;
    top: 2px;
}

.FontStyle {
    text-decoration: none;
    color: black;
}
.Search{
    position:relative;
    left:-35px;
    top: -1px;
    height: 20px;
    background:rgba($color: #000000, $alpha: 0);
    border: 1px;
    transition: width 0.4s ease-out;
    color: aliceblue;
    outline: none;
}
input::-webkit-input-placeholder { 
  color: #fff; 
} 
/* Mozilla Firefox 4 to 18 */ 
input:-moz-placeholder { 
  color: #fff; 
} 
/* Mozilla Firefox 19+ */ 
input::-moz-placeholder { 
  color: #fff; 
} 
/* Internet Explorer 10+ */ 
input:-ms-input-placeholder { 
  color: #fff; 
}
</style>