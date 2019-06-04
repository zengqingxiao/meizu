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
    <ul class="post-wraper">广告图片</ul>
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
      menuData:[] //轮播图左侧的数据
    };
  },
  components: {
    vHeader,
    swiper
  },
  mounted(){
    this.getSwiperData();
    this.getMenuData();
  },
  methods: {
    async getSwiperData() {
      const { data } = await HTTP.post('/meizu');
      this.swiperData = data.data.advertise;
      window.console.log('getSwiperData可以')
    },
    async getMenuData() {
      window.console.log('aaa')
      const { data } = await HTTP.get('/query');
      this.menuData = data.data;
      window.console.log('aaa')
    }
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

    }
  }
</style>