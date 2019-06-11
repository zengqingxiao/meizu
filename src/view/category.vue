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
    <filter-box :data="filrerBoxData" @filter="getQuery"></filter-box>
    <sortBox @getKey="getSortKey" @getStock="getSortStock"></sortBox>
    <category-list @clickItem='goTODetail' :data="categoryListData"></category-list>
    <recommendList :data='recommendListData'></recommendList>
    <v-footer></v-footer>
  </div>
</template>

<script>
import axios from "axios";
//引入头部和底部
import vHeader from "../components/header";
import vFooter from "../components/footer";
import filterBox from "../components/filterBox";
import categoryList from "../components/categoryList";
import sortBox from "../components/sortBox";
import recommendList from '../components/recommendList'
const HTTP = axios.create({
  baseURL: " https://www.easy-mock.com/mock/5cf54545a48c5b4da964d533/example"
});
export default {
  components: {
    vHeader,
    vFooter,
    categoryList,
    filterBox,
    sortBox,
    recommendList
  },
  data() {
    return {
      categoryListData: [], //列表数据
      filrerBoxData: [], //条件筛选组件数据
      categoryListCopy: [],
      recommendListData: [],//推荐商品组件的数据
      //新增字段用来缓存存各自选择过后的物品的值
      currentQuery: null, //条件对象筛选
      currentStock: null, //判断是否有货
      currentKey: null //根据新品,推荐,价格筛选
    };
  },
  mounted() {
    this.getcategoryListData().then(() => {
      this.getSortKey("recommend"); //要在异步执行完后让他是推荐列
    });
  },
  methods: {
    async getcategoryListData() {
      const { data } = await HTTP.post("/meizu");
      this.categoryListData = data.data.categoryList;
      this.categoryListCopy = [].concat(data.data.categoryList); //将data的值赋值一遍
      this.filrerBoxData = data.data.queryList;
      this.recommendListData = data.data.smartSale;
      //window.console.log(this.categoryListData);
    },

    //------条件筛选------

    // /**
    //  * 这里的val为传过来的选择限制要求的对象
    //  * 这里传的参数val上面不需要写(), 注意默认就是子组件传过来的值
    //  */
    // getResult(val) {
    //   //这里是通过每一个物品都有一个数组,这个数组放置了他们的所有特性,我们只需要判断这个数组中是否有我们传过来的对象中的那个特性就可以,有就显示
    //   /**
    //    * 解析:我们肯定要遍历对象拿到key值和val值,我们要那val去和哪个物品自带的数组去比较看是否含有,含有就返回对象,那么肯定会用到filter这个方法,
    //    * 下面代码的作用
    //    * 1.先把传过来的对象变成只含key的数组,根据key的个数遍历中遍历每一个物品,判断物品中的数组(每一个物品都有一个关于自己特性的数组)是否含有我们传过来的对象中的val
    //    *
    //    */
    //   //Object.keys(val)将对象转换为数组
    //   //window.console.log(Object.keys(val));
    //   //forEach:对数组中的每一项运行给定函数(参数),这个方法没有返回值
    //   //filter:对数组中的每一项的运行函数,将返回return为true的项,组成的数组
    //   this.categoryListData = [].concat(this.categoryListCopy); //作用:每一次点击数据都是全新的
    //   Object.keys(val).forEach(key => {
    //     if (val[key]) {
    //       //防止点击全部的的情况下 全部的val的值为null那么就可以不用被筛选
    //       this.categoryListData = this.categoryListData.filter(item => {
    //         return item.features.indexOf(val[key]) >= 0; //判断我们选择的体性是否在物品中含有
    //       });
    //     }
    //   });
    // },
    getQuery(val) {
      this.currentQuery = val;
      this.sortGoods();
    },

    //-----新品,推荐,价格筛选-----

    // getSortKey(key) {
    //   if (key === "recommend") {
    //     this.categoryListData.sort((a, b) => {
    //       return b.shelveTime - a.shelveTime;
    //     });
    //   } else if (key === "new") {
    //     //这里必须加if，只有if后面可以加括号
    //     this.categoryListData.sort((a, b) => {
    //       return b.publishedTime - a.publishedTime;
    //     });
    //   } else if (key === "low") {
    //     this.categoryListData.sort((a, b) => {
    //       return b.goodsPrice - a.goodsPrice;
    //     });
    //   } else if (key === "high") {
    //     this.categoryListData.sort((a, b) => {
    //       return a.goodsPrice - b.goodsPrice;
    //     });
    //   }
    // },
    getSortKey(key) {
      
      this.currentKey = key;
      this.sortGoods();
     // window.console.log('getSortKey')
    },

    // ----是否有货排序-----

    // getSortStock(val) {

    //   if (val) {
    //     this.categoryListData = this.categoryListData.filter(item => {
    //       return item.available; //判断我们选择的体是否有货
    //     });
    //   }
    // }
    getSortStock(val) {
      window.console.log('getSortStock')
      this.currentStock = val;
      this.sortGoods();
    },

    /**
     * 将上面的三种排序整合到一起有关联性
     * 1.将他们点击后传递给父组件的变量保存起来,进行统一的判断
     * 2.这里有一个思路就是把所有逻辑语句统一后放到一个函数里面,再在每一给点击事件的函数中执行这个逻辑函数
     *
     */
    sortGoods() {
     //必须注意的一个地方 这里不可以用else if  因为用了else 就是一个整体，就不可以带到3个同事的情况
      this.categoryListData = [].concat(this.categoryListCopy); //作用:每一次点击数据都是全新的
      if (this.currentQuery) {
        Object.keys(this.currentQuery).forEach(key => {
          if (this.currentQuery[key]) {
            //防止点击全部的的情况下 全部的val的值为null那么就可以不用被筛选
            this.categoryListData = this.categoryListData.filter(item => {
              return item.features.indexOf(this.currentQuery[key]) >= 0; //判断我们选择的体性是否在物品中含有
            });
          }
        });
      }
      if (this.currentStock) {
        this.categoryListData = this.categoryListData.filter(item => {
          return item.available; //判断我们选择的体是否有货
        });
      }
      if (this.currentKey) {
         window.console.log(this.currentKey)
        if (this.currentKey === "recommend") {
          this.categoryListData.sort((a, b) => {
            return b.shelveTime - a.shelveTime;
          });
        } else if (this.currentKey === "new") {
          //这里必须加if，只有if后面可以加括号,因为这里是只可以选其中一个
          this.categoryListData.sort((a, b) => {
            return b.publishedTime - a.publishedTime;
          });
        } else if (this.currentKey === "low") {
          this.categoryListData.sort((a, b) => {
            return b.goodsPrice - a.goodsPrice;
          });
        } else if (this.currentKey === "high") {
          window.console.log(this.currentKey)
          this.categoryListData.sort((a, b) => {
            return a.goodsPrice - b.goodsPrice;
          });
        }
      }
    },
    //点击跳转路由,并传从参数
    goTODetail(val){
      //window.console.log(val);
      this.$router.push({
        name: 'Detail',
        /**
         * 
         * 传 ID 值给路由，这个对象params会给路由
         * ，路由会根据这里的值给Url和以放便后面子组件根据params对象取得ID的值
         * 
         * 在detail子页面中以this.$route.params.id的方式去取当前路由下的ID值
         * 
         */
        params: {
          id: val.item.id 
        }
      })
    }
  }
};
</script> 
<style lang='less' scoped>
.category-wrapper {
  width: 1240px;
  margin: 0 auto;

  .bread {
    height: 40px;
    line-height: 40px;

    .arrow,
    .last-bread {
      color: #999;
    }
    .arrow {
      margin: 0 10px;
    }
  }
}
</style>