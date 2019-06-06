<template>
  <!-- 条件筛选组件 -->
  <ul  class="filter-box">
    <li class="box-item clearfix" v-for="(item, index) in data" :key="index">
      <div class="fl filter-title">{{item.name}}:</div>
      <ul class="fl">
        <!-- 这里的判断条件是根据我们的储存对象来判断是否存在某一个品类,切类别相同 -->
        <li class="filter-item fl" :class="{'active': activeFilter[item.key] === info.value}" @click="changeFilter(item.key, info.value)" v-for="(info, li) in item.queryList" :key="li">{{info.name}}</li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      //存放筛选条件的结果对象
      activeFilter: {}
    };
  },
  components: {},
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
     * item.key:是用来判断他是哪一个类型的
     * info.value:是来判断是哪一个类型的值
     * 
     */
    changeFilter(key, val){
      //在数组或对象添加类的时候注意
      //this.activeFilter[key] = val; //这样是不可以的vue是不可以动态监测的
      if(!this.activeFilter[key]){  //当我没有的情况下添加
        this.$set(this.activeFilter, key, val); //这样就可以了添加
      }else if(this.activeFilter[key] === val){ //当我点击已经存在的情况下取消
        this.$delete(this.activeFilter, key);  //移除在一次点击相同的情况下
      }else{
        this.$set(this.activeFilter, key, val); //当我点击同一行其他的情况下换属性值
      }
      
      //把选择完的对象传出去
      this.$emit('filter',this.activeFilter)

      //window.console.dir(this.activeFilter);
    }
  }
};
</script>
<style lang='less' scoped>
  .filter-box{
    background-color: white;
    padding: 15px 10px;
    border: 1px solid #efefef;

    .box-item{
      height: 46px;
    }
    
    .filter-title{
      width: 85px;
      padding-left: 10px;
      white-space: nowrap;
      color: #333;
      overflow: hidden;
    }

    .filter-item{
      cursor: pointer;
      margin-right: 62px;
      //这里active的添加逻辑不可以在是根据key值了因为他是一个对象,我们要通过返回一个对象,在根据对象判断
      &.active{
        color: #00c3f5;
      }
    }
  }
</style>