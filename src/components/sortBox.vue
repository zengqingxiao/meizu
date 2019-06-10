<template>
  <div class="clearfix sort-box">
    <div class="fl sort-order">
      <a href="javaScript:" :class="{'active': activeSortKey === 'recommend'}" @click="setSortKey('recommend')">推荐</a>
      <a href="javaScript:" :class="{'active': activeSortKey === 'new'}"  @click="setSortKey('new')">新品</a>
      <a href="javaScript:" :class="{'active': activeSortKey === 'low' || activeSortKey === 'high'}" @click="changPrice">
        价格 <i class="icon-font arrow" :class="sortArrow"></i>
      </a>
    </div>
    <div class="fr sort-check">
      <input v-model="haveStock" type="checkbox" name="" id="">
      <span>仅显示有货商品</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //为什么这样不可以,因为我们默认是要在页面加载的情况下是推荐的列表，但是这样只是值改变了，但是事件从参数还是没有传出去
      //activeSortKey: 'recommend', //这个字段用来标识我们现在选择的条件
      activeSortKey: '', //这个字段用来标识我们现在选择的条件(推荐或新品)
      activePrice:'low',//这个字段用来判断价格是向上，还是向下，默认是向上由低到高
      haveStock:false, //判断是否有货
    };
  },
  watch: {
    //判断当haveStock的值发生改变的时候区监听,这个时候input点击haveStock会变成true
    //这里的val就是改变后的值
    haveStock (val) {
      this.$emit('getStock', val)
    }
  },
  computed: {
    sortArrow () {
      if (this.activePrice === 'low'){
        return 'icon-down';
      }else{
        return 'icon-up';
      }
    }
  },
  mounted(){
    /**
    * 1.这样就可以在页面加载的时候让他推着tab显示高亮，同事传过去了参数
    * 2.但是这样还是不够的，因为执行setSortKey的时候可能，物品对象还没异步生成完成所以我在异步的哪里有写了一次执行函数
    **/
    this.setSortKey('recommend'); 

  },
  methods: {
    setSortKey (val) {
      this.activeSortKey = val;
      this.$emit('getKey', this.activeSortKey);
     
    },
    changPrice () {
      if (this.activePrice === this.activePrice){
        this.activePrice = this.activePrice === 'low' ? 'high' : 'low';
      }
      this.setSortKey(this.activePrice); //把判断价格的值传进去
    }
  },
  components: {}
};
</script>
<style lang='less' scoped>
  .sort-box{
    width: 1240px;
    margin: 30px auto 20px;
    color: #666;

    .sort-order{
      
      a{
        margin-right: 50px;

        &:hover, &.active{
          transform: all .2s;
          color: #00c3f5;
        }
        &:hover .arrow{
          display: inline;   //这个又可以显示 又可以又行内元素显示
        }
        .arrow{
          display: none;
        }

        i{
          vertical-align: middle;
        }

        
      }
    }

    .sort-check{

      input{
        vertical-align: middle;
      }
      
    }
  }
</style>