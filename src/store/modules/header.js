// import { ref } from 'vue';
// const isCollapse = ref(true);
export default {
  state: {
    fullscreen:false,
    full:null,
  },
  mutations:{
    handleFullScreen(state, fullscreen){
        state.fullscreen = fullscreen;
    }
  }
};