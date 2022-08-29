<template>
  <div>
    <button @click="newly(shallow)">点击新增</button>
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script >
import { computed, reactive, toRaw } from "vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import axios from "axios";
import { onBeforeUnmount, ref, shallowRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default {
  components: { Editor, Toolbar },
  setup() {
    //wangedit内容区
    const shallow = ref("");

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref("");

    // 模拟 ajax 异步获取内容
    // onMounted(async () => {
    //     // setTimeout(() => {
    //     //     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    //     // }, 1500)
    // })

    const toolbarConfig = {};

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    //编辑器回调函数
    const handleCreated = (editor) => {
      console.log("created", editor);
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    // 图片
    const editorConfig = {
      placeholder: "请输入内容...",
      MENU_CONF: {
        uploadImage: {
          // 小于该值就插入 base64 格式（而不上传），默认为 0
          base64LimitSize: 5 * 1024 * 1024, // 5M
        },
      },
    };

    const handleChange = (editor) => {
      console.log("change:", editor.children);
      shallow.value = editor.getHtml();
      console.log("shallow.value", editor.getHtml());
    };

    //点击新增
    const newly = async (value) => {
        // console.log("change:", editor.getHtml());
      console.log("value",value);
      let list = await axios({
        url: "/api/addExperts",
        method: "post",
        data: {
          title: value,
        },
      });
      console.log(list);
    };

    return {
      newly,
      shallow,
      editorRef,
      valueHtml,
      mode: "default", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>