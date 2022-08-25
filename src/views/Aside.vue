<template>
    <div>
        <!-- 导入侧边导航栏顶部Logo和文字 -->
        <div class="box">
            <img src="../assets/logo图标.png" alt="" class="LogoImg">
            <span class="TitleFont" v-show="$store.state.menuStore.isCollapse">M商城管理系统</span>
        </div>
        <!-- 导入侧边菜单栏组件 -->
        <AsideMenu></AsideMenu>
    </div>
</template>

<script setup>
import AsideMenu from '../components/AsideMenu.vue'
</script>

<style lang="scss" scoped>
.box{
    width: 100%;
}
.LogoImg{
   width: 45px;
   height: 45px;
   position: relative;
   left: 12px;
}
.TitleFont{
    position: relative;
    left: 20px;
    top: -8px;
    color: white;
}
</style>
