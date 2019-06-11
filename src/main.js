import Vue from 'vue'
import App from './App.vue'
import router from './router' //导出router.js
import store from './store'//导出store
import './assets/css/reset.css' //全局初始化样式
import './assets/fonts/style.css' //字体icon
import './assets/css/common.css' //全局定义样式

Vue.config.productionTip = false

new Vue({
  router, //引用
  store,
  render: h => h(App),  //主要渲染的App这个文件内容
}).$mount('#app')
