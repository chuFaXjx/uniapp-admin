<template>
  <div class="login-container">
    <div class="LoginImg">
      <div class="form-container"  >
        <h3 class="title" v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :variants="{ custom: { scale: 2 } }"
          :hovered="{ scale: 1.2 }"
          :delay="200">M{{$t('loginTitle')}}</h3>
        <el-form  ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="120px" class="demo-ruleForm"
          size="large" status-icon>
          <el-form-item label="" prop="username">
            <el-input v-model="loginForm.username" :placeholder="$t('userPlaceholder')">
              <template #prepend>
                <el-icon>
                  <Avatar />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input type="password" show-password :placeholder="$t('passPlaceholder')" v-model="loginForm.password">
              <template #prepend>
                <el-icon>
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <!-- 滑动验证码-->
        <mi-captcha ref="captcha" :height="38" :radius="6" bgColor="#fff" textColor="#000" :logo="logoImg"
          @success="captchaSuccess" class="Captcha" />
        <!-- 提交表单 -->
        <el-button type="primary" @click="handleLogin" :loading="btnLoading" class="LoginBtn">{{$t("signIn")}}</el-button>
      </div>
      <div class="BoxImg" v-motion
        :initial="{ opacity: 0, x: -100 }"
        :enter="{ opacity: 1, x: 0 }"
        :delay="200">
      </div>
        <!-- 国际化 -->
        <Language class="language" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRaw } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// 引入 ElMessage 组件
import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";
import {Language} from "@/layout/components/Header/components";
import { useI18n } from "vue-i18n";

// 访问 .env配置文件中设置的变量
// console.log(process.env.VUE_APP_URL);
// console.log(process.env.VUE_APP_Title);

const router = useRouter();

const store = useStore();
const { t } = useI18n();
const logoImg = require("@/assets/logo图标.png");
// 获取到表单元素
const loginFormRef = ref(null);

// 登录的表单数据
const loginForm = reactive({
  username: "admin",
  password: "admin888",
  captchaSuccess: false,
});

// 登录按钮的加载loading
const btnLoading = ref(false);

// 表单检验规则
const loginRules = reactive({
  username: [{ required: true, message: t("userError"), trigger: "blur" }],
  password: [
    { required: true, message: t("PWError"), trigger: "blur" },
    { min: 3, max: 8, message: t("PWSubError"), trigger: "blur" },
  ],
});
// 滑动验证码校验成功
function captchaSuccess() {
  loginForm.captchaSuccess = true;
}
// 点击登录按钮，处理登录
async function handleLogin() {
  // 滑动验证码校验
  if (!loginForm.captchaSuccess) {
    ElMessage({
      showClose: true,
      message: t("captchaError"),
      type: "error",
    });
    return;
  }
  // 1、表单校验
  await loginFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      // 开启loading状态
      btnLoading.value = true;
      // 用通过vuex发送网络请求
      const res = await store.dispatch("handleLogin", toRaw(loginForm));
      if (res) {
        router.push({ path: "/" });
        ElMessage({
        showClose: true,
        message: t("signInSuccess"),
        type: "success",
      });
      }
    } else {
      // 校验不通过
      console.log("error submit!", fields);
    };
    
    
  });
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  // background-color: #2d3a4b;
  background: url(../assets/Login背景图.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;

  .LoginImg {
    height: 500px;
    width: 800px;
    background-color: #08AEEA;
    background-image: linear-gradient(0deg, #08AEEA 0%, #2AF598 100%);
    position: relative;
    left: -30px;
    box-shadow: 0 5px 20px 2px rgba(27,167,132,0.3);
    .BoxImg {
      position: relative;
      width: 400px;
      height: 500px;
      background: url(../assets/login背景图2.jpg);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      top: -268px;
    }
  }

  .title {
    position: relative;
    // top: 150px;
    // left: -255px;
    font-size: 26px;
    color: #eee;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: 700;
  }

  .form-container {
    position: relative;
    top: 100px;
    left: 400px;
    width: 400px;
    // height: 300px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    // background-color: rgba(245, 245, 245,);
    .el-form {
      width: 80%;

      /* vue3中的样式穿透 */
      ::v-deep(.el-form-item__content) {
        margin-left: 0px !important;
      }
    }

    .el-button {
      width: 60%;
    }

  }
  .LoginBtn {
    width: 322px !important;
    position: relative;
    top: 20px;
  }
  .language{
    width: 38px;
    height: 40px;
    position: absolute;
    right: 0px;
    top: 0px;
  }
}
</style>
