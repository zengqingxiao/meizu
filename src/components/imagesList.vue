<template>
  <!-- 图片展示组件 -->
  <!-- 根据type的值去赋值不同的class -->
  <div :class="{'images-wrapper' : type === 'small' , 'images-wrapper_big' : type === 'big'}" >
    <img class="img" :src="data[activeIndex]" alt="">
    <ul class="imgs">
      <li class="imgs-item" :class="{'active': activeIndex === index }" v-for="(item, index) in data" :key="index" @click.stop="changImages(index)">
        <img  :src="item" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //不管是显示还是切换都是改变索引值
      activeIndex: 0
    };
  },
  components: {},
  props: {
    data:{
      type: Array,
      default (){
        return []
      }
    },
    //type 用来控制是哪一套样式,不同的type样式不一样
    type:{
      type:String,
      default(){
        return 'small'  //小为默认值
      }
    }
  },
  methods:{
    changImages(key){
      this.activeIndex = key;
    }
  }
};
</script>
<style lang='less' scoped>
  .images-wrapper{
    text-align: center;

    .img{
      height: 230px;
      margin-top: 20px;
    }

    .imgs{
      overflow: hidden;
      margin: 13px auto 15px;

      .imgs-item{
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 4px;
        margin: 0 4px;
        border: 1px solid #efefef;
        cursor: pointer;

        &.active{
          border-color: #56bdf9;
        }

        img{
          height: 40px;
          width: 40px;

        }
      }
    }
  }
  //第二套样式
  .images-wrapper_big{
    text-align: center;

    .img{
      height: 375px;
      margin: 20px auto;
    }

    .imgs{
      overflow: hidden;
      margin: 10px auto;

      .imgs-item{
        display: inline-block;
        width: 75px;
        height: 75px;
        border-radius: 4px;
        margin: 0 5px;
        border: 1px solid transparent;
        cursor: pointer;

        &.active{
          border-color: #dcdcdc;
        }

        img{
          height: 75px;
          width: 75px;

        }
      }
    }
  }
</style>