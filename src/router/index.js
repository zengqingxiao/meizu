import Vue from 'vue'
import Router from 'vue-router'  //第一步继承router
import Index from '../view/index.vue'

//2.引用
Vue.use(Router)
//将router导入，以便main.js导出 
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWord',
      component: Index
    }
  ]
})