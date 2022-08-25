import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 使用motion做动画
import { MotionPlugin } from '@vueuse/motion'

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// ElementPlus暗黑主题的css
import "element-plus/theme-chalk/dark/css-vars.css";
// 引入message-box组件的样式
import "element-plus/es/components/message-box/style/css";
// 引入 message 组件的样式
import "element-plus/es/components/message/style/css";
// 引入 ElNotification 组件的样式
import "element-plus/es/components/notification/style/css";

const app = createApp(App);
// 定义全局el-icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 使用motion做动画
app.use(MotionPlugin);
// 使用验证码组件
import MakeitCaptcha from "makeit-captcha";
import "makeit-captcha/dist/captcha.min.css";

app.use(MakeitCaptcha);



//引入国际化插件
import i18n from "@/locales";
app.use(i18n);

// vue.config.silent = true;
// 自动聚焦
app.directive('focus', {
  // 当被绑定的元素挂载到 DOM 中时……
  mounted(el) {
    // 聚焦元素
    el.focus()
  }
})


app.use(store).use(router).mount("#app");
