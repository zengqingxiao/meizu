<template>
  <div class="page">
    <div class="header">
      <vHeader></vHeader>
    </div>
    <div class="swiper-wraper">
      <swiper :data='swiperData'></swiper>
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
      swiperData: [] //轮播图的数据
    };
  },
  components: {
    vHeader,
    swiper
  },
  mounted(){
    this.getSwiperData();
  },
  methods: {
    async getSwiperData() {
      const { data } =await HTTP.post('/meizu');
      this.swiperData = data.data.advertise;
      //console.log(this.swiperData)
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
  }
</style>