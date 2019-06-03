import Vue from 'vue'
import App from './App.vue'
import router from './router' //导出router.js

Vue.config.productionTip = false

new Vue({
  router, //引用
  render: h => h(App),  //主要渲染的App这个文件内容
}).$mount('#app')
