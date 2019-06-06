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
    <category-list :data='categoryListData'></category-list>
    <v-footer></v-footer>
  </div>
</template>

<script>
//引入头部和底部
import vHeader from "../components/header";
import vFooter from "../components/footer";
import axios from 'axios'
import categoryList from '../components/categoryList'
const HTTP = axios.create({
  baseURL: " https://www.easy-mock.com/mock/5cf54545a48c5b4da964d533/example"
});
export default {
  data() {
    return {
      categoryListData: [], //列表数据
    };
  },
  mounted(){
    this.getcategoryListData();
  },
  methods:{
   async getcategoryListData(){
     const { data } = await HTTP.post("/meizu");
     this.categoryListData = data.data.categoryList;
     window.console.log(this.categoryListData);
    }
  },
  components: {
    vHeader,
    vFooter,
    categoryList
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