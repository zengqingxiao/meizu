import Vue from 'vue'
import Router from 'vue-router'  //第一步继承router
//路由视图导出
import Index from '../view/index.vue' //主页
import Category from '../view/category.vue' //物品详细页
import Detail from '../view/detail.vue' //物品订单页
import Shopcart from '../view/shopcart.vue' //购物车页
//2.引用
Vue.use(Router)
//将router导入，以便main.js导出 
export default new Router({
  routes: [
    {
      path: '/', //这里都只是赋值所以用字符串
      name: 'Index', //这里都只是赋值所以用字符串
      component: Index //而这里是引用了上面的变量,所以不是字符串
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
      component: Detail,
      props: true
    },
    {
      path: '/Shopcart',
      name:'Shopcart',
      component: Shopcart
    }
  ]
})