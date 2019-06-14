<template>
  <div class="shopcart">
    <v-header></v-header>
    <div v-if='shopcartData.length > 0' class="shopcart-wrapper">
      <table class="shopcart-header">
        <th>
        <td class="cart-select">
          <input @click="checkAllGoods" :checked='isAllChecked' class="cart-checkbox" type="checkbox" name id>
          <span>全选</span>
        </td>
        <td class="cart-name">商品</td>
        <td class="cart-price">单价(元)</td>
        <td class="cart-num">数量</td>
        <td class="cart-total">小计(元)</td>
        <td class="cart-operate">操作</td>
        </th>
      </table>
      <div class="shopcart-list">
        <table>
          <tr v-for="(item, index) in shopcartData" :key="index" class="cart-product">
            <td class="cart-select">
              <input @click="checkedGoods(item.id)" :checked='item.checked' class="cart-checkbox" type="checkbox" name id>
              <img class="cart-img" :src="item.imageUrl" alt>
            </td>
            <td class="cart-name">
              <span class="cart-title">{{item.goodsName}}</span>
              <span class="eart-desc">{{item.goodsDesc}}</span>
            </td>
            <td class="cart-price">￥{{item.goodsPrice}}</td>
            <td class="cart-num">
              <div class="cart-input">
                <button @click="reduce(item.id)">-</button>
                <input type="number" v-model="item.count">
                <button @click="increase(item.id)">+</button>
              </div>
            </td>
            <td class="cart-total">￥{{item.count * item.goodsPrice}}</td>
            <td class="cart-operate">
              <i class="icon-font icon-close" @click="delGoods(item.id)"></i>
            </td>
          </tr>
        </table>
      </div>
      <div class="clearfix shopcar-footer">
        <div class="fl">
          <input :checked='isAllChecked' class="cart-checkbox" type="checkbox" name id>
          <span>全选</span>
          <span class="footer-remove">删除选择的商品</span>
          <span>
            共
            <span class="footer-number gray">{{checkedGoodsNum}}</span>件商品,已选
            <span class="footer-number blue">{{checkedGoodsTotal}}</span>件商品
          </span>
        </div>
        <div class="fr">
          <span>
            已优惠
            <span class="red footer-number">0.00</span>元,合计(不含运费):
            <span class="red footer-total">￥{{checkedGoodsPrice}}</span>
          </span>
          <a href="javaScript:" class="btn success" :class="{'cancel': checkedGoodsTotal <= 0}" @click="goToOrder">去结算</a>
        </div>
      </div>
    </div>
    <div v-else class="shopcart-empty">
      <div class="empty-content">
        <div class="empty-left">
          <img src="" alt="">
        </div>
        <div class="empty-right">
          <p class="empty-dssc">购物车内还没商品,感觉去选购吧~</p>
          <a href="javaScript:" class="btn success" @click="goToIndex">返回商城首页</a>
        </div>
      </div>
    </div>
    <div class="footer-shop">
      <v-footer></v-footer>
    </div>
    <v-dialog  :show.sync="dialogShow" title="提示" :width='500' @cancel='dialogShow = false' @confirm='confirmdelDekte'>
      <div style="height： 120px; line-height: 120px">你确定删除改商品吗</div>
    </v-dialog>
    <!-- <v-dialog @confirm='' @cancel='' :show="dialogShow"></v-dialog> -->
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import vHeader from "../components/header";
import vFooter from "../components/footer";
import vDialog from '../components/dialog'
export default {
  data() {
    return {
      dialogShow: false, //用于控制弹出框是显示隐藏
      currentId:null, //点击参数的时候用于保存item的
    };
  },
  components: {
    vHeader,
    vFooter,
    vDialog
  },

  computed: {
    //在计算属性中拿取vuex中的数据
    shopcartData() {
      return this.$store.state.shopcartData;
    },
    ...mapGetters([
      'isAllChecked',
      'checkedGoodsPrice',
      'checkedGoodsTotal',
      'checkedGoodsNum'

    ])
  },

  methods:{
    goToIndex (){
      this.$router.push({
        name: 'Index'
      })
    },
    //更改store中的数据必须要使用mutations中的事件取改变
    ...mapMutations([
      'INCREASE_SHOPCART',
      'REDUCE_SHOPCART',
      'CHCK_GOODS',
      'CHCK_ALL_GOODS', //点击全选按钮
      'DEL_SHOPCART' //删除
    ]),
    increase(id){
      //增加物品
      this.INCREASE_SHOPCART(id);
      //上面等价与：this.$srote.commit('INCREASE_SHOPCART', id)
    },
    reduce(id){
      //减少物品
      this.REDUCE_SHOPCART(id);
    },
    checkedGoods (id){
      //选择购物车中的物品
      this.CHCK_GOODS(id);
    },
    checkAllGoods(){
      //点击全选按钮
      this.CHCK_ALL_GOODS(this.isAllChecked);
    },
    delGoods(id){
      //点击X
      this.dialogShow = true;
      this.currentId = id;
    },
    confirmdelDekte(){
      //点击弹出框的确定
      this.DEL_SHOPCART(this.currentId);
       this.dialogShow = false;
    },
    goToOrder(){
      //跳转到订单页面
       this.$router.push({
        name: 'Order'
      })
    }
  }
};
</script>
<style lang='less' scoped>
.shopcart{
  width: 100%;
  min-height: 100%;
  position: relative;

  .footer-shop{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}
.shopcart-wrapper {
  width: 1240px;
  margin: 10px auto;

&::after{  //设置底部导航的间距
  content: '';
  width: 100%;
  display: block;
  height: 290px;
}
  .shopcart-header {
    height: 50px;
    line-height: 50px;
    background-color: white;
    border: 1px solid #efefef;
    color: #333;
  }
  .shopcart-list {
    background-color: white;
    margin-bottom: 10px;
  }
  .cart-product {
    height: 150px;
    border-top: 1px solid #efefef;

    &:last-child {
      border-bottom: 1px solid #efefef;
    }
  }
  .cart-select {
    padding-left: 45px;
    text-align: left;
    width: 220px;
    
    .cart-img {
      width: 100px;
      height: 100px;
      margin-left: 35px;
      vertical-align: middle;
    }
  }
  .cart-checkbox {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    border-color: #bdbdbd;
    display: inline-block;
    font-size: 10px;
    border-radius: 2px;
    vertical-align: middle;
  }
  .cart-name {
    width: 270px;
    text-align: left;

    .cart-title {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .eart-desc {
      color: #999;
    }
  }

  .cart-price {
    width: 220px;
    text-align: center;
  }

  .cart-num {
    width: 200px;
    text-align: center;

    .cart-input {
      width: 140px;
      height: 40px;
      border: 1px solid #efefef;
      display: inline-block;
      border-radius: 4px;
      box-sizing: border-box;
      button {
        width: 38px;
        height: 38px;
        text-align: center;
        background: transparent;
        border: none;
        font-size: 20px;
        cursor: pointer;
      }
      input {
        width: 58px;
        height: 34px;
        border: none;
        border-left: 1px solid #efefef;
        border-right: 1px solid #efefef;
        text-align: center;
        box-sizing: border-box;
      }
    }
  }

  .cart-total {
    width: 160px;
    text-align: center;
  }

  .cart-operate {
    width: 170px;
    padding-right: 40px;
    text-align: right;
  }
  .shopcar-footer {
    background-color: white;
    height: 70px;
    line-height: 70px;
    padding: 0 45px;
    color: #666;

    .footer-remove{
      color: #999;
      margin: 0 30px 0 20px;
    }

    .footer-number{
      font-weight: bold;
      margin: 0 5px;
    }

    .footer-total{
      font-size: 20px;
      margin-right: 35px;
    }


    .gray{
      color: #333;
    }

    .blue{
      color: #00c3f5;
    }

    .red{
      color: #e02b41;
    }
  }
}
.shopcart-empty{
  width: 1240px;
  margin: 10px auto;
  background-color: #fff;
  display: table;
  height: 360px;

  .empty-content{
    //达到水平垂直居中
    display: table-cell;
    text-align: center;
    vertical-align: middle;

    .empty-left{
      display: inline-block;
      width: 100px;
      height: 114px;
      margin-right: 30px;
      background: url('../assets/images/shopcart.png') no-repeat;
      vertical-align: middle;
    }

    .empty-right{
      display: inline-block;
      vertical-align: middle;
      text-align: left;

      .empty-dssc{
        color: #666;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 15px;
      }
    }
  }

}
</style>