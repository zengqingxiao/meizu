<template>
  <!--分类列表展示组件  -->
  <div class="catrgory">
    <ul v-if="data.length > 0" class="clearfix">
      <li
        @click="clickItem(item, index)"
        class="goods-list"
        v-for="(item, index) in data"
        :key="index"
        :class="{'last-child': (index + 1) % 4 === 0 }"
      >
        <a :href="item.href">
          <images-list :data='item.colorImageUrls'></images-list>
          <div class="goods-name">{{item.goodsName}}</div>
          <div class="goods-desc">{{item.goodsDesc}}</div>
          <div class="goods-price">
            <i>￥</i>
            {{item.goodsPrice}}
            <span class="lower" v-if="item.lower">起</span>
            <span class="goods-oldPrice" v-if="item.oldPrice">{{item.oldPrice}}</span>
          </div>
        </a>
        <div class="goods-new" v-if="item.newProduct">新品</div>
      </li>
    </ul>
    <div v-else class="clearfix empty">
      <!-- 没出现内容的时候显示的内容 -->
      <div class="fl empty-bg"></div>
      <div class="fr empty-desc">
        <div class="title">抱歉没有找到商品</div>
        <p>
          建议您: <br>
          1.适当减少筛选条件 <br>
          2.尝试其他条件
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import imagesList from './imagesList'
export default {
  data() {
    return {};
  },
  components: {
    imagesList
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods:{
    /**
     * 在React组件中子向父传值是父亲向子,传函数,函数在子组件中完成,参数是子组件的
     * 
     * 在vue中,子向父亲传事件名,和参数,事件在父组件上完成
     * 
     * 注意:其实根本就是 要执行的行为函数必须是父组件提供,参数由儿组件提供,因为一样的子组件在不同的父组件下的行为不一样
     *      ,是要看父组件他的需求是什么,React和Vue其实就是一个传的是函数,一个传的是参数的区别了
     * 
     * 
     * 
     */
    clickItem(item, index){
      this.$emit('clickItem', {item, index})
    }
  }
};
</script>
<style lang='less' scoped>
.catrgory {
  width: 1240px;
  margin: 0 auto 0px;
}
.goods-list {
  float: left;
  position: relative;
  margin-top: 10px;
  margin-right: 9px;
  width: 303px;
  height: 416px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  text-align: center;

  //背景阴影
  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
  &.last-child {
    margin-right: 0;
  }
  .goods-img {
    height: 230px; //只给高度,宽度让他自适应
    margin-top: 30px;
  }

  .goods-name {
    // margin-top: 30px;
    color: #333333;
    font-size: 14px;
  }

  .goods-dssc {
    font-size: 12px;
    color: #999999;
  }

  .goods-price {
    position: relative;
    display: inline-block;
    color: #c00;
    font-size: 18px;
    padding-left: 14px;

    i {
      position: absolute;
      font-style: normal;
      font-size: 14px;
      left: 0;
      top: 0;
    }
    .lower {
      font-size: 16px;
    }
    .goods-oldPrice {
      text-decoration: line-through;
      color: #666666;
      font-size: 12px;
      margin-left: 8px;
    }
  }
  .goods-new {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 50%;
    background: linear-gradient(120deg, #2e74f6, #56bdf9);
    color: #fff;
  }
}
  .empty{
    width: 335px;
    margin:120px auto 380px;

    .empty-bg{
      background: url('../assets/images/xiongmao.png') no-repeat;
      width: 105px;
      height: 135px;
      margin-right:30px; 
    }
    
    .empty-desc{
      width: 200px;

      .title{
        font-size: 18px;
        color:#56bdf9;
        margin: 15px auto;
      }
    }

  }
</style>