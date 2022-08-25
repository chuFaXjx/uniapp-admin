import { ref } from 'vue';
const isCollapse = ref(true);
export default {
  state: {
    isCollapse:true,
  },

  mutations: {
    handleChange(state,flag) {
        /* 通过改变flag的Boolean值来连接头部icon图标和侧边菜单栏 */
       state.isCollapse = flag
    },
  },
};
