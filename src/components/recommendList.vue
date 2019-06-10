<template>
  <div class="recommend">
    <div class="clearfix recommend-heade">
      <h3 class="fl title">推荐商品</h3>
      <div class="fr">
        <i class="icon-font icon-left pagination-item" :class="{'disabled': activeIndex === 0 }" @click="prev"></i>
        <i class="icon-font icon-right pagination-item" :class="{'disabled': activeIndex === pageSize }" @click="next"></i>
      </div>
    </div>
    <div class="recommend-content">
      <ul class="clearfix" :style="listWrapper">
        <li
          class="goods-list"
          v-for="(item, index) in data"
          :key="index"
          :class="{'last-child': (index + 1) % 4 === 0 }"
        >
          <a :href="item.href">
            <img :src='item.goodsUrl' alt>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0 //从那一页开始
    };
  },
  components: {},
  props: {
    data: {
      type: Array,
      defaule() {
        return [];
      }
    }
  },
  computed:{
    //当计算属性中的值发生了改变会是响应式的
    listWrapper(){
      return {
        width: `${(this.data.length)*250}px`,
        transform: `translateX(-${this.activeIndex * 1240}px)`,
        transitionDuration: '.3s'
      }
    },
    //计算第几页
    pageSize (){
      return Math.floor(this.data.length/5);
    }
  },
  methods: {
    //上
    prev(){
      if(this.activeIndex === 0) return;
      this.activeIndex -= 1;

    },
    //下
    next(){
      if(this.activeIndex === this.pageSize) return;
      this.activeIndex += 1;
    }
  }
};
</script>
<style lang='less' scoped>
.recommend{
  margin-bottom: 60px;
}
.recommend-heade {
  width: 1240px;
  margin: 30px auto 10px;
  
  .title {
    font-size: 30px;
    font-weight: 400;
  }

  .pagination-item {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
    color: #00c3f5;
    font-size: 12px;
    border: 1px solid #00c3f5;
    border-radius: 10px;
    

    &.icon-left {
      margin-right: 5px;
    }
    &.disabled {
      color: #dcdcdc;
      border-color: #dcdcdc;
    }
  }
}
.recommend-content {
  width: 1240px;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;

  .goods-list {
    float: left;
    position: relative;
    width: 220px;
    margin: 0 15px;
    padding: 34px 0 15px;
    background-color: #fff;
    cursor: pointer;
    overflow: hidden;
    text-align: center;

    img{
      height: 180px;
      transition: all .3s ease;
      &:hover{
        transform: scale(1.2);
      }
    }

    &.last-child {
      margin-right: 0;
    }


    .goods-name {
      margin-top: 20px;
      margin-bottom: 2px;
      color: #555757;
      font-size: 14px;
      font-weight: 600
    }

    .goods-dssc {
      font-size: 12px;
      color: #999999;
    }

    .goods-price {
      position: relative;
      display: inline-block;
      color: #c00;
      margin-top: 8px;
      font-size: 16px;
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
        font-size: 14 px;
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
}
</style>