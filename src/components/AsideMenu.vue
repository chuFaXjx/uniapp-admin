<template>
    <!-- 使用elevemt+ 插件创建侧边导航栏菜单 -->
    <el-menu class="el-menu-vertical-demo" :collapse="!$store.state.menuStore.isCollapse" router unique-opened
        background-color="#304156" text-color='#fff' :default-active="$route.fullPath">
        <template v-for="menuItem in menuList" :key="menuItem.id">
            <!-- 渲染单级菜单 -->
            <el-menu-item :index='menuItem.path' v-if="!menuItem.children || !menuItem.children.length">
                <el-icon v-if="menuItem.icon">
                     <!-- <component ></component> -->
                </el-icon>
                <template #title>
                    <span>{{ menuItem.title }}</span>
                </template>
            </el-menu-item>
            <!--   渲染多级菜单 -->
            <el-sub-menu :index="menuItem.icon" v-else>
                <template #title>
                    <el-icon v-if="menuItem.icon">
                        {{ menuItem.icon }}
                    </el-icon>
                    <span>{{ menuItem.title }}</span>
                </template>
                <!-- 渲染多级菜单中的子菜单 -->
                <template v-for="childItem in menuItem.children" :key="childItem.id">
                    <!-- 渲染子菜单中的单级菜单 -->
                    <el-menu-item :index="childItem.path" v-if="!childItem.children || !childItem.children.length">
                        <el-icon v-if="childItem.icon">
                            {{ childItem.icon }}
                        </el-icon>
                        <template #title>
                            <span>{{ childItem.title }}</span>
                        </template>
                    </el-menu-item>
                    <!-- 渲染子菜单中的多级菜单 -->
                    <el-sub-menu :index="childItem.path" v-else>
                        <el-icon v-if="childItem.icon">
                            {{ childItem.icon }}
                        </el-icon>
                        <template #title>
                            <span>{{ childItem.title }}</span>
                        </template>
                    </el-sub-menu>
                </template>
            </el-sub-menu>
        </template>
    </el-menu>
</template>

<script setup>
import { computed, } from "vue";
import { useStore } from "vuex";
const store = useStore();
// 获取菜单列表数据JSON.parse(JSON.stringify(…))
// const menuList = computed(() => JSON.parse(store.state.userStore.MenuList))
// // console.log("1111111111111", menuList.value);
// function setIcon(icon) {
//     return icon.slice(8);
// }
// 
const menuList = [{
    id: 1,
    title: '角色管理',
    icon: "<User />",
    path: "/user"
},
{
    id: 2,
    title: "轮播图管理",
    icon: "Picture",
    path: "/picture"
},
{
    id: 3,
    title: "文章管理",
    icon: "Document",
    path: "/document"
},
{
    id: 4,
    title: "用户信息",
    icon: "UserFilled",
    path: "/userInfo"
}
]
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>