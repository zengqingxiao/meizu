<template>
  <div class="page">
    <div class="header">
      <vHeader></vHeader>
    </div>
    <div class="swiper-wraper">
      <swiper :data='swiperData'></swiper>
      <ul class="menus">
        <li v-for="(item, index) in menuData" :key="index">
          <a :href="item.href">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <ul class="post-wraper clearfix">
      <li v-for="(item, index) in postData" :key="index">
        <a :href="item.href">
          <img :src="item.imgUrl">
        </a>
      </li>
    </ul>
    <div class="index-container">展示区</div>
    <div class="footer">底部</div>
  </div>
</template>

<script>
import axios from 'axios'
const HTTP = axios.create({
  baseURL: " https://www.easy-mock.com/mock/5cf54545a48c5b4da964d533/example"
});
import vHeader from "../components/header";
import swiper from '../components/swiper';
export default {
  data() {
    return {
      swiperData: [], //轮播图的数据
      menuData:[], //轮播图左侧的数据
      postData: [] //轮播图底部数据
    };
  },
  components: {
    vHeader,
    swiper
  },
  mounted(){
    this.getSwiperData();
    //this.getMenuData();
  },
  methods: {
    async getSwiperData() {
      const { data } = await HTTP.post('/meizu');
      this.swiperData = data.data.advertise;
      this.menuData = data.data.menu;
      this.postData = data.data.post;
      // window.console.log(this.menuData);
    },
    //这样不可以会提示为429加载次数过多
    // async getMenuData() {
    //   window.console.log('aaa')
    //   const { data } = await HTTP.get('/meizu');
    //   this.menuData = data.data;
    //   window.console.log('aaa')
    // }
  }
};
</script>
<style lang='less' scoped>
  .swiper-wraper{
    width: 1240px;
    height: 500px;
    position: relative;
    margin: 0 auto;

    .menus{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 303px;
      background-color: rgba(0, 0, 0, .5);
      padding-top:17px; 
      
      li{
        height: 57px;
        line-height: 57px;

        a{
          font-size: 16px;
          padding-left: 40px;
          color: #ffffff;
          transition: color .3s;
          
          &:hover{
            color: #31a5e7;
          }
        }
      }
    }
  }
  .post-wraper{
    width: 1240px;
    margin: 10px auto 50px;
    font-size: 0px;
   // margin-right: -px;
    li{
      float: left;
      width: 303px;
      height: 180px;
      margin-right: 9px;

      a{
        transition: opacity .3s ease-in-out;

        &:hover{
          opacity: .85;
        }
      }

    &:last-child{
      margin-right: 0;
    }
    }
  }
</style>