<template>
  <div class="detail">
    <v-header></v-header>
    <div class="detail-weapper">
      <div class="bread">
        <span>首页</span>
        <span class="arrow">></span>
        <span>全部商品</span>
        <span class="arrow">></span>
        <span class="last-bread">手机</span>
      </div>
      <div class="clearfix">
        <div class="fl detail-images">
          <!-- 这里说明了父组件向子组件传值是传属性上的值，这个属性不一定是要是动态的 -->
          <images-list v-if="infoData.colorImageUrls" :data="infoData.colorImageUrls" type="big"></images-list>
          <!-- <images-list :type='big'></images-list> -->
        </div>
        <div class="fl detail-props">
          <h1 class="props-title">{{infoData.goodsName}}</h1>
          <p class="prop-desc">{{infoData.goodsDesc}}</p>
          <div class="prop-sale">
            <span class="prop-name">
              价
              <span class="prop-space"></span>
              格:
            </span>
            <span class="prop-price">￥{{infoData.goodsPrice}}</span>
          </div>
          <div>
            <span class="prop-name">
              支
              <span class="prop-space"></span>
              持:
            </span>
            <ul class="service-list">
              <li class="list-item">
                <i class="icon-font icon-check-circle"></i>百城速达
              </li>
              <li class="list-item">
                <i class="icon-font icon-check-circle"></i>顺丰包邮
              </li>
              <li class="list-item">
                <i class="icon-font icon-check-circle"></i>七天无理由退款
              </li>
            </ul>
          </div>
          <div>
            <span class="prop-name">
              服
              <span class="prop-space"></span>
              务:
            </span>
            <span>本商品由 魅族 负责发货并提供售后服务</span>
          </div>
          <div>
            <span class="prop-name">
              数
              <span class="prop-space"></span>
              量:
            </span>
            <div class="clearfix prop-number">
              <input v-model="purchaseQuantity" class="fl prop-input" type="number" name id>
              <div class="fl change-box">
                <div @click="increase" class="change-value">+</div>
                <div @click="reduce" class="change-value">-</div>
              </div>
            </div>
          </div>
          <div class="prop-buy">
            <a class="btn danger mr20" href="javaScript:" @click="purchase">立即购买</a>
            <a class="btn success" href="javaScript:" @click="addShopcart">加入购物车</a>
          </div>
        </div>
      </div>
      <div class="detail-info_wrapper">
        <div class="detail-info">
          <a class="info-title" href>商品详情</a>
        </div>
        <img
          class="detail-img"
          :src="item"
          alt
          v-for="(item, index) in infoData.information"
          :key="index"
        >
      </div>
    </div>

    <v-fooder></v-fooder>
  </div>
</template>

<script>
import axios from "axios";
const HTTP = axios.create({
  baseURL: " https://www.easy-mock.com/mock/5cf54545a48c5b4da964d533/example"
});
import vHeader from "../components/header";
import vFooder from "../components/footer";
import imagesList from "../components/imagesList";
export default {
  data() {
    return {
      infoData: {}, //用来存储我们当前获得的数据
      purchaseQuantity: 1 //购买物品的数量
    };
  },
  components: {
    vHeader,
    vFooder,
    imagesList
  },
  mounted() {
    this.getFetail(this.$route.params.id); //拿到router传过来的ID参数
  },
  methods: {
    async getFetail(id) {
      //window.console.log(id);
      /**
       * 根据路由的ID值，取得相关连的ID的数据
       *
       */
      const { data } = await HTTP.post("/xq");
      this.infoData = data.data.categoryList.find(item => {
        return item.id === id;
      });
      window.console.log(this.infoData);
      // window.console.log(this.infoData.colorImageUrls);
    },
    //点击增加
    increase() {
      // this.purchaseQuantity += 1;
      //这里需要转型,当点击增加是没关系，但是如果是我们手动输入可能是字符串
      this.purchaseQuantity = parseInt(this.purchaseQuantity) + 1;
    },
    //点击减少
    reduce() {
      if (this.purchaseQuantity > 1) {
        this.purchaseQuantity = parseInt(this.purchaseQuantity) - 1;
      }
    },
    //加入到购物车
    addShopcart() {
      this.$store.commit("ADD_SHOPCART", {
        data: this.infoData,
        num: parseInt(this.purchaseQuantity)
      });
    },
    //立即购买
    /**
     * 这里和加入购物车的行为一样外多了一步,跳转路由
     */
    purchase() {
      this.$store.commit("ADD_SHOPCART", {
        data: this.infoData,
        num: parseInt(this.purchaseQuantity)
      });
    }
  }
};
</script>
<style lang='less' scoped>
.detail {
  background-color: white;
}
.detail-weapper {
  width: 1240px;
  margin: 0 auto;

  .bread {
    height: 40px;
    line-height: 40px;

    .arrow,
    .last-bread {
      color: #999;
    }
    .arrow {
      margin: 0 10px;
    }
  }

  .detail-images {
    width: 495px;
  }

  .detail-props {
    width: 675px;
    font-size: 12px;

    .props-title {
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: 600;
      color: #000;
    }

    .prop-desc {
      font-size: 16px;
      color: #e22841;
      margin-bottom: 15px;
    }
    .prop-sale {
      height: 55px;
      line-height: 55px;
      background-color: #f5f5f5;
      margin-bottom: 20px;

      .prop-price {
        font-size: 24px;
        color: #e02b41;
        line-height: 55px;
        margin-bottom: 26px;
      }
    }
    .prop-name {
      padding: 0 10px;
      line-height: 30px;

      .prop-space {
        padding: 0 12px;
      }
    }
    .service-list {
      display: inline-block;
      margin-bottom: 5px;

      .list-item {
        display: inline-block;
        margin-right: 20px;

        i {
          margin-right: 5px;
          color: #00c3f5;
        }
      }
    }
    .prop-number {
      display: inline-block;
      vertical-align: middle;

      .prop-input {
        width: 53px;
        height: 38px;
        line-height: 38px;
        border: 1px solid #dcdcdc;
        color: #333;
        text-align: center;
      }

      .change-box {
        margin-left: 6px;
      }

      .change-value {
        width: 20px;
        height: 16px;
        font-size: 14px;
        color: #666;
        border: 1px solid #dcdcdc;
        line-height: 14px;
        cursor: pointer;
        text-align: center;

        &:last-child {
          margin-top: 6px;
        }
      }
    }
    .prop-buy {
      margin-top: 17px;

      .mr20 {
        margin-right: 20px;
      }
    }
  }
  .detail-info_wrapper {
    font-size: 0px;
    margin-top: 60px;
    margin-bottom: 80px;
    .detail-img {
      width: 1240px;
    }
    .detail-info {
      height: 62px;
      border-bottom: 1px solid #dcdcdc;
    }

    .info-title {
      font-size: 16px;
      height: 62px;
      line-height: 62px;
      color: #00c3f5;
      border-bottom: 1px solid #00c3f5;
      padding: 0 20px;
      margin-bottom: -1px;
      box-sizing: border-box;
      display: inline-block;
    }
  }
}
</style>