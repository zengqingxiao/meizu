<template>
  <div>
    <v-header></v-header>
    <div class="category-wrapper">
      <div class="bread">
        <span>首页</span>
        <span class="arrow">></span>
        <span>全部商品</span>
        <span class="arrow">></span>
        <span class="last-bread">手机</span>
      </div>
    </div>
    <!-- 这里传的参数val上面不需要写()注意默认就是子组件传过来的值,这里报错val的值为空,因为这里的val回去找这个组件中定义的data -->
    <!-- <filter-box :data='filrerBoxData' @filter='getResult(val)'></filter-box> -->
    <filter-box :data='filrerBoxData' @filter='getResult'></filter-box>
    <category-list :data='categoryListData'></category-list>
    <v-footer></v-footer>
  </div>
</template>

<script>
import axios from 'axios'
//引入头部和底部
import vHeader from "../components/header";
import vFooter from "../components/footer";
import filterBox from '../components/filterBox'
import categoryList from '../components/categoryList'
const HTTP = axios.create({
  baseURL: " https://www.easy-mock.com/mock/5cf54545a48c5b4da964d533/example"
});
export default {
  data() {
    return {
      categoryListData: [], //列表数据
      filrerBoxData: [], //条件筛选组件数据
      categoryListCopy: []
    };
  },
  mounted(){
    this.getcategoryListData();
  },
  methods:{
   async getcategoryListData(){
     const { data } = await HTTP.post("/meizu");
     this.categoryListData = data.data.categoryList;
     this.categoryListCopy = [].concat(data.data.categoryList);  //将data的值赋值一遍
     this.filrerBoxData = data.data.queryList;
     //window.console.log(this.categoryListData);
    },
    /**
     * 这里的val为传过来的选择限制要求的对象
     * 这里传的参数val上面不需要写(), 注意默认就是子组件传过来的值
     */
    getResult(val){
      window.console.log(val);
      //这里是通过每一个物品都有一个数组,这个数组放置了他们的所有特性,我们只需要判断这个数组中是否有我们传过来的对象中的那个特性就可以,有就显示
      /**
       * 解析:我们肯定要遍历对象拿到key值和val值,我们要那val去和哪个物品自带的数组去比较看是否含有,含有就返回对象,那么肯定会用到filter这个方法,
       * 下面代码的作用
       * 1.先把传过来的对象变成只函key的数组,根据key的个数遍历中遍历每一个物品,判断物品中的数组是否含有我们传过来的对象中的val
       * 
       */
      //Object.keys(val)将对象转换为数组
      //window.console.log(Object.keys(val));
      //forEach:对数组中的每一项运行给定函数(参数),这个方法没有返回值
      //filter:对数组中的每一项的运行函数,将返回return为true的项,组成的数组
      this.categoryListData = [].concat(this.categoryListCopy) //作用:每一次点击数据都是全新的
      Object.keys(val).forEach((key) => {
        if(val[key]){  //防止点击全部的的情况下 全部的val的值为null那么就可以不用被筛选
          this.categoryListData = this.categoryListData.filter((item) => {
            return item.features.indexOf(val[key]) >= 0  //判断我们选择的体性是否在物品中含有
          });
        }
        
      })
    }
  },  
  components: {
    vHeader,
    vFooter,
    categoryList,
    filterBox
  }
};
</script> 
<style lang='less' scoped>
.category-wrapper{
  width: 1240px;
  margin: 0 auto;

  .bread{
    height: 40px;
    line-height: 40px;

    .arrow, .last-bread{
      color: #999;
    }
    .arrow{
      margin: 0 10px;
    }
  }

}
</style>