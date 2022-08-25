<template>
    <div class="common-layout" :ref="$store.state.headerStore.full">
        <el-container>
            <el-aside :style="{ width: $store.state.menuStore.isCollapse ? '200px' : '50px' }" class="Aside">
                <Aside />
            </el-aside>
            <el-container>
                <el-header class="Header">
                    <Header />
                </el-header>
            
                <el-main class="Main">
                    <!-- 标签页 -->
                    <div class="target">
                        <el-scrollbar>
                             <el-tag checked :effect="activePath==item.path?'dark':'plain'" :closable="index" style="margin-right: 8px" v-for="(item,index) in tags" :key="item.path" :style="{maginLeft:index?'5px':'0px'}" 
                             @click="goPage(item.path)"
                             @close="closeTag(index)"
                             class="Tag"
                             >{{item.name}}</el-tag>
                        </el-scrollbar>
                    </div>
                    <el-scrollbar height="600px">
                        <div class="page_view">
                            <router-view v-slot="{ Component }">
                            <transition name="fade-transform" mode="out-in" :duration="{ enter: 400, leave: 400 }"
                                appear>
                                <!-- 动态组件 -->
                                <component :is="Component" />
                            </transition>
                        </router-view>
                        </div>
                     </el-scrollbar>
                </el-main>

            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Header from "./Header.vue";
import Aside from "./Aside.vue";
import { useRoute } from 'vue-router'
import {reactive,watch,ref} from "vue";
import router from "@/router";
import { useStore } from 'vuex';
const store = useStore();
store.dispatch("setGoodsListTotal");
store.dispatch("setSpecsListTotal");
store.dispatch("setAdminListTotal")
// 标签页
let tags = reactive([]);
const route = useRoute();
const activePath = ref("");
watch( () => route,
       (to)=>{
  activePath.value = to.fullPath;

    // 判断 tags 是否存在 tag
    const hasTag = tags.find((item) => item.path === to.fullPath);
    if (!hasTag) {
      tags.push({
        name: to.meta.title,
        path: to.fullPath,
      });
    }
  },
  {
    deep: true,
    immediate: true,
  }
    
)
function goPage(path){
    router.push(path)
}
function closeTag(idx){
  tags.splice(idx, 1);
  router.push(tags[idx - 1].path);
}
</script>

<style lang="scss" scoped>
.Header {
    background-color: #FF3CAC;
    background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
    width: 100%;
    height: 70px;
    line-height: 70px;
    border-radius: 0 !important;

}

.Aside {
    height: 100vh;
    z-index: 1001;
    background-color: #304156;
    // transition-property: width;/* 需要参与过渡的属性 */
    // transition-duration: 0.4s;/* 过渡动画的持续时间 */
    // transition-timing-function:  ease-out;/* 动画过渡的动画类型 */
    transition: width 0.4s ease-out;
    overflow: hidden;
}

.Main {
    padding: 0;
    margin: 0;
    background-color: #F5F5F5;
    // width: calc(100vw - 180px);
    height: calc(100vh - 115px);
    width: 100%;
    // overflow: hidden;
}
.el-scrollbar{
    height: 600px !important;

}
.target {
    height: 30px;
    // width: 100%;
    background-color: wheat;
    display: flex;
    flex-wrap: nowrap;
    cursor: pointer;
}
.Tag{
    position: relative;
    top: 3px !important;
}
.page_view {
  padding: 12px;
  /* background-color: #eee; */
}
.el-scrollbar__thumb {
  background: #046cfd;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>