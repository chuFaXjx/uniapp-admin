const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  devServer: {
    // 配置代理，解决跨域问题，注意：打包上线后就没有这个代理了，还会存在跨域问题
    proxy: {
      "/api": {
        //匹配所有以'/api'开头的请求路径
        target: 'http://localhost:3000/api', // 代理目标的基础路径
        pathRewrite: { "^/api": "" }, // 代理往后端服务器的请求去掉/api前缀
        ws: true, // WebSocket
        changeOrigin: true,
      },
    },
  },
});
