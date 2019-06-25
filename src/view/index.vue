<template>
  <div class="page">
    <div class="header">
      <vHeader></vHeader>
    </div>
    <div class="swiper-wraper">
      <swiper :data="swiperData"></swiper>
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
    <div class="index-container">
      <div class="sale">
        <h3 class="title">热卖商品</h3>
        <goods-list :data="hotSaleData"></goods-list>
      </div>
      <div class="sale">
        <h3 class="title">手机</h3>
        <ad-list :data="phoneAdData"></ad-list>
        <goods-list :data="phoneSaleData"></goods-list>
      </div>
      <div class="sale">
        <h3 class="title">智能配件</h3>
        <ad-list :data="samrtAdData"></ad-list>
        <goods-list :data="samrtSaleData"></goods-list>
      </div>
    </div>
    <div class="footer">
      <vfooter></vfooter>
    </div>
    <v-dialog
      :show.sync="dialogShow"
      :width="200"
      :confirmButtonShow="false"
      :cancelButtonShow="false"
      :dialogHeaderShow="false"
    >
      <div>
        <i class="icon-font icon-spinner6 category-spinner6"></i>
        <p>加载中</p>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
const HTTP = axios.create({
  baseURL: " https://www.easy-mock.com/mock/5cf54545a48c5b4da964d533/example"
});
import vHeader from "../components/header";
import swiper from "../components/swiper";
import goodsList from "../components/goodsList";
import adList from "../components/adList";
import vfooter from "../components/footer";
import vDialog from '../components/dialog'
export default {
  data() {
    return {
      dialogShow: false,
      swiperData: [], //轮播图的数据
      menuData: [], //轮播图左侧的数据
      postData: [], //轮播图底部数据
      hotSaleData: [], //热卖商品列表结构数据
      phoneSaleData: [], //手机商品列表结构1数据
      phoneAdData: [], //手机商品列表结构2数据
      samrtSaleData: [], //智能商品列表结构1数据
      samrtAdData: [] //智能商品列表结构1数据
    };
  },
  components: {
    vHeader,
    swiper,
    goodsList,
    adList,
    vfooter,
    vDialog
  },
  mounted() {
    this.getSwiperData().then(() => {
      this.dialogShow = false; //关闭菊花图
    });
  },
  methods: {
    async getSwiperData() {
      this.dialogShow = true;
      const { data } = await HTTP.post("/meizu");
      this.swiperData = data.data.advertise;
      this.menuData = data.data.menu;
      this.postData = data.data.post;
      this.hotSaleData = data.data.hotSale;
      this.phoneSaleData = data.data.phoneSale;
      this.samrtSaleData = data.data.smartSale;
      this.phoneAdData = data.data.phoneRecommend;
      this.samrtAdData = data.data.smartRecommend;
      // window.console.log(this.menuData);
    }
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
@keyframes spinner6 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.category-spinner6 {
  font-size: 25px;
  display: inline-block;
  margin: 10px auto;
  animation:spinner6 2s linear infinite;
} 
.swiper-wraper {
  width: 1240px;
  height: 500px;
  position: relative;
  margin: 0 auto;

  .menus {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 303px;
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 17px;

    li {
      height: 57px;
      line-height: 57px;

      a {
        font-size: 16px;
        padding-left: 40px;
        color: #ffffff;
        transition: color 0.3s;

        &:hover {
          color: #31a5e7;
        }
      }
    }
  }
}
.post-wraper {
  width: 1240px;
  margin: 10px auto 50px;
  font-size: 0px;
  // margin-right: -px;
  li {
    float: left;
    width: 303px;
    height: 180px;
    margin-right: 9px;

    a {
      transition: opacity 0.3s ease-in-out;

      &:hover {
        opacity: 0.85;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
.index-container {
  width: 1240px;
  margin: 0 auto;

  .title {
    font-size: 30px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .sale {
    margin-bottom: 50px;
  }
}
</style>