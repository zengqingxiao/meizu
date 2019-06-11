import Vue from 'vue'
import Router from 'vue-router'  //第一步继承router
//路由视图导出
import Index from '../view/index.vue'
import Category from '../view/category.vue'
import Detail from '../view/detail.vue'
//2.引用
Vue.use(Router)
//将router导入，以便main.js导出 
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      //这里本来是要有ID的但是这里数据比较少就点击哪些都是跳转同一个页面
      //这里的问号代表可有可无
      path: '/category/:id?',
      name: 'Category',
      component: Category,
    },
    {
      //这里的ID是必须要传的数值,所以不用写问号 
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})