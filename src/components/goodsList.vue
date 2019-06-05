<template>
<!-- 商品列表组件 - 1 -->
  <ul class="clearfix">
    <li class="goods-list" v-for="(item, index) in data" :key="index" :class="{'last-child': (index + 1) % 4 === 0 }">
      <a :href="item.href">
        <img class="goods-img" :src="item.goodsUrl">
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
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    data:{
      type: Array,
      dafault() {
         return []; 
      }
    }
  },
  components: {}
};
</script>
<style lang='less' scoped>
.goods-list{
  float: left;
  position: relative;
  margin-top:10px;
  margin-right: 9px;
  width: 303px;
  height: 400px;
  background-color: #fff;
  cursor: pointer;
  transition: all .3s ease;
  overflow: hidden;
  text-align: center;
  
  //背景阴影
  &:hover{
    box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
    transform: translateY(-1px);
  }
  &.last-child{
    margin-right: 0
  }
  .goods-img{
    height: 230px; //只给高度,宽度让他自适应
    margin-top: 30px;
  }

  .goods-name{
    margin-top: 30px;
    color: #333333;
    font-size: 16px;
  }

  .goods-dssc{
    font-size:14px;
    color: #999999;
  }

  .goods-price{
    position: relative;
    display: inline-block;
    color: #c00;
    font-size: 22px;
    padding-left: 14px;

    i{
      position: absolute;
      font-style: normal;
      font-size: 14px;
      left: 0;
      top: 0;
    }
    .lower{
      font-size: 16px;
    }
    .goods-oldPrice{
      text-decoration:  line-through;
      color: #666666;
      font-size: 14px;
      margin-left: 8px;
    }
  }
  .goods-new{
      position: absolute;
      left: 20px;
      top: 20px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 50%;
      background: linear-gradient(120deg,#2e74f6,#56bdf9);
      color: #fff;
    }
}
</style>